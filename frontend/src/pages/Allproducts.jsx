import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Smartphone,
  CheckCircle2,
  Truck,
  CreditCard,
} from "lucide-react";
import { useCart } from "../store/CartContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";

// Temporary mock data until we connect Django!
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Konekta Aura Pro",
    price: "₱45,999.00",
    status: "In Stock",
    specs: "256GB • 12GB RAM",
    description:
      "Our flagship device built for creators. Features a stunning AMOLED display and a pro-grade camera system for perfect night shots.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 2,
    name: "Nova X Gaming",
    price: "₱24,500.00",
    status: "Low Stock",
    specs: "128GB • 8GB RAM",
    description:
      "Built for mobile gamers. Equipped with a high-refresh-rate screen and advanced liquid cooling for non-stop ranked matches.",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 3,
    name: "Horizon Fold",
    price: "₱75,000.00",
    status: "In Stock",
    specs: "512GB • 12GB RAM",
    description:
      "Experience the future. A premium foldable smartphone that gives you tablet-sized productivity right in your pocket.",
    image:
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 4,
    name: "Konekta Lite 1",
    price: "₱12,999.00",
    status: "Out of Stock",
    specs: "64GB • 6GB RAM",
    description:
      "Your reliable everyday companion. Features an massive 5000mAh battery that easily lasts up to two days on a single charge.",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=500",
  },
];

export default function Allproducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#030304] text-white font-body selection:bg-[#F7931A]/30 py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header Section */}
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            All Devices
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="relative w-full max-w-md group flex items-center">
              <Search className="absolute left-3 w-5 h-5 text-[#94A3B8] group-focus-within:text-[#F7931A] transition-colors z-10" />
              <Input
                type="text"
                placeholder="Search for models, brands, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 font-mono text-sm text-[#94A3B8]">
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-[#F7931A]" /> Cash on Delivery
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-[#FFD600]" /> Official
                Warranty
              </span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_PRODUCTS.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ).map((product) => (
            <Card
              key={product.id}
              interactive
              className="p-8 flex flex-col h-full group"
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-transparent group-hover:border-[#F7931A] rounded-tl-2xl transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-transparent group-hover:border-[#F7931A] rounded-br-2xl transition-colors duration-300" />

              <div className="w-full h-48 bg-gradient-to-br from-black/60 to-white/5 rounded-xl mb-6 flex items-center justify-center border border-white/5 relative overflow-hidden group-hover:border-[#F7931A]/30 transition-colors">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                  />
                ) : (
                  <Smartphone className="w-16 h-16 text-white/20 group-hover:text-[#F7931A]/40 transition-colors duration-500 group-hover:scale-110" />
                )}
              </div>

              <div className="flex-grow flex flex-col mt-4">
                <h3 className="font-heading font-semibold text-xl text-white mb-2">
                  {product.name}
                </h3>
                <p className="font-mono text-sm text-[#94A3B8] mb-4 flex-grow">
                  {product.specs}
                </p>
                <div className="flex items-center justify-between gap-4 mt-auto mb-6">
                  <span className="font-mono text-xl font-medium text-[#FFD600] truncate">
                    {product.price}
                  </span>
                  <Badge
                    className="shrink-0 whitespace-nowrap"
                    variant={
                      product.status === "In Stock"
                        ? "success"
                        : product.status === "Low Stock"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {product.status}
                  </Badge>
                </div>
              </div>

              <Button
                className="w-full gap-2"
                onClick={() => setSelectedProduct(product)}
              >
                <ShoppingCart className="w-4 h-4" /> View Details
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <div className="space-y-6">
            <div className="flex items-center gap-6 border-b border-white/10 pb-6">
              {/* Image Box */}
              <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center shadow-lg">
                {selectedProduct.image ? (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Smartphone className="w-10 h-10 text-white/20" />
                )}
              </div>

              {/* Title & Specs */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
                  {selectedProduct.name}
                </h2>
                <p className="font-mono text-sm text-[#94A3B8]">
                  {selectedProduct.specs}
                </p>
              </div>
            </div>
            <p className="font-body text-[#94A3B8] leading-relaxed">
              {selectedProduct.description}
            </p>
            <div className="flex items-center justify-between pt-4">
              <span className="font-mono text-3xl font-bold text-[#FFD600]">
                {selectedProduct.price}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </Button>
              <Button className="w-full gap-2">
                <CreditCard className="w-4 h-4" /> Buy Now
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
