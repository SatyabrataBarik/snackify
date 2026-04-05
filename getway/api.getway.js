import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
const app = express();
app.use(cors());

// Proxy configuration
app.use('/users', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/api/products', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/orders', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));

app.listen(3000, () => {
    console.log('API Gateway is running on port 3000');
});
