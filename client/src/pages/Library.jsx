import { FaBook } from "react-icons/fa";

const books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 4, title: "Harry Potter", author: "J.K. Rowling" },
  { id: 5, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
];

const Library = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage: "url('/your-background-image-path.png')", // 👈 upload & use correct path
      }}
    >
      <div className="backdrop-blur-sm bg-white/30 rounded-2xl p-6 shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <FaBook className="text-green-600 text-3xl" />
            <h1 className="text-3xl font-bold">My Library</h1>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
            + Add Book
          </button>
        </div>

        {/* Book List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white/60 backdrop-blur-md rounded-xl shadow-md p-5 hover:shadow-xl transition">
              <h2 className="text-xl font-bold mb-2">{book.title}</h2>
              <p className="text-gray-700">by {book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
