
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart, address, updateAddress } = useCart();
  const { user: authUser } = useAuth();
  const [newAddress, setNewAddress] = useState(address || "");
  const [isAddressUpdated, setIsAddressUpdated] = useState(!!address);

  const totalItemsPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const deliveryCharge = cartItems.length > 0 ? 50 : 0;
  const totalAmount = totalItemsPrice + deliveryCharge;

  const handleAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleUpdateAddress = () => {
    updateAddress(newAddress);
    setIsAddressUpdated(true);
  };

  const handleProceedToPayment = () => {
    if (cartItems.length > 0 && newAddress.trim() !== "") {
      navigate("/payment");
    } else {
      alert("Please add shipping address and cart items before proceeding!");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-6 flex items-start justify-center" style={{ backgroundImage: "url('/your-background-image-path.png')" }}>
      <div className="w-full max-w-6xl rounded-3xl p-8 shadow-2xl flex flex-col lg:flex-row gap-10 bg-white/70 backdrop-blur-md">
        
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
          {cartItems.length > 0 ? (
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex gap-4 items-center bg-white/80 p-4 rounded-2xl shadow-md hover:shadow-lg transition">
                  <img src={item.imageUrl} alt={item.title} className="w-24 h-32 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-gray-700">{item.author}</p>
                    <p className="text-lg font-semibold mt-2">₹{item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Remove</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-center">No items in the cart yet!</p>
          )}
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          
          {/* Profile & Address */}
          <div className="bg-white/80 p-6 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold mb-4">User Profile & Shipping Address</h3>
            {authUser && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-6 items-center">
                  <img src={authUser.profileImage} alt={authUser.firstName} className="w-16 h-16 object-cover rounded-full" />
                  <div>
                    <p className="text-lg font-semibold">Name: {authUser.firstName} {authUser.lastName}</p>
                    <p className="text-lg font-semibold">Username: {authUser.username}</p>
                    <p className="text-lg font-semibold">Email: {authUser.email}</p>
                    <p className="text-lg font-semibold">Mobile: {authUser.mobileNumber}</p>
                  </div>
                </div>
              </div>
            )}
            {isAddressUpdated ? (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Shipping Address:</h4>
                <p className="bg-gray-100 p-4 rounded-xl">{newAddress}</p>
              </div>
            ) : (
              <>
                <textarea value={newAddress} onChange={handleAddressChange} rows="4" className="w-full p-3 mt-4 border rounded-lg" placeholder="Enter your shipping address" />
                <button onClick={handleUpdateAddress} className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3 mt-4 rounded-2xl font-semibold text-lg shadow-md">
                  Update Address
                </button>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white/80 p-6 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <p>Items ({cartItems.length}):</p>
              <p>₹{totalItemsPrice}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Delivery Charges:</p>
              <p>₹{deliveryCharge}</p>
            </div>
            <div className="border-t border-gray-400 my-4"></div>
            <div className="flex justify-between text-xl font-bold">
              <p>Total:</p>
              <p>₹{totalAmount}</p>
            </div>
          </div>

          {/* Buttons */}
          {cartItems.length > 0 && (
            <>
              <button onClick={handleProceedToPayment} className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-3 rounded-2xl font-semibold text-lg shadow-md hover:shadow-lg transition">
                Proceed to Checkout
              </button>
              <button onClick={clearCart} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-2xl font-semibold text-lg shadow-md hover:shadow-lg transition">
                Clear Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
