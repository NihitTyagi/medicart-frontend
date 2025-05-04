import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, amount } = location.state || {};

  useEffect(() => {
    // If no order information is present, redirect to home
    if (!orderId) {
      navigate("/");
    }
  }, [orderId, navigate]);

  if (!orderId) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Thank You for Your Order!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Your payment has been processed successfully.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="mb-4">
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-medium">{orderId}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Amount Paid</p>
                <p className="font-medium text-xl">${amount?.toFixed(2)}</p>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-6">
              We've sent a confirmation email with your order details and
              tracking information. You'll receive another email when your order ships.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/orders")}
                className="bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-50 transition duration-200"
              >
                View Order History
              </button>
              
              <button
                onClick={() => navigate("/")}
                className="bg-orange-600 text-white py-2 px-6 rounded-md hover:bg-orange-700 transition duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;