


import { useState } from "react";
import { useAuth } from "../context/AuthContext"; 

const BookUpload = () => {
  const { uploadBook } = useAuth(); 
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const initialFormData = {
    title: "",
    author: "",
    genre: "",
    edition: "",
    publisher: "",
    isbn: "",
    condition: "",
    pages: "",
    price: "",
    summary: "",
    stock: 1,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload a book cover image.");
      return;
    }

    const data = new FormData();
    data.append("image", imageFile);
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await uploadBook(data);
      // reset form after successful upload
      setFormData(initialFormData);
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Upload Failed", error);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Book Upload Portal
        </h1>

        {/* Upload Book Image */}
        <div className="border-2 border-dashed border-purple-400 p-6 flex flex-col items-center justify-center rounded-md mb-8 bg-purple-50">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="h-48 w-auto object-contain" />
          ) : (
            <div className="flex flex-col items-center">
              <img src="/upload-icon.png" alt="Upload Icon" className="h-16 mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop your image here</p>
              <p className="text-gray-400 mb-4">or</p>
              <label className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md">
                Browse Files
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          )}
          <p className="text-xs text-gray-400 mt-2">Supported formats: JPG, PNG, GIF (max 5MB)</p>
        </div>

        {/* Book Details Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Book Title */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Book Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter book title"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Author */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Enter author name"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Genre */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Genre *</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            >
              <option value="">Select a genre</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="science-fiction">Science Fiction</option>
              <option value="fantasy">Fantasy</option>
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
              <option value="thriller">Thriller</option>
              <option value="horror">Horror</option>
              <option value="biography">Biography</option>
              <option value="history">History</option>
              <option value="children">Children's</option>
              <option value="young-adult">Young Adult</option>
              <option value="poetry">Poetry</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Edition */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Edition</label>
            <input
              type="text"
              name="edition"
              value={formData.edition}
              onChange={handleInputChange}
              placeholder="e.g., First Edition"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Publisher */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Publisher</label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleInputChange}
              placeholder="Publisher name"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* ISBN */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
              placeholder="ISBN number"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Condition */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Condition *</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="very-good">Very Good</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          {/* Pages */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Pages</label>
            <input
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleInputChange}
              placeholder="Number of pages"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Price */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Book price"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Stock */}
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Stock *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              placeholder="Available stock quantity"
              className="w-full border rounded-md p-2"
              min="0"
            />
          </div>

          {/* Summary */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              placeholder="Brief description of the book"
              className="w-full border rounded-md p-2"
              rows="4"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="reset"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md"
              onClick={() => {
                setFormData(initialFormData);
                setImageFile(null);
                setImagePreview(null);
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-md"
            >
              Upload Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookUpload;
