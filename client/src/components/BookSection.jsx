
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; 
import BookCard from "./BookCard";

const BookSection = () => {
  const { books, getAllBooks } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div className="px-4">
      {currentBooks.length > 0 ? (
        <>
          <div className="flex flex-col gap-6">
            {currentBooks.map((book) => (
              <BookCard
                key={book._id}
                image={book.imageUrl}
                title={book.genre}
                book={book.title}
                author={book.author}
                buttonText="Add to Cart"
                bookData={book}
              />
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-purple-500 text-white rounded disabled:bg-gray-300"
            >
              Prev
            </button>
            <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-purple-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-lg font-semibold">No books available.</p>
      )}
    </div>
  );
};

export default BookSection;
