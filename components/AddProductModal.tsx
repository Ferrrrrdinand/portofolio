"use client";

import { useState } from "react";
import { X, Plus, PackagePlus } from "lucide-react";
import { Product } from "@/lib/types";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: (product: Product) => void;
}

export default function AddProductModal({ isOpen, onClose, onProductAdded }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "Digital Template",
    price: "Rp 150.000",
    description: "",
    image: "/images/products/placeholder.svg",
    status: "available" as "available" | "coming_soon" | "pre_order",
    features: "Responsive Design, Full Source Code, Documentation",
    link: "https://wa.me/6281234567890?text=Halo%20FERNOVA,%20saya%20tertarik%20dengan%20produk"
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        features: formData.features.split(",").map((f) => f.trim()).filter(Boolean)
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        onProductAdded(json.data);
        onClose();
        // Reset form
        setFormData({
          name: "",
          type: "Digital Template",
          price: "Rp 150.000",
          description: "",
          image: "/images/products/placeholder.svg",
          status: "available",
          features: "Responsive Design, Full Source Code, Documentation",
          link: "https://wa.me/6281234567890?text=Halo%20FERNOVA,%20saya%20tertarik%20dengan%20produk"
        });
      } else {
        alert(json.error || "Gagal menyimpan produk");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan produk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <PackagePlus size={18} style={{ color: "var(--orange)" }} />
            <div>
              <span className="kicker">DATABASE PRODUK FERNOVA</span>
              <h3 style={{ margin: "2px 0 0", fontSize: "16px", color: "#fff" }}>Tambah Produk Baru</h3>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: "#aaa", fontSize: "12px", margin: "0 0 16px" }}>
            Produk akan otomatis tersimpan di database <code>data/products.json</code> dan langsung tayang di katalog toko FERNOVA.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label className="form-label">Nama Produk *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: FERNOVA 3D Portfolio Theme"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label className="form-label">Tipe / Kategori Produk *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Digital Template / Preset"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Harga Produk *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Rp 199.000 atau Gratis"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label className="form-label">Status Ketersediaan *</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                >
                  <option value="available">Tersedia / Ready</option>
                  <option value="coming_soon">Coming Soon</option>
                  <option value="pre_order">Pre-Order</option>
                </select>
              </div>

              <div>
                <label className="form-label">Path File Gambar atau URL *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="/images/products/my-product.jpg atau URL"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">Deskripsi Produk</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Jelaskan value utama produk ini untuk pembeli..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Fitur Utama (Pisahkan dengan koma)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Dark mode elegan, Next.js 14, Siap pakai, Garansi update"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Link Pembelian / Chat WhatsApp</label>
              <input
                type="text"
                className="form-input"
                placeholder="https://wa.me/62... atau link checkout"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
              <button type="button" className="button button-outline" onClick={onClose}>
                Batal
              </button>
              <button type="submit" className="button" disabled={loading}>
                <Plus size={15} /> {loading ? "Menyimpan..." : "Tambah Produk"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

