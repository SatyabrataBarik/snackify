import app from './app.js';
import { productDb } from './db/config.js';
productDb();

app.listen(3001, () => {
    console.log('Product Service is running on port 3001');
});
// Sample product data