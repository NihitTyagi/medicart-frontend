import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    stock: "",
    salt: "", // New field
    usedFor: "", // New field
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const backend = import.meta.env.VITE_API_URL;
      await axios.post(`${backend}/api/products`, formData);
      navigate("/adminpanel");
      alert("Product added successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600 text-black"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600 text-black"
              placeholder="Enter product price"
              required
            />
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600 text-black"
              placeholder="Enter image URL"
              required
            />
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600 text-black"
              placeholder="Enter stock quantity"
              required
            />
          </div>

          {/* Salt */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Salt (Active Ingredient)</label>
            <input
              type="text"
              name="salt"
              value={formData.salt}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600 text-black"
              placeholder="Enter salt name"
              required
            />
          </div>

          {/* Used For */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Used For</label>
            <input
              type="text"
              name="usedFor"
              value={formData.usedFor}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600 text-black"
              placeholder="Enter purpose (e.g., Pain Relief)"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-orange-600 text-white py-2 px-4 rounded w-full hover:bg-orange-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;