

import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import background from "./assets/background.jpeg";
import Notifications from "./pages/Notifications";
import Library from "./pages/Library";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import BookUpload from "./pages/BookUpload";
import ThankYouPage from "./pages/ThankYouPage";

const App = () => {
  const { user } = useAuth();

  return (
    <div
      className="flex h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {user && <Sidebar />}
      <main className="flex-1 overflow-y-auto backdrop-blur-md bg-white/70">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile" 
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications" 
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/library" 
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart" 
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment" 
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload" 
            element={
              <ProtectedRoute>
                <BookUpload />
              </ProtectedRoute>
            }
          />
          <Route
          path="/thankyou" 
          element={
            <ProtectedRoute>
              <ThankYouPage />
            </ProtectedRoute>
          }
        />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
       
      </main>

      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
