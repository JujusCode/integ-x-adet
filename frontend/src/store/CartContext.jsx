import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

// Create the Context
const CartContext = createContext();

// Create the Provider Component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // NEW: Loading state to prevent premature redirects
  const [isCartLoading, setIsCartLoading] = useState(true);

  const getToken = () => localStorage.getItem("access_token");

  // Fetch the cart from Django
  const fetchCart = async () => {
    const token = getToken();
    if (!token) {
      setCartItems([]);
      setIsCartLoading(false);
      return;
    }

    try {
      setIsCartLoading(true);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await api.get("cart/", config);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart from Django:", error);
    } finally {
      setIsCartLoading(false); // Data is fully loaded
    }
  };

  // Run fetchCart when the app loads
  useEffect(() => {
    fetchCart();
  }, []);

  // Add an item to the database cart
  const addToCart = async (product) => {
    const token = getToken();
    if (!token) {
      alert("Please sign in to add items to your cart!");
      return;
    }

    try {
      setIsCartLoading(true);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const payload = { product_id: product.id, quantity: 1 };

      await api.post("cart/", payload, config);

      // CRITICAL FIX: The 'await' here forces the app to pause until the database
      // returns the fresh cart data BEFORE moving on to the checkout redirect.
      await fetchCart();
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setIsCartLoading(false);
    }
  };

  // Remove an item entirely from the database
  const removeFromCart = async (cartItemId) => {
    const token = getToken();
    if (!token) return;

    try {
      setIsCartLoading(true);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.delete(`cart/${cartItemId}/`, config);
      await fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
      setIsCartLoading(false);
    }
  };

  // Update specific quantity using our Django logic (+1 or -1)
  const updateQuantity = async (productId, currentQuantity, delta) => {
    const item = cartItems.find((i) => i.product === productId);
    if (!item) return;

    if (currentQuantity + delta < 1) {
      return removeFromCart(item.id);
    }

    const token = getToken();
    try {
      setIsCartLoading(true);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const payload = { product_id: productId, quantity: delta };

      await api.post("cart/", payload, config);
      await fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      setIsCartLoading(false);
    }
  };

  // Empty the cart locally
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
        fetchCart,
        isCartLoading, // EXPORTED: So the Checkout page knows to wait
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
