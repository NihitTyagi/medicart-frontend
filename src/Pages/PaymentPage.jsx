import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Stripe test public key - replace with your Vite env variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Card element custom styles
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      color: '#32325d',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
  hidePostalCode: false, // Set to true if you collect ZIP separately
};

// Mock order for demo
const mockOrder = {
  id: "order123",
  items: [
    { name: "Pain Relief Medication", price: 24.99, quantity: 1 },
    { name: "Digital Thermometer", price: 12.50, quantity: 1 }
  ],
  subtotal: 37.49,
  tax: 3.00,
  shipping: 4.99,
  total: 45.48
};

// Payment Form Component
const PaymentForm = ({ orderId = "order123" }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    // Fetch payment intent from your server
    // For demo, we're simulating a successful response
    setTimeout(() => {
      setClientSecret('demo_secret_key');
      setDisabled(false);
    }, 1000);
    
    // In real implementation:
    // async function getPaymentIntent() {
    //   try {
    //     const response = await fetch('/api/payments/create-payment-intent', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ orderId })
    //     });
    //     const data = await response.json();
    //     
    //     if (response.ok) {
    //       setClientSecret(data.clientSecret);
    //     } else {
    //       setError(data.message || 'Failed to initialize payment');
    //     }
    //   } catch (err) {
    //     setError('Network error. Please check your connection and try again.');
    //   }
    // }
    // getPaymentIntent();
  }, [orderId]);

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    // Demo implementation - simulating success
    // Remove this in real implementation
    setTimeout(() => {
      setProcessing(false);
      setSucceeded(true);
      
      // After payment success, redirect to order confirmation page with state
      navigate('/order-confirmation', {
        state: {
          orderId: mockOrder.id,
          amount: mockOrder.total
        }
      });
    }, 2000);
    
    // Real implementation:
    // if (!stripe || !elements) return;
    // 
    // const result = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement),
    //     billing_details: {
    //       name: name,
    //       email: email,
    //     }
    //   }
    // });
    // 
    // if (result.error) {
    //   setError(result.error.message);
    //   setProcessing(false);
    // } else {
    //   if (result.paymentIntent.status === 'succeeded') {
    //     setSucceeded(true);
    //     // Redirect to order confirmation page with state
    //     navigate('/order-confirmation', {
    //       state: {
    //         orderId: mockOrder.id,
    //         amount: mockOrder.total
    //       }
    //     });
    //   }
    // }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-orange-500 text-white p-2 rounded-lg mr-3">
              <span className="font-bold text-2xl">M</span>
            </div>
            <h1 className="text-2xl font-bold text-orange-500">MediCart</h1>
          </div>
          <div className="relative">
            <ShoppingCart className="h-8 w-8 text-orange-500" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 py-4 px-6">
            <h2 className="text-xl font-bold text-white">Complete Your Payment</h2>
          </div>
          
          {/* Order Summary */}
          <div className="border-b border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 text-black">Order Summary</h3>
            {mockOrder.items.map((item, index) => (
              <div key={index} className="flex justify-between py-2 text-black">
                <span>{item.name} (x{item.quantity})</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between py-1 text-black">
                <span>Subtotal</span>
                <span>${mockOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 text-black">
                <span>Tax</span>
                <span>${mockOrder.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 text-black">
                <span>Shipping</span>
                <span>${mockOrder.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-black">
                <span>Total</span>
                <span>${mockOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Payment Form */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-black">Payment Details</h3>
            
            {succeeded ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                Payment successful! Redirecting to order confirmation...
              </div>
            ) : null}
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Information</label>
                <div className="border border-gray-300 px-3 py-3 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                  <CardElement options={cardElementOptions} onChange={handleChange} />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  For testing: Use card 4242 4242 4242 4242, any future date, any 3 digits for CVC, and any 5 digits for ZIP.
                </p>
              </div>
              
              <div 
                onClick={handleSubmit}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded text-center cursor-pointer ${(processing || disabled || succeeded) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {processing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Pay Now"}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This is a secure payment. Your card information is encrypted.</p>
          <p className="mt-1">© 2025 MediCart. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

// Order Confirmation Page Component
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
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-orange-500 text-white p-2 rounded-lg mr-3">
              <span className="font-bold text-2xl">M</span>
            </div>
            <h1 className="text-2xl font-bold text-orange-500">MediCart</h1>
          </div>
        </div>
        
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
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 MediCart. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

// Define routes to be used in your existing Router
export const PaymentRoutes = () => (
  <Routes>
    <Route path="/payment" element={
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    } />
    <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
    <Route path="/orders" element={<div>Order History Page (Coming Soon)</div>} />
  </Routes>
);

// Individual components for direct export
export const PaymentPageWithStripe = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export { OrderConfirmationPage };

// Default export for main payment page
export default PaymentPageWithStripe;