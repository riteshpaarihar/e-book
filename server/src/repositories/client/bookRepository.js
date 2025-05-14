import Book from "../../models/bookSchema.js";


const createBook = async(bookData) => {
    return await Book.create(bookData);
};

const getAllBooks = async() => {
    return await Book.find().populate("createdBy", "name email");
};

export default {
    createBook,
    getAllBooks,
};