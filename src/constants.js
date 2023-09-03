const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/todo';
const JWT_SECRET = process.env.JWT_SECRET || 'Sample123';
module.exports = {
    PORT,
    MONGO_URL,
    JWT_SECRET
};
