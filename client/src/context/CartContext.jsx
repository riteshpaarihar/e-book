

import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import API from "../api/axios.js"; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const { user } = useAuth();

  // ➡️ Add to cart
  const addToCart = (book) => {
    setCartItems((prev) => [...prev, book]);
  //  toast.success(`${book.title} added to cart! 🛒`);
  };

  // ➡️ Remove from cart
  const removeFromCart = (bookId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== bookId));
    toast.info("Item removed from cart.");
  };

  // ➡️ Clear cart
  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared successfully!");
  };

  // ➡️ Update address
  const updateAddress = (newAddress) => {
    setAddress(newAddress);
    toast.success("Address updated successfully!");
  };

  // ➡️ Place order (using axios API)
  // const placeOrder = async () => {
  //   try {
  //     const orderData = {
  //       userId: user?._id,
  //       address: address,
  //       cartItems: cartItems.map((item) => ({
  //         product: item._id,
  //         quantity: 1, // you can enhance quantity management later
  //       })),
  //       totalAmount:
  //         cartItems.reduce((acc, item) => acc + item.price, 0) +
  //         (cartItems.length > 0 ? 50 : 0), // add shipping ₹50 if cart is not empty
  //     };

  //     const { data } = await API.post("/v1/order", orderData); // ✅ axios request

  //     console.log("✅ Order placed successfully:", data);
  //     clearCart(); // empty cart after successful order
  //     toast.success("Order placed successfully! 🎉");
  //   } catch (error) {
  //     console.error("❌ Error placing order:", error?.response?.data?.message || error.message);
  //     toast.error(error?.response?.data?.message || "Failed to place order.");
  //   }
  // };

  // ➡️ Place order (using axios API)
const placeOrder = async () => {
  try {
    const orderData = {
      userId: user?._id,
      address: address,
      cartItems: cartItems.map((item) => ({
        product: item._id,
        quantity: 1,
      })),
      totalAmount:
        cartItems.reduce((acc, item) => acc + item.price, 0) +
        (cartItems.length > 0 ? 50 : 0),
    };

    const { data } = await API.post("/v1/order", orderData); // ✅ axios request
    console.log("✅ Order placed successfully:", data);

    clearCart(); // empty cart after successful order
   toast.success("Order placed successfully! 🎉");
  } catch (error) {
    console.error("❌ Error placing order:", error);
    toast.error("Failed to place order. Please try again.");
    throw error; // rethrow to handle in PaymentPage
  }
};

  return (
    <CartContext.Provider
      value={{
        cartItems,
        address,
        addToCart,
        removeFromCart,
        clearCart,
        updateAddress,
        placeOrder,
        user,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
