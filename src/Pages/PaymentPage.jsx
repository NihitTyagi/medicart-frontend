import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const PaymentForm = ({ orderId = "order123" }) => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState("idle");

  useEffect(() => {
    console.log("🛒 Cart Items in Payment Page:", cartItems);
  }, [cartItems]);

  const calculateSummary = () => {
    const subtotal = cartItems.reduce((sum, item) => {
      const price = Number(item?.productId?.price) || 0;
      const quantity = Number(item?.quantity) || 0;
      return sum + price * quantity;
    }, 0);

    const tax = +(subtotal * 0.08).toFixed(2);
    const shipping = subtotal > 50 ? 0 : 4.99;
    const total = +(subtotal + tax + shipping).toFixed(2);
    return { subtotal, tax, shipping, total };
  };

  const summary = calculateSummary();

  const handlePayment = () => {
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("success");
      setTimeout(() => {
        navigate("/order-confirmation", {
          state: {
            orderId,
            amount: summary.total,
          },
        });
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 to-teal-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-black text-center">
          Payment Summary
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-red-500 font-medium">
            Your cart is empty or failed to load.
          </p>
        ) : (
          cartItems.map((item, index) => {
            const name = item?.productId?.name ?? "Unnamed Item";
            const price = Number(item?.productId?.price) || 0;
            const quantity = Number(item?.quantity) || 0;

            return (
              <div
                key={index}
                className="flex justify-between py-2 text-black"
              >
                <span>
                  {name} (x{quantity})
                </span>
                <span>₹{(price * quantity).toFixed(2)}</span>
              </div>
            );
          })
        )}

        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex justify-between py-1 text-black">
            <span>Subtotal</span>
            <span>₹{summary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 text-black">
            <span>Tax</span>
            <span>₹{summary.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 text-black">
            <span>Shipping</span>
            <span>₹{summary.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 font-bold text-black">
            <span>Total</span>
            <span>₹{summary.total.toFixed(2)}</span>
          </div>
        </div>

        {paymentStatus === "success" ? (
          <motion.div
            className="flex flex-col items-center mt-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CheckCircle2 className="text-green-500 w-12 h-12 mb-2" />
            <span className="text-green-700 font-semibold">
              Payment Successful!
            </span>
          </motion.div>
        ) : (
          <button
            onClick={handlePayment}
            disabled={paymentStatus === "processing"}
            className="w-full mt-6 bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
          >
            {paymentStatus === "processing" ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4 inline-block" />
                Processing...
              </>
            ) : (
              "Pay Now"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
