import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Cpu,
  Shield,
  Zap,
  CreditCard,
} from "lucide-react";

import { useCart } from "../store/CartContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "CipherPhone Pro",
    price: "$1,299.00",
    status: "In Stock",
    specs: "512GB • 12GB RAM",
    description:
      "Our flagship decentralized device featuring a hardware-level encryption chip.",
  },
  {
    id: 2,
    name: "Node Mobile X",
    price: "$899.00",
    status: "Low Stock",
    specs: "256GB • 8GB RAM",
    description:
      "Run a full node from your pocket. Optimized for continuous blockchain synchronization.",
  },
  {
    id: 3,
    name: "Ledger Flip",
    price: "$1,499.00",
    status: "In Stock",
    specs: "1TB • 16GB RAM",
    description:
      "A foldable screen that doubles as a physical hardware wallet confirmation device.",
  },
  {
    id: 4,
    name: "Genesis Phone 1",
    price: "$699.00",
    status: "Out of Stock",
    specs: "128GB • 8GB RAM",
    description:
      "The original encrypted entry-level phone. Perfect for your first cold storage mobile setup.",
  },
];

export default function Storefront() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  const gridBackgroundStyle = {
    backgroundSize: "50px 50px",
    backgroundImage: `
      linear-gradient(to right, rgba(30, 41, 59, 0.5) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(30, 41, 59, 0.5) 1px, transparent 1px)
    `,
    maskImage: "radial-gradient(circle at center, black 40%, transparent 100%)",
    WebkitMaskImage:
      "radial-gradient(circle at center, black 40%, transparent 100%)",
  };

  return (
    <div className="min-h-screen bg-[#030304] text-white font-body selection:bg-[#F7931A]/30">
      <section className="relative py-24 overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F7931A] opacity-5 blur-[120px] rounded-full pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={gridBackgroundStyle}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-8">
          <Badge
            variant="success"
            className="backdrop-blur-sm bg-white/5 border-white/10"
          >
            Secure Hardware Node Offline
          </Badge>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Decentralized Power in <br />
            <span className="bg-gradient-to-r from-[#F7931A] to-[#FFD600] bg-clip-text text-transparent">
              Your Pocket.
            </span>
          </h1>

          <p className="font-body text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Browse our curated selection of high-security, performance-driven
            mobile devices. Engineered for the future of digital finance.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="relative w-full max-w-md group flex items-center">
            <Search className="absolute left-3 w-5 h-5 text-[#94A3B8] group-focus-within:text-[#F7931A] transition-colors z-10" />
            <Input
              type="text"
              placeholder="Search devices by hex code or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4 font-mono text-sm text-[#94A3B8]">
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-[#EA580C]" /> Encrypted
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-[#FFD600]" /> Lightning Fast
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
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

              <div className="w-full h-48 bg-gradient-to-br from-black/60 to-white/5 rounded-xl mb-6 flex items-center justify-center border border-white/5 relative overflow-hidden">
                <Cpu className="w-16 h-16 text-white/20 group-hover:text-[#F7931A]/40 transition-colors duration-500 group-hover:scale-110" />
              </div>

              <div className="flex-grow flex flex-col mt-4">
                <h3 className="font-heading font-semibold text-xl text-white mb-2">
                  {product.name}
                </h3>
                <p className="font-mono text-sm text-[#94A3B8] mb-4 flex-grow">
                  {product.specs}
                </p>
                <div className="flex items-center justify-between gap-4 mt-auto mb-6">
                  <span className="font-mono text-2xl font-medium text-[#FFD600] truncate">
                    {product.price}
                  </span>
                  <Badge
                    className="shrink-0 whitespace-nowrap"
                    variant={
                      product.status === "In Stock"
                        ? "warning"
                        : product.status === "Low Stock"
                          ? "danger"
                          : "default"
                    }
                  >
                    {product.status}
                  </Badge>
                </div>
              </div>

              {/* SAFE BUTTON 1: Safely opens the modal and passes the product */}
              <Button
                className="w-full gap-2"
                onClick={() => setSelectedProduct(product)}
              >
                <ShoppingCart className="w-4 h-4" />
                View Details
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <div className="bg-[#EA580C]/20 p-3 rounded-lg border border-[#EA580C]/50">
                <Cpu className="w-8 h-8 text-[#F7931A]" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">
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
              {/* SAFE BUTTON 2: Safely passes the product to the cart and closes the modal */}
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
