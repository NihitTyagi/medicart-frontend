import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import { CartContext } from "../context/CartContext"; // Adjust path as needed

const CartPage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const { isSignedIn, userId } = useAuth();
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCart = async () => {
      if (!isSignedIn || !userId) {
        alert("Please log in to view your cart.");
        navigate("/login");
        return;
      }

      try {
              

        const response = await axios.get(`${backend}/api/cart/${userId}`);
        const itemsWithQuantity = (response.data.items || []).map(item => ({
          ...item,
          quantity: item.quantity || 1
        }));
        setCartItems(itemsWithQuantity);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isSignedIn, userId, navigate, setCartItems]);

  const handleRemoveFromCart = async (productId) => {
    try {
      
      await axios.post(`${backend}/api/cart/${userId}/remove-from-cart`, { productId });
      setCartItems(prev => prev.filter(item => item.productId._id !== productId));
    } catch (err) {
      console.error("Failed to remove item:", err);
      setCartItems(prev => prev.filter(item => item.productId._id !== productId));
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    // Optimistic UI update
    setCartItems(prev =>
      prev.map(item =>
        item.productId._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      await axios.put(`${backend}/api/cart/${userId}/update-item`, { productId, quantity: newQuantity });
    } catch (err) {
      console.error("Failed to update quantity:", err);
      // Revert on failure
      const originalItem = cartItems.find(item => item.productId._id === productId);
      if (originalItem) {
        setCartItems(prev =>
          prev.map(item =>
            item.productId._id === productId ? { ...item, quantity: originalItem.quantity } : item
          )
        );
      }
    }
  };

  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

  const calculateTax = () => calculateSubtotal() * 0.08;

  const calculateTotal = () => calculateSubtotal() + calculateTax();

  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: {
        cartItems,
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        total: calculateTotal()
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center mb-8">
          <ShoppingCart className="text-orange-600 mr-2" size={24} />
          <h1 className="text-2xl font-semibold text-gray-800">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-700 mb-4">Your cart is empty.</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cart Items */}
            <div className="flex-grow lg:w-2/3">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 bg-gray-50 border-b">
                  <h2 className="font-medium text-gray-700">Cart Items</h2>
                </div>
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item._id} className="p-4 flex items-center">
                      <img
                        src={item.productId.imageUrl}
                        alt={item.productId.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium text-gray-800">{item.productId.name}</h3>
                        <p className="text-gray-600 text-sm">₹{item.productId.price.toFixed(2)}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-md mr-4">
                        <button
                          onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
                          className="px-2 py-1 text-white hover:bg-gray-100"
                          type="button"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-black">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
                          className="px-2 py-1 text-white hover:bg-gray-100"
                          type="button"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right min-w-[80px]">
                        <p className="font-medium text-gray-800">
                          ₹{(item.productId.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRemoveFromCart(item.productId._id)}
                        className="ml-4 text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>₹{calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-medium text-gray-800">
                      <span>Total</span>
                      <span>₹{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  disabled={cartItems.length === 0}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2 transition duration-200"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => navigate("/products")}
                  className="w-full mt-3 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
