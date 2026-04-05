import express from 'express';
import { getOTP, getUser, signUp, verifyOTP } from '../controller/index.js';
const router = express.Router();
router.post('/send-otp', getOTP);
router.post('/verify-otp', verifyOTP);
router.post('/sign-up', signUp);
router.get('/current', getUser);
export default router;  