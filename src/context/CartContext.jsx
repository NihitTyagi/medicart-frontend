import React, { createContext, useContext, useState } from 'react';

// 1. Create context
export const CartContext = createContext();

// 2. Custom hook to use cart context
export const useCart = () => useContext(CartContext);

// 3. CartProvider to wrap your app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Default: empty cart

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
