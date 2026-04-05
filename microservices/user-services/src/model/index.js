import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "Mobile number is required"],
        unique: true,
        validate: {
            validator: function (v) {
                return /^[6-9]\d{9}$/.test(v); // Indian mobile format
            },
            message: "Invalid mobile number"
        }

    },
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return !v || /^\S+@\S+\.\S+$/.test(v);
            },
            message: "Invalid email Id"
        }
    }


});
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret._id;

    }
});
const User = mongoose.model("User", userSchema);
export default User;    