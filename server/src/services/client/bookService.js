import bookRepository from "../../repositories/client/bookRepository.js";


const createBookService = async(bookData) => {
    return await bookRepository.createBook(bookData);
};

const getAllBooksService = async() => {
    return await bookRepository.getAllBooks();
};

export default {
    createBookService,
    getAllBooksService,
};