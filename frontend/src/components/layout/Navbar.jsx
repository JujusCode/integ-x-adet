import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Smartphone,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Button } from "../ui/Button";
import { useCart } from "../../store/CartContext";
import { useAuth } from "../../store/AuthContext";

export function Navbar() {
  const { cartItemCount } = useCart();
  const { user, logout } = useAuth(); // Grab the logout function from context

  const location = useLocation();
  const navigate = useNavigate();

  // Check if we are currently on the dashboard page
  const isDashboard = location.pathname === "/dashboard";

  const handleLogout = () => {
    logout();
    navigate("/"); // Send them back to the storefront after logging out
  };

  // ==========================================
  // 1. ADMIN DASHBOARD NAVBAR
  // ==========================================
  if (isDashboard) {
    return (
      <nav className="sticky top-0 z-40 w-full bg-[#030304]/80 backdrop-blur-lg border-b border-[#F7931A]/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Admin Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-[#EA580C]/20 border border-[#EA580C]/50 rounded-lg p-2">
              <LayoutDashboard className="w-6 h-6 text-[#F7931A]" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-tight text-white leading-none">
                Konekta
              </span>
              <span className="font-mono text-[10px] text-[#F7931A] uppercase tracking-widest mt-1">
                Command Center
              </span>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="flex items-center gap-6">
            <span className="hidden sm:block font-mono text-xs text-[#94A3B8]">
              Active Session:{" "}
              <span className="text-white">{user?.username || "Admin"}</span>
            </span>
            <Link
              to="/"
              className="text-sm font-body font-medium text-[#94A3B8] hover:text-white transition-colors"
            >
              View Storefront
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-white/10 hover:bg-white/5 text-[#94A3B8] hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>
        </div>
      </nav>
    );
  }

  // ==========================================
  // 2. PUBLIC STOREFRONT NAVBAR
  // ==========================================
  return (
    <nav className="sticky top-0 z-40 w-full bg-[#030304]/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-[#EA580C]/20 border border-[#EA580C]/50 rounded-lg p-2 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(234,88,12,0.4)]">
            <Smartphone className="w-6 h-6 text-[#F7931A]" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-white">
            Konekta
          </span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm text-[#94A3B8]">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <Link
            to="/track-order"
            className="hover:text-white transition-colors"
          >
            Track Order
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="hidden sm:flex text-sm font-body font-medium text-[#F7931A] hover:text-[#FFD600] transition-colors"
            >
              Admin Panel
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex text-sm font-body font-medium text-white/70 hover:text-white transition-colors"
            >
              Sign In
            </Link>
          )}

          <Link
            to="/cart"
            className="relative group flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 group-hover:text-[#F7931A] transition-colors" />

            {/* Glowing Cart Counter Badge */}
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-[10px] font-bold text-white shadow-[0_0_10px_rgba(247,147,26,0.5)]">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
