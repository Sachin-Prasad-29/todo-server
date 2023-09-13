import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app';
dotenv.config();

const start = async () => {
    try {
        if (!process.env.JWT_KEY) {
            throw new Error('JWT_KEY must be defined');
        }
        await mongoose.connect(MONGO_URI);
        console.log('Connected to DB');
    } catch (error) {
        console.error(error);
    }
};
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todo';
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
});

start();
