import React, { useState } from "react";
import { Plus, Edit2, Trash2, Box, Activity } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";

// Mock data to visualize the CRUD table before Django connects
const INITIAL_INVENTORY = [
  {
    id: 1,
    name: "CipherPhone Pro",
    price: 1299.0,
    stock: 45,
    status: "Active",
  },
  { id: 2, name: "Node Mobile X", price: 899.0, stock: 5, status: "Low Stock" },
];

export default function Dashboard() {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", price: "", stock: "" });

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ name: item.name, price: item.price, stock: item.stock });
    } else {
      setEditingItem(null);
      setFormData({ name: "", price: "", stock: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      // UPDATE Action
      setInventory(
        inventory.map((item) =>
          item.id === editingItem.id
            ? { ...item, ...formData, id: item.id }
            : item,
        ),
      );
    } else {
      // CREATE Action
      const newItem = {
        ...formData,
        id: Date.now(),
        status: parseInt(formData.stock) > 10 ? "Active" : "Low Stock",
      };
      setInventory([...inventory, newItem]);
    }
    setIsModalOpen(false);
  };

  // DELETE Action
  const handleDelete = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3">
          <Activity className="w-8 h-8 text-[#F7931A]" />
          <div>
            <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
              Admin Terminal
            </h1>
            <p className="font-mono text-sm text-[#94A3B8]">
              Inventory Node Management
            </p>
          </div>
        </div>
        <Button onClick={() => openModal()} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" /> Add New Device
        </Button>
      </div>

      {/* READ Action: Inventory Table */}
      <Card>
        <CardHeader className="border-b border-white/10 pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <Box className="w-5 h-5 text-[#94A3B8]" /> Current Ledger
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 font-mono text-xs text-[#94A3B8] uppercase tracking-wider bg-black/20">
                <th className="p-4 font-medium">Device ID / Name</th>
                <th className="p-4 font-medium">Value (USD)</th>
                <th className="p-4 font-medium">Stock Level</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-body text-sm">
              {inventory.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="p-4">
                    <div className="text-white font-medium">{item.name}</div>
                    <div className="text-xs font-mono text-[#94A3B8]">
                      #{item.id}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-[#FFD600]">
                    ${parseFloat(item.price).toFixed(2)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-white">{item.stock}</span>
                      <Badge variant={item.stock > 10 ? "success" : "danger"}>
                        {item.stock > 10 ? "Active" : "Low Stock"}
                      </Badge>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openModal(item)}
                        className="p-2 text-[#94A3B8] hover:text-[#FFD600] bg-white/5 rounded-md transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-[#94A3B8] hover:text-[#EA580C] bg-white/5 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Create/Update Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="font-heading text-2xl font-bold text-white mb-6">
          {editingItem ? "Update Device Node" : "Initialize New Device"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#94A3B8] uppercase">
              Device Name
            </label>
            <Input
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#94A3B8] uppercase">
                Price (USD)
              </label>
              <Input
                required
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#94A3B8] uppercase">
                Stock Count
              </label>
              <Input
                required
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingItem ? "Save Updates" : "Publish Device"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
