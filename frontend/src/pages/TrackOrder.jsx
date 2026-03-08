import React from "react";
import { Package, Search, MapPin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export default function TrackOrder() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 min-h-[calc(100vh-80px)]">
      <div className="flex items-center gap-3 mb-8">
        <Package className="w-8 h-8 text-[#F7931A]" />
        <div>
          <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
            Track Your Order
          </h1>
          <p className="font-mono text-sm text-[#94A3B8]">
            Locate your Konekta package
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b border-white/10 pb-4">
          <CardTitle className="text-xl">Active Shipments</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="flex gap-4">
            <Input
              placeholder="Enter your Order ID (e.g., #VLT-123456)"
              className="flex-grow"
            />
            <Button className="gap-2 shrink-0">
              <Search className="w-4 h-4" /> Find Package
            </Button>
          </div>

          {/* Placeholder for when they actually have an order */}
          <div className="p-6 border border-white/10 bg-white/5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FFD600]/20 rounded-full flex items-center justify-center border border-[#FFD600]/30">
                <MapPin className="w-5 h-5 text-[#FFD600]" />
              </div>
              <div>
                <p className="font-mono text-xs text-[#94A3B8] mb-1">
                  Order #VLT-99281
                </p>
                <p className="font-heading font-semibold text-white">
                  In Transit to Destination
                </p>
              </div>
            </div>
            <Badge variant="warning">Expected: Tomorrow</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
