import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Storefront from "./pages/Storefront";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Dashboard from "./pages/Dashboard";
import TrackOrder from "./pages/TrackOrder";
import Allproducts from "./pages/Allproducts"; // <-- Correctly imported

// Layout & Providers
import { Navbar } from "./components/layout/Navbar";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { CartProvider } from "./store/CartContext";
import { AuthProvider } from "./store/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-[#030304] text-white selection:bg-[#F7931A]/30 font-body">
            <Navbar />
            <main>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Storefront />} />

                {/* Fixed: This is the ONLY /products route now! */}
                <Route path="/products" element={<Allproducts />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />

                {/* Secure Route 1: Track Order (For any logged in user) */}
                <Route
                  path="/track-order"
                  element={
                    <ProtectedRoute>
                      <TrackOrder />
                    </ProtectedRoute>
                  }
                />

                {/* Secure Route 2: Admin Dashboard (For Admins) */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
