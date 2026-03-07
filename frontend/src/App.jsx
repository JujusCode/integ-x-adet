import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Storefront from "./pages/Storefront";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success"; // <-- IMPORTED
import Dashboard from "./pages/Dashboard"; // <-- IMPORTED

// Layout & Providers
import { Navbar } from "./components/layout/Navbar";
import { CartProvider } from "./store/CartContext";
import { AuthProvider } from "./store/AuthContext"; // <-- IMPORTED

export default function App() {
  return (
    <AuthProvider>
      {" "}
      {/* <-- ADDED AUTH WRAPPER */}
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-[#030304] text-white selection:bg-[#F7931A]/30 font-body">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Storefront />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />{" "}
                {/* <-- ADDED ROUTE */}
                <Route path="/dashboard" element={<Dashboard />} />{" "}
                {/* <-- ADDED ROUTE */}
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
