

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ⬅️ Import useCart

const PaymentPage = () => {
  const navigate = useNavigate();
  const { placeOrder } = useCart(); // ⬅️ Get placeOrder from context
  const [selectedOption, setSelectedOption] = useState("Credit Card");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentSuccess = async () => {
    setIsProcessing(true);
    try {
      await placeOrder(); // ✅ Place the order in backend
      setTimeout(() => {
        setIsProcessing(false);
        navigate("/thankyou"); // ✅ Navigate after placing order
      }, 2000); // simulate small delay
    } catch (error) {
      console.error("❌ Payment failed:", error);
      setIsProcessing(false);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600 text-white">
      <div className="bg-white/20 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Payment Options</h2>

        <div className="flex flex-col gap-4 mb-8">
          <select
            className="p-3 rounded-lg text-black"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option>Credit Card</option>
            <option>Cash on Delivery</option>
            <option>Coupon Code</option>
          </select>
        </div>

        {selectedOption === "Credit Card" && (
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Card Number" className="p-3 rounded-md border w-full text-black" />
            <div className="flex gap-4">
              <input type="text" placeholder="Expiry (MM/YY)" className="p-3 rounded-md border w-1/2 text-black" />
              <input type="text" placeholder="CVV" className="p-3 rounded-md border w-1/2 text-black" />
            </div>
          </div>
        )}
        {selectedOption === "Cash on Delivery" && (
          <div className="text-center text-black bg-white p-3 rounded-xl">Pay when product is delivered!</div>
        )}
        {selectedOption === "Coupon Code" && (
          <div className="flex gap-2">
            <input type="text" placeholder="Enter Coupon" className="p-3 rounded-md border w-full text-black" />
          </div>
        )}

        <button
          onClick={handlePaymentSuccess}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 mt-8 rounded-2xl font-bold text-lg shadow-md hover:shadow-lg transition"
        >
          {isProcessing ? "Processing Payment..." : "Proceed to Pay"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
