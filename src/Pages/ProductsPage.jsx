import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import {
  ShoppingCart,
  Package,
  Check,
  X,
  Pill,
  Info,
} from "lucide-react";
import { toast } from "react-toastify";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedCard, setExpandedCard] = useState(null);
  const [addedToCart, setAddedToCart] = useState(new Set());

  const query = searchParams.get("query") || "";
  const { userId, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${backend}/api/products`);
        const allProducts = response.data;
        const filtered = query
          ? allProducts.filter((product) =>
              query.toLowerCase().split(" ").some((word) =>
                product.name.toLowerCase().includes(word)
              )
            )
          : allProducts;
        setProducts(filtered);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products.");
        toast.error("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const addToCart = async (productId) => {
    if (!isSignedIn || !userId) {
      toast.warn("Please log in to add items to the cart.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(`${backend}/api/cart/${userId}/add-to-cart`, { productId });
      setAddedToCart((prev) => new Set([...prev, productId]));
      setTimeout(() => {
        setAddedToCart((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }, 3000);
    } catch (err) {
      toast.error("Failed to add product to cart. Please try again later.");
    }
  };

  const toggleExpanded = (productId) => {
    setExpandedCard(expandedCard === productId ? null : productId);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: "Out of Stock", color: "text-red-500", bg: "bg-red-50" };
    if (stock < 5) return { text: "Low Stock", color: "text-orange-500", bg: "bg-orange-50" };
    return { text: "In Stock", color: "text-green-500", bg: "bg-green-50" };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <X className="w-10 h-10 text-red-500 mx-auto mb-2" />
          <p className="text-lg font-semibold text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          {query ? (
            <div className="bg-orange-100 text-orange-800 px-6 py-3 rounded-xl inline-flex items-center space-x-3 shadow">
              <Package className="w-5 h-5" />
              <span className="font-semibold">Search results for "{query}"</span>
              <button
                onClick={() => setSearchParams({})}
                className="text-orange-600 hover:text-orange-800 transition-colors bg-white rounded-full p-1 shadow hover:scale-110"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <h2 className="text-xl sm:text-2xl font-bold text-gray-700">All Products</h2>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md mx-auto">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-semibold text-gray-700">No products found</p>
              <p className="text-gray-500 mt-1">Try adjusting your search query</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              const isExpanded = expandedCard === product._id;
              const isAdded = addedToCart.has(product._id);

              return (
                <div
                  key={product._id}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden text-xs sm:text-sm"
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={product.imageUrl || "/api/placeholder/300/200"}
                      alt={product.name}
                      className="w-full h-36 sm:h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(product._id);
                      }}
                      className="absolute top-2 left-2 w-7 h-7 sm:w-8 sm:h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
                    >
                      {isExpanded ? (
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                      ) : (
                        <Info className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                      )}
                    </button>

                    <div className="absolute top-2 right-2">
                      <div className={`px-2 py-1 rounded-full text-[10px] font-semibold ${stockStatus.bg} ${stockStatus.color}`}>
                        {stockStatus.text}
                      </div>
                    </div>

                    <div className={`absolute inset-0 bg-white bg-opacity-95 backdrop-blur-sm transition-all duration-300 flex flex-col justify-center p-4 ${
                      isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-gray-700">
                          <Pill className="w-4 h-4 text-blue-500" />
                          <div>
                            <span className="font-semibold">Salt:</span>
                            <p className="capitalize text-gray-600">{product.salt}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 text-gray-700">
                          <Info className="w-4 h-4 text-green-500 mt-0.5" />
                          <div>
                            <span className="font-semibold">Used for:</span>
                            <p className="capitalize text-gray-600 mt-1">{product.usedFor}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-2 line-clamp-2">
                      {product.name.toUpperCase()}
                    </h3>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg sm:text-xl font-bold text-indigo-600">₹{product.price}</span>
                      <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
                        <Package className="w-3 h-3 sm:w-4 h-4" />
                        <span>{product.stock} left</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product._id);
                      }}
                      disabled={product.stock === 0 || isAdded}
                      className={`w-full py-2 px-3 sm:py-3 sm:px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                        isAdded
                          ? 'bg-green-500 shadow-green-200 shadow-md'
                          : product.stock === 0
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added!</span>
                        </>
                      ) : product.stock === 0 ? (
                        <>
                          <X className="w-4 h-4" />
                          <span>Out of Stock</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
