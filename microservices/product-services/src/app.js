import express from 'express';
import router from './router/product_router.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
// Sample product data  
export default app;
