import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ShoppingCart, Package, Heart, Star, Check, X, Pill, Info } from "lucide-react";
import { toast } from "react-toastify";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedCard, setExpandedCard] = useState(null);
  const [addedToCart, setAddedToCart] = useState(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  const query = searchParams.get("query") || "";

  const { userId, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        console.log("Backend URL:", backend);
        const response = await axios.get(`${backend}/api/products`);
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
      setIsAnimating(true);
      debugger
      await axios.post(`${backend}/api/cart/${userId}/add-to-cart`, { productId });
      
      // Add to cart success state
      setAddedToCart(prev => new Set([...prev, productId]));
      
      // Reset after 3 seconds
      setTimeout(() => {
        setAddedToCart(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }, 3000);
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart. Please try again later.");
    } finally {
      setIsAnimating(false);
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-red-500 mb-4">
            <X className="w-16 h-16 mx-auto" />
          </div>
          <p className="text-xl font-semibold text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">

        {/* Search Results Banner */}
        <div className="mb-8">
          {query ? (
            <div className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-6 py-4 rounded-2xl inline-flex items-center space-x-3 shadow-lg backdrop-blur-sm">
              <Package className="w-5 h-5" />
              <span className="font-semibold">Search results for "{query}"</span>
              <button
                onClick={() => setSearchParams({})}
                className="text-orange-600 hover:text-orange-800 transition-colors bg-white rounded-full p-1 shadow-md hover:shadow-lg transform hover:scale-110"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3 text-2xl font-bold text-gray-700">
              <span>All Products</span>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-md mx-auto">
              <Package className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <p className="text-2xl font-semibold text-gray-700 mb-4">No products found</p>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              const isExpanded = expandedCard === product._id;
              const isAdded = addedToCart.has(product._id);

              return (
                <div
                  key={product._id}
                  className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={product.imageUrl || "/api/placeholder/300/200"}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Arrow Button for Details */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(product._id);
                      }}
                      className="absolute top-3 left-3 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
                    >
                      {isExpanded ? (
                        <X className="w-4 h-4 text-gray-700" />
                      ) : (
                        <Info className="w-4 h-4 text-blue-600" />
                      )}
                    </button>

                    {/* Stock Status */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${stockStatus.bg} ${stockStatus.color}`}>
                        {stockStatus.text}
                      </div>
                    </div>

                    {/* Details Overlay */}
                    <div className={`absolute inset-0 bg-white bg-opacity-95 backdrop-blur-sm transition-all duration-300 flex flex-col justify-center p-4 ${
                      isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                          <Pill className="w-5 h-5 text-blue-500" />
                          <div>
                            <span className="font-semibold">Active Salt:</span>
                            <p className="capitalize text-gray-600">{product.salt}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 text-sm text-gray-700">
                          <Info className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-semibold">Used for:</span>
                            <p className="capitalize text-gray-600 mt-1">{product.usedFor}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      {product.name.toUpperCase()}
                    </h3>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-indigo-600">₹{product.price}</span>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Package className="w-4 h-4" />
                        <span>{product.stock} left</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product._id);
                      }}
                      disabled={product.stock === 0 || isAdded}
                      className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                        isAdded
                          ? 'bg-green-500 shadow-green-200 shadow-lg'
                          : product.stock === 0
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>Added Successfully!</span>
                        </>
                      ) : product.stock === 0 ? (
                        <>
                          <X className="w-5 h-5" />
                          <span>Out of Stock</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
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