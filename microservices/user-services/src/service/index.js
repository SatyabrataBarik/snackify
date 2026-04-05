import * as userRepository from '../repository/index.js';
import jwt from 'jsonwebtoken';

const otpStore = new Map();


export const getUser = async (accessToken) => {
    try {
        if (!accessToken) {
            throw new Error("Token required");
        }

        const finalToken = accessToken.startsWith("Bearer ")
            ? accessToken.split(" ")[1]
            : accessToken;

        const decodedToken = jwt.verify(finalToken, process.env.JWT_SECRET);

        if (!decodedToken?.id) {
            throw new Error("Invalid token");
        }

        const user = await userRepository.getUserById(decodedToken.id);

        if (!user) {
            throw new Error("User not found");
        }

        return user;

    } catch (error) {

        if (error.name === "TokenExpiredError") {
            throw new Error("Token expired");
        }

        if (error.name === "JsonWebTokenError") {
            throw new Error("Invalid token");
        }

        throw new Error(error.message);
    }
};


export const getOTP = async (phoneNumber) => {
    try {
        if (!phoneNumber) {
            throw new Error("Phone number required");
        }


        const otp = Math.floor(100000 + Math.random() * 900000);


        otpStore.set(phoneNumber, {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        });


        console.log(`OTP for ${phoneNumber}: ${otp}`);

        return {
            message: "OTP sent successfully"
        };

    } catch (error) {
        throw new Error(error.message);
    }
};


export const verifyOTP = async (phoneNumber, otp) => {
    try {
        if (!phoneNumber || !otp) {
            throw new Error("Phone and OTP required");
        }

        const storedData = otpStore.get(phoneNumber);

        if (!storedData) {
            throw new Error("OTP not found");
        }

        if (Date.now() > storedData.expiresAt) {
            otpStore.delete(phoneNumber);
            throw new Error("OTP expired");
        }

        if (storedData.otp != otp) {
            throw new Error("Invalid OTP");
        }

        otpStore.delete(phoneNumber);

        const existingUser = await userRepository.getUserByMobile(phoneNumber);

        const token = jwt.sign(
            { mobile: phoneNumber },
            process.env.JWT_SECRET,
            { expiresIn: existingUser ? "30d" : null }
        );

        return {
            message: "OTP verified",
            isNewUser: !existingUser,
            token
        };

    } catch (error) {
        throw new Error(error.message);
    }
};

export const signUp = async (userData, token) => {
    try {
        if (!token) {
            throw new Error("Token required");
        }

        // verify temp token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.mobile) {
            throw new Error("Invalid token");
        }

        const mobile = decoded.mobile;


        const existingUser = await userRepository.getUserByMobile(mobile);
        if (existingUser) {
            throw new Error("User already exists");
        }


        const user = await userRepository.createUser({
            ...userData,
            mobile,
            isVerified: true
        });

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        return {
            message: "Signup successful",
            user,
            accessToken
        };

    } catch (error) {

        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(e => e.message);
            throw new Error(errors.join(", "));
        }

        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            throw new Error(`${field} already exists`);
        }

        throw new Error(error.message);
    }
};