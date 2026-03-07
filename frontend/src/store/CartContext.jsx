import React, { createContext, useContext, useState } from "react";

// Create the Context
const CartContext = createContext();

// Create the Provider Component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add an item to the cart (or increase quantity if it already exists)
  const addToCart = (product) => {
    // 1. Log the incoming data so we can see it in the Developer Console!
    console.log("Attempting to add to cart:", product);

    // 2. The Safety Net
    if (!product || !product.id) {
      console.error("CRITICAL: Invalid product passed to Cart!");
      return;
    }

    // 3. The actual cart logic
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        console.log("Item exists! Increasing quantity.");
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      console.log("New item! Adding to cart.");
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove an item entirely
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  // Update specific quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  // Empty the cart after successful checkout
  const clearCart = () => setCartItems([]);

  // Calculate the total number of items for the Navbar badge
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart easily in any component
export function useCart() {
  return useContext(CartContext);
}
