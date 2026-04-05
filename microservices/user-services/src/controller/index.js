import * as userService from '../service/index.js'; 
export const getUser = (req, res) => {
    const userAccessToken = req.headers['authorization'];
    if (!userAccessToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }   
    userService.getUser(userAccessToken).then(user => {
        res.json(user);
    }).catch(err => {
        res.status(404).json({ error: err.message });
    });
};
export const getOTP = (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }
    userService.getOTP(phoneNumber).then(otp => {
        res.json({ otp });
    }).catch(err => {
        res.status(400).json({ error: err.message });
    });

};
export const verifyOTP = (req, res) => {
    const { phoneNumber, otp } = req.body;
    if (!phoneNumber || !otp) {
        return res.status(400).json({ error: 'Phone number and OTP are required' });
    }
    userService.verifyOTP(phoneNumber, otp).then(isValid => {
        res.json({ isValid });
    }).catch(err => {
        res.status(400).json({ error: err.message });
    });
};
export const signUp = (req, res) => {
    const { phoneNumber, name, email } = req.body;
    if (!phoneNumber || !name || !email) {
        return res.status(400).json({ error: 'Phone number, name, and email are required' });
    }
    userService.signUp({ phoneNumber, name, email }).then(user => {
        res.json(user);
    }).catch(err => {
        res.status(400).json({ error: err.message });
    });
};