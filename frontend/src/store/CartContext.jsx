import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api"; // Using your configured API instance!

// Create the Context
const CartContext = createContext();

// Create the Provider Component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // FIXED: Now looking for the exact key your AuthContext uses!
  const getToken = () => localStorage.getItem("access_token");

  // Fetch the cart from Django
  const fetchCart = async () => {
    const token = getToken();
    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      // Using your api instance means we don't need to type http://127... every time
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await api.get("cart/", config);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart from Django:", error);
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
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const payload = { product_id: product.id, quantity: 1 };

      await api.post("cart/", payload, config);
      fetchCart(); // Instantly refresh the cart from the database
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Remove an item entirely from the database
  const removeFromCart = async (cartItemId) => {
    const token = getToken();
    if (!token) return;

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.delete(`cart/${cartItemId}/`, config);
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
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
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const payload = { product_id: productId, quantity: delta };

      await api.post("cart/", payload, config);
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
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
