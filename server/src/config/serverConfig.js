import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const JWT_EXPIRE = process.env.JWT_EXPIRE;
const JWT_SECRET = process.env.JWT_SECRET;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

export {
    PORT,
    DB_URL,
    JWT_EXPIRE,
    JWT_SECRET,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME
};