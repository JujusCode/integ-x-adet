import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import Storefront from "./pages/Storefront";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage"; // <-- IMPORT CART
import Checkout from "./pages/Checkout"; // <-- IMPORT CHECKOUT

// Import Providers & Layout
import { Navbar } from "./components/layout/Navbar";
import { CartProvider } from "./store/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-[#030304] text-white selection:bg-[#F7931A]/30 font-body">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Storefront />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<CartPage />} />{" "}
              {/* <-- ADD CART ROUTE */}
              <Route path="/checkout" element={<Checkout />} />{" "}
              {/* <-- ADD CHECKOUT ROUTE */}
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}
