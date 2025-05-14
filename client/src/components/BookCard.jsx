

import { useCart } from "../context/CartContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import { FaRegHeart, FaRegComment, FaDownload, FaStar } from "react-icons/fa";

const BookCard = ({ image, title, book, author, buttonText, bookData }) => {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate(); 

  const isInCart = cartItems.some(item => item._id === bookData._id);
  const isOutOfStock = bookData.stock === 0; // 👈 check stock

  const handleAddToCart = () => {
    if (!isInCart && !isOutOfStock) {
      addToCart(bookData);
      toast.success("Book added to cart! 🎉", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  const handleGoToCart = () => {
    navigate("/cart"); 
  };

  return (
    <div className="flex bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Left Side: Image */}
      <div className="w-1/3">
        <img src={image} alt={book} className="w-full h-full object-cover" />
      </div>

      {/* Right Side: Details */}
      <div className="w-2/3 flex flex-col p-4 justify-between">
        <div>
          <p className="text-xl font-bold text-gray-800 mb-2">{title}</p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Book:</span> {book}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Author:</span> {author}
          </p>

          {/* Stock status */}
          {isOutOfStock && (
            <p className="text-red-500 font-bold mt-2">Out of Stock</p>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-4 flex-wrap">
            <button
              onClick={handleAddToCart}
              disabled={isInCart || isOutOfStock}
              className={`${
                isInCart || isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-500 hover:bg-purple-600"
              } text-white font-semibold py-2 px-4 rounded-lg transition`}
            >
              {isOutOfStock
                ? "Out of Stock"
                : isInCart
                ? "Added to Cart"
                : buttonText}
            </button>

            {/* Show Go to Cart only if added */}
            {isInCart && (
              <button
                onClick={handleGoToCart}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Go to Cart
              </button>
            )}
          </div>
        </div>

        {/* Bottom static icons */}
        <div className="flex items-center justify-start gap-6 mt-4 text-gray-500">
          <FaRegHeart className="hover:text-red-500 cursor-pointer" size={20} />
          <FaRegComment className="hover:text-blue-400 cursor-pointer" size={20} />
          <FaDownload className="hover:text-green-400 cursor-pointer" size={20} />
          <FaStar className="hover:text-yellow-400 cursor-pointer" size={20} />
        </div>
      </div>
    </div>
  );
};

export default BookCard;