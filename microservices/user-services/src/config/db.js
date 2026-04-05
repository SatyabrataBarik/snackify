import mongoose from "mongoose";
export const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/user-db').then(() => {
        console.log('Connected to MongoDB');

    }).catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });
}
