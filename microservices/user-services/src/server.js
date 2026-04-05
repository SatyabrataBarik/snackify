import app from "./app.js";
import { connectDB } from "./config/db.js";
connectDB();
app.listen(3002, () => {
    console.log('User Service is running on port 3002');
});