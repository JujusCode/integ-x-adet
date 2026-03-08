import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Smartphone,
  Package,
  AlertCircle,
  UploadCloud,
} from "lucide-react";
import api from "../services/api";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // 1. Separate state for the text data and the physical file
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    status: "In Stock",
    specs: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null); // Holds the actual uploaded file

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await api.get("products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 2. UPDATED SUBMIT FUNCTION (Using FormData)
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Clean the price! Remove '₱', commas, and spaces so it is a pure number (e.g., "45999.00")
    const cleanPrice = formData.price.toString().replace(/[₱,\s]/g, "");

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("price", cleanPrice); // <-- Sending the clean number
    submitData.append("status", formData.status);
    submitData.append("specs", formData.specs);
    submitData.append("description", formData.description);

    if (imageFile) {
      submitData.append("image", imageFile);
    }

    try {
      // Create a special configuration to override the JSON default
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingId) {
        // Pass the config as the third argument
        await api.put(`products/${editingId}/`, submitData, config);
      } else {
        // Pass the config as the third argument
        await api.post("products/", submitData, config);
      }

      fetchInventory();
      closeModal();
    } catch (error) {
      console.error("Django's Error Response:", error.response?.data);
      alert(
        `Error saving! Check terminal: ${JSON.stringify(error.response?.data)}`,
      );
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this device from the database?",
      )
    ) {
      try {
        await api.delete(`products/${id}/`);
        fetchInventory();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. New handler specifically for the file input
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        status: product.status,
        specs: product.specs,
        description: product.description,
      });
      setEditingId(product.id);
    } else {
      setFormData({
        name: "",
        price: "",
        status: "In Stock",
        specs: "",
        description: "",
      });
      setEditingId(null);
    }
    setImageFile(null); // Always clear the file state when opening the modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setImageFile(null);
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#030304]">
        <div className="animate-pulse flex flex-col items-center gap-4 text-[#F7931A]">
          <Package className="w-12 h-12" />
          <p className="font-mono text-sm tracking-widest uppercase">
            Connecting to Database...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#030304] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="font-heading text-3xl font-bold">
              Inventory Management
            </h1>
            <p className="font-mono text-sm text-[#94A3B8] mt-1">
              Live MySQL Database Feed
            </p>
          </div>
          <Button onClick={() => openModal()} className="gap-2 shrink-0">
            <Plus className="w-4 h-4" /> Add New Device
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 font-mono text-xs uppercase tracking-wider text-[#94A3B8]">
                  <th className="p-4">Device Name</th>
                  <th className="p-4">Specs</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-8 text-center text-[#94A3B8] font-mono text-sm"
                    >
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      No devices found in database. Add one to get started!
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4 font-heading font-medium text-white flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 shrink-0 overflow-hidden">
                          {/* 4. Display the uploaded image in the table if it exists */}
                          {product.image ? (
                            <img
                              // This checks if Django sent a full URL. If not, it attaches localhost:8000 to the front!
                              src={
                                product.image.startsWith("http")
                                  ? product.image
                                  : `http://localhost:8000${product.image}`
                              }
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Smartphone className="w-5 h-5 text-[#F7931A]" />
                          )}
                        </div>
                        {product.name}
                      </td>
                      <td className="p-4 font-mono text-sm text-[#94A3B8]">
                        {product.specs}
                      </td>
                      <td className="p-4 font-mono text-sm text-[#FFD600]">
                        {product.price}
                      </td>
                      <td className="p-4">
                        <Badge
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
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openModal(product)}
                            className="border-white/10 hover:bg-white/10"
                          >
                            <Edit className="w-4 h-4 text-[#94A3B8]" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                            className="border-white/10 hover:bg-red-500/20 hover:border-red-500/50"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="font-heading text-2xl font-bold text-white">
              {editingId ? "Edit Device Details" : "Add New Device"}
            </h2>
          </div>

          <div className="space-y-4">
            {/* 5. The new Image Upload Input */}
            <div>
              <label className="block font-mono text-xs text-[#94A3B8] mb-1">
                Device Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center justify-center w-full px-4 py-3 bg-[#030304] border border-dashed border-white/20 rounded-lg cursor-pointer hover:border-[#F7931A]/50 transition-colors group">
                  <div className="flex items-center gap-2 text-sm text-[#94A3B8] group-hover:text-[#F7931A] transition-colors">
                    <UploadCloud className="w-5 h-5" />
                    <span>
                      {imageFile ? imageFile.name : "Click to upload an image"}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-[#94A3B8] mb-1">
                Device Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Konekta Aura Pro"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-[#94A3B8] mb-1">
                  Price (₱)
                </label>
                <Input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g. ₱45,999.00"
                  required
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-[#94A3B8] mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full bg-[#030304] border border-white/10 rounded-lg px-4 py-2.5 text-white font-body focus:border-[#F7931A] focus:ring-1 focus:ring-[#F7931A] outline-none transition-all"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-[#94A3B8] mb-1">
                Hardware Specs
              </label>
              <Input
                type="text"
                name="specs"
                value={formData.specs}
                onChange={handleInputChange}
                placeholder="e.g. 256GB • 12GB RAM"
                required
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-[#94A3B8] mb-1">
                Marketing Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full bg-[#030304] border border-white/10 rounded-lg px-4 py-3 text-white font-body focus:border-[#F7931A] focus:ring-1 focus:ring-[#F7931A] outline-none transition-all resize-none"
                placeholder="Brief description of the device..."
                required
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full gap-2">
              {editingId ? "Save Changes" : "Save to Database"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
