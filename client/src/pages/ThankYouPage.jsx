
import React from "react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-gray-800 p-4">
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg mb-6">Your order has been placed successfully.</p>
      <Link
        to="/"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ThankYouPage;
