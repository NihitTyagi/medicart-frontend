import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import {
  ShoppingCart,
  Package,
  Check,
  X,
  Pill,
  Info,
} from "lucide-react";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const [addedToCart, setAddedToCart] = useState(new Set());
  const [expandedCard, setExpandedCard] = useState(null);

  const query = searchParams.get("query") || "";
  const categoryParam = searchParams.get("category") || "all";

  const { userId, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_API_URL;

  const categories = [
    { id: "all", name: "All Products" },
    { id: "pediatric", name: "Pediatric" },
    { id: "skincare", name: "Skincare" },
    { id: "general", name: "General" },
    { id: "supplement", name: "Supplement" }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${backend}/api/products`);
        const allProducts = response.data;
        const searchFiltered = query
          ? allProducts.filter((product) =>
              query.toLowerCase().split(" ").some((word) =>
                product.name.toLowerCase().includes(word)
              )
            )
          : allProducts;
        setProducts(searchFiltered);
      } catch (err) {
        setError("Failed to fetch products.");
        toast.error("Failed to fetch products. Please try again later.");
        
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [products, selectedCategory]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    const newParams = new URLSearchParams(searchParams);
    if (categoryId === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", categoryId);
    }
    setSearchParams(newParams);
  };

  const addToCart = async (productId) => {
    if (!isSignedIn || !userId) {
      toast.error("Log in to add items to the cart.");
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
      toast.error("Failed to add product to cart.");
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: "Out of Stock", color: "text-red-500", bg: "bg-red-50" };
    if (stock < 5) return { text: "Low Stock", color: "text-orange-500", bg: "bg-orange-50" };
    return { text: "In Stock", color: "text-green-500", bg: "bg-green-50" };
  };

  const toggleExpanded = (productId) => {
    setExpandedCard(expandedCard === productId ? null : productId);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 border-2 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200"
                    : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-md"
                }`}
              >
                <span>{category.name}</span>
                {selectedCategory === category.id && (
                  <span className="absolute -top-2 -right-2 bg-white text-blue-600 px-2 py-1 rounded-full text-xs font-bold border border-blue-200">
                    {category.id === "all" ? products.length : filteredProducts.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {selectedCategory === "all"
              ? `All Products (${filteredProducts.length})`
              : `${categories.find(cat => cat.id === selectedCategory)?.name} Products (${filteredProducts.length})`}
          </h3>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {toast.error(error)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 mb-2">No products found</p>
            <p className="text-gray-500">
              {selectedCategory !== "all"
                ? `No products available in the ${categories.find(cat => cat.id === selectedCategory)?.name} category.`
                : "Try adjusting your search or category filters."}
            </p>
            {(query || selectedCategory !== "all") && (
              <button
                onClick={clearFilters}
                className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition duration-300"
              >
                View All Products
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => {
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

export default CategoryPage;