

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/background.jpeg';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (profileImage) {
      data.append('profileImage', profileImage);
    }

    try {
      await register(data); // Using the register function from AuthContext
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        mobileNumber: '',
        password: '',
      });
      setProfileImage(null);
      setPreviewImage(null);
    } catch (err) {
      console.error('Signup Error:', err);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/80"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/80"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/80"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/80"
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/80"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/80"
          />

          <div className="flex flex-col items-center">
            {previewImage && (
              <img
                src={previewImage}
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 rounded-lg bg-white/80"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm mb-2">or sign up with</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white p-2 rounded-full shadow-md">
              <i className="fab fa-google"></i>
            </button>
            <button className="bg-white p-2 rounded-full shadow-md">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button className="bg-white p-2 rounded-full shadow-md">
              <i className="fab fa-twitter"></i>
            </button>
          </div>
          <p className="mt-4 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
