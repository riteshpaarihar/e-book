import express from "express";

import { createBook, getAllBooks, uploadBook } from "../../../controllers/client/bookController.js";
import { protect } from "../../../middlewares/authMiddleware.js";
// import { upload } from "../../../middlewares/upload.js";
import upload from "../../../middlewares/multer.js";

const router = express.Router();

router.post("/upload", protect, upload.single("image"), uploadBook);
router.get("/", getAllBooks);

export default router;