"use client";

import { useState } from "react";
import { X, Plus, FolderPlus } from "lucide-react";
import { PortfolioItem } from "@/lib/types";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdded: (project: PortfolioItem) => void;
}

export default function AddProjectModal({ isOpen, onClose, onProjectAdded }: AddProjectModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Web Development",
    discipline: "web" as "web" | "multimedia" | "design" | "event",
    year: new Date().getFullYear().toString(),
    client: "",
    summary: "",
    description: "",
    tags: "",
    image: "/images/portfolio/placeholder.svg",
    liveUrl: ""
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        featured: false
      };

      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        onProjectAdded(json.data);
        onClose();
        // Reset form
        setFormData({
          title: "",
          category: "Web Development",
          discipline: "web",
          year: new Date().getFullYear().toString(),
          client: "",
          summary: "",
          description: "",
          tags: "",
          image: "/images/portfolio/placeholder.svg",
          liveUrl: ""
        });
      } else {
        alert(json.error || "Gagal menyimpan proyek");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan proyek");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FolderPlus size={18} style={{ color: "var(--orange)" }} />
            <div>
              <span className="kicker">DATABASE PORTOFOLIO</span>
              <h3 style={{ margin: "2px 0 0", fontSize: "16px", color: "#fff" }}>Tambah Karya / Proyek Baru</h3>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: "#aaa", fontSize: "12px", margin: "0 0 16px" }}>
            Data ini akan disimpan ke dalam database <code>data/portfolio.json</code>. Anda dapat menaruh file gambar di folder <code>public/images/portfolio/</code> dan menggunakan path tersebut.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label className="form-label">Judul Proyek *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: Zantova Platform 2.0"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label className="form-label">Kategori Tampilan *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Web Development"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="form-label">Disiplin Filter *</label>
                <select
                  className="form-select"
                  value={formData.discipline}
                  onChange={(e) => setFormData({ ...formData, discipline: e.target.value as any })}
                >
                  <option value="web">Web & App Development</option>
                  <option value="multimedia">Multimedia & Video</option>
                  <option value="design">Creative & Brand Design</option>
                  <option value="event">Event Organizer & Production</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label className="form-label">Tahun Pembuatan</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="2026"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Nama Klien / Inisiator</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: FERNOVA Labs"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="form-label">Path File Gambar atau URL *</label>
              <input
                type="text"
                className="form-input"
                placeholder="/images/portfolio/my-project.jpg atau URL https://..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
              <span style={{ fontSize: "10px", color: "#777", display: "block", marginTop: "4px" }}>
                Tip: Simpan file di <code>public/images/portfolio/</code>, lalu ketik <code>/images/portfolio/namafile.jpg</code>
              </span>
            </div>

            <div>
              <label className="form-label">Ringkasan Singkat</label>
              <input
                type="text"
                className="form-input"
                placeholder="Deskripsi singkat yang tampil di kartu proyek"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Deskripsi Lengkap</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Penjelasan detail mengenai tantangan, peran, dan hasil proyek..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Tags / Teknologi (Pisahkan dengan koma)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Next.js, Three.js, Tailwind, Figma"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Link Live Proyek (Opsional)</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://proyekanda.com"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
              <button type="button" className="button button-outline" onClick={onClose}>
                Batal
              </button>
              <button type="submit" className="button" disabled={loading}>
                <Plus size={15} /> {loading ? "Menyimpan..." : "Simpan Proyek"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
