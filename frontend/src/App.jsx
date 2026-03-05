import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Storefront from "./pages/Storefront";
import Login from "./pages/Login"; // <-- IMPORT THIS
import Register from "./pages/Register"; // <-- IMPORT THIS
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
              <Route path="/login" element={<Login />} />{" "}
              {/* <-- ADD THIS ROUTE */}
              <Route path="/register" element={<Register />} />{" "}
              {/* <-- ADD THIS ROUTE */}
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}
