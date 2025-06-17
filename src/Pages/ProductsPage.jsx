import React, { useEffect, useState } from "react";
import axios from "../axiosInstance";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  const { userId, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get("/api/products");
        const allProducts = response.data;
        const filtered = query
  ? allProducts.filter((product) => {
      const productName = product.name.toLowerCase();
      return query
        .toLowerCase()
        .split(" ")
        .some((word) => productName.includes(word));
    })
  : allProducts;
        setProducts(filtered);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const addToCart = async (productId) => {
    if (!isSignedIn || !userId) {
      alert("You must be logged in to add items to the cart.");
      navigate("/login");
      return;
    }

    try {
      debugger
      await axios.post(`/api/cart/${userId}/add-to-cart`, { productId });
      alert("Product added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add product to cart.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          {query ? (
            <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg inline-flex items-center space-x-2">
              <span>Products for "{query}"</span>
              <button
                onClick={() => setSearchParams({})}
                className="text-orange-600 hover:text-orange-800"
              >
                ✕
              </button>
            </div>
          ) : (
            <p className="text-xl font-semibold text-orange-600">
              All Products
            </p>
          )}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-700">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <h2 className="text-lg font-semibold text-black">{product.name.toUpperCase()}</h2>
                <p className="text-gray-700">₹{product.price}</p>
                <p className="text-xs text-gray-500">{product.salt}</p>
                <button
                  onClick={() => addToCart(product._id)}
                  className="mt-4 bg-orange-600 text-white py-2 px-4 rounded w-full hover:bg-orange-700 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
