import express from 'express';
import { getUser } from '../controller/index.js';
const router = express.Router();

router.get('/current', getUser);    
export default router;  