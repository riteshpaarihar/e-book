
import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // 🚀 Login function
  const login = async (formData) => {
    try {
      const res = await API.post("/v1/user/login", formData);
      setUser(res.data.user);

      localStorage.setItem("user", JSON.stringify(res.data.user)); 
      localStorage.setItem("token", res.data.token); 
        // console.log("token",res.data.token);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please check your credentials.";
      console.error("Login Error:", errorMessage);
      toast.error(errorMessage);
      throw error;
    }
  };

  // ✨ Register function
  const register = async (formData) => {
    try {
      await API.post("/v1/user/register", formData);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";
      console.error("Register Error:", errorMessage);
      toast.error(errorMessage);
      throw error;
    }
  };

  // 🔐 Logout function
  const logout = async () => {
    try {
      await API.post("/v1/user/logout", {}, { withCredentials: true });
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // 👈 Remove token on logout
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  // 📤 Upload Book function
  const uploadBook = async (formData) => {
    try {
      const token = localStorage.getItem("token"); // 👈 Get token
      //console.log(token)
      if (!token) {
        throw new Error("Not authorized, no token");
      }

      const res = await API.post("/v1/book/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // 👈 Add token here
        },
      });

      toast.success("Book uploaded successfully!");
      return res.data.book;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Book upload failed. Please try again.";
      console.error("Upload Book Error:", errorMessage);
      toast.error(errorMessage);
      throw error;
    }
  };

  // 📚 Get All Books function

  const getAllBooks = useCallback(async () => {
  try {
    const res = await API.get("/v1/book");
    setBooks(res.data.books);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Fetching books failed. Please try again.";
    console.error("Get Books Error:", errorMessage);
    toast.error(errorMessage);
    throw error;
  }
}, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        uploadBook,
        getAllBooks,
        books,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
