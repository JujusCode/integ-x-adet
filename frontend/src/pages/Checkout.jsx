import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Shield, CreditCard, MapPin, CheckCircle } from "lucide-react";

import { useCart } from "../store/CartContext";
import api from "../services/api"; // Make sure to import your API service!
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function Checkout() {
  const { cartItems, fetchCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State for Django
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  if (cartItems.length === 0) {
    return <Navigate to="/" replace />;
  }

  // FIXED: Ensure we are safely parsing the Django product_price string
  const parsePrice = (priceStr) => parseFloat(priceStr || 0);

  // FIXED: Now points to item.product_price instead of item.price
  const subtotal = cartItems.reduce(
    (total, item) => total + parsePrice(item.product_price) * item.quantity,
    0,
  );
  const networkFee = 150.0; // Matching the CartPage fee
  const total = subtotal + networkFee;

  // The Real Backend Checkout Logic
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Combine the fields for the Django shipping_address model
      const fullShippingAddress = `${address}, ${city}, ${zip}`;

      const payload = {
        shipping_address: fullShippingAddress,
      };

      // Send the order to MySQL!
      await api.post("orders/checkout/", payload, config);

      // Tell the frontend context to wipe the cart (syncing with the backend wipe)
      fetchCart();

      // Redirect to the success screen
      const response = await api.post("orders/checkout/", payload, config);
      fetchCart();
      navigate("/success", { state: { orderData: response.data } }); // <-- Pass the order data!
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("There was an error processing your transaction.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-8 h-8 text-[#F7931A]" />
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight">
          Secure Checkout
        </h1>
      </div>

      <form
        onSubmit={handleCheckoutSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader className="border-b border-white/10 pb-4 flex flex-row items-center gap-2">
              <MapPin className="w-5 h-5 text-[#94A3B8]" />
              <CardTitle className="text-xl">
                Destination Node (Shipping)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                  Full Name
                </label>
                <Input required placeholder="Juan Dela Cruz" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                  Email Address
                </label>
                <Input required type="email" placeholder="juan@example.com" />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                  Physical Address
                </label>
                <Input
                  required
                  placeholder="123 Mabini St."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                  City
                </label>
                <Input
                  required
                  placeholder="Cagayan De Oro"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                  Postal / Zip Code
                </label>
                <Input
                  required
                  placeholder="9000"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-white/10 pb-4 flex flex-row items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#94A3B8]" />
              <CardTitle className="text-xl">Payment Verification</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2 space-y-2">
                <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                  Card Number
                </label>
                <Input
                  required
                  placeholder="0000 0000 0000 0000"
                  maxLength="19"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                  Expiration Date
                </label>
                <Input required placeholder="MM/YY" maxLength="5" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                  Security Code (CVC)
                </label>
                <Input
                  required
                  type="password"
                  placeholder="•••"
                  maxLength="4"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Final Confirmation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-28 border-[#F7931A]/30 shadow-[0_0_30px_-10px_rgba(247,147,26,0.1)]">
            <CardHeader className="border-b border-white/10 pb-6">
              <CardTitle className="text-2xl">Confirm Broadcast</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm font-mono"
                  >
                    <span className="text-[#94A3B8] truncate pr-4">
                      {/* FIXED: Now points to product_name */}
                      {item.quantity}x {item.product_name}
                    </span>
                    <span className="text-white">
                      ₱
                      {parsePrice(item.product_price).toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2 },
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                <span className="text-[#94A3B8] font-body">Final Total</span>
                <span className="text-3xl font-bold text-[#FFD600]">
                  ₱
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full gap-2"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="animate-pulse">Broadcasting...</span>
                  ) : (
                    <>
                      Authorize Payment <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-[#94A3B8] font-mono mt-4">
                  By authorizing, you agree to our encrypted terms of service.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
