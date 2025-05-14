import bookService from "../../services/client/bookService.js";
import cloudinary from "../../config/cloudinaryConfig.js"; 
import fs from "fs";
import Book from "../../models/bookSchema.js";

export const createBook = async (req, res) => {
  try {
    const { title, author, genre, edition, publisher, isbn, condition, pages, price, summary } = req.body;
    const imageUrl = req.file?.path || ""; // If using multer for upload

    if (!imageUrl) {
      return res.status(400).json({ message: "Book image is required" });
    }

    const bookData = {
      title,
      author,
      genre,
      edition,
      publisher,
      isbn,
      condition,
      pages,
      price,
      summary,
      imageUrl,
      createdBy: req.user._id, // Assuming you are using JWT auth
    };

    const book = await bookService.createBookService(bookData);
    res.status(201).json({ success: true, book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooksService();
    res.status(200).json({ success: true, books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const uploadBook = async (req, res) => {
  try {
    const { title, author, genre, edition, publisher, isbn, condition, pages, price, summary ,stock} = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ebooks",
    });

    // After upload, delete local file (optional but recommended)
    fs.unlinkSync(req.file.path);

    const book = new Book({
      title,
      author,
      genre,
      edition,
      publisher,
      isbn,
      condition,
      pages,
      price,
      summary,
      stock,
      imageUrl: result.secure_url, // <<<<<< Cloudinary image URL
      createdBy: req.user._id,
    });

    await book.save();

    res.status(201).json({ success: true, book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
