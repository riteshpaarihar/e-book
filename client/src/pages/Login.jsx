import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/background.jpeg';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify'; // Import toast

const Login = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous toasts
    toast.dismiss();

    // Attempt to login
    await login(formData); // The login function will now handle toasts
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="Email, Username or Mobile"
            className="w-full p-3 mb-4 rounded-lg bg-white/80"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 mb-4 rounded-lg bg-white/80"
          />
          <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm mb-2">or continue with</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white p-2 rounded-full shadow-md"><i className="fab fa-google"></i></button>
            <button className="bg-white p-2 rounded-full shadow-md"><i className="fab fa-facebook-f"></i></button>
            <button className="bg-white p-2 rounded-full shadow-md"><i className="fab fa-twitter"></i></button>
          </div>
          <p className="mt-4 text-sm">
            Don't have an account? <Link to="/signup" className="font-bold">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
