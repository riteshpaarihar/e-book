import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});


export const upload = multer({
    storage: multer.memoryStorage(), // use memory for Cloudinary
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|webp/;
        const isValidExt = fileTypes.test(file.originalname.toLowerCase());
        const isValidMime = fileTypes.test(file.mimetype);
        if (isValidExt && isValidMime) cb(null, true);
        else cb(new Error("Only image files are allowed!"));
    },
});