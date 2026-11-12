"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight, ArrowRight, BriefcaseBusiness, CalendarDays, Code2,
  Instagram, Layers3, Mail, Menu, Play, ShoppingBag, Video, X,
  Plus, Trash2, ExternalLink, Check, FolderKanban, ShieldCheck
} from "lucide-react";
import Scene3D from "@/components/Scene3D";
import ProjectModal from "@/components/ProjectModal";
import AddProjectModal from "@/components/AddProjectModal";
import AddProductModal from "@/components/AddProductModal";
import Toast from "@/components/Toast";
import initialProductsData from "@/data/products.json";
import initialPortfolioData from "@/data/portfolio.json";
import { Product, PortfolioItem } from "@/lib/types";

const services = [
  { icon: Code2, title: "Web & App Development", desc: "Website, landing page, and digital platform with modern architecture." },
  { icon: Video, title: "Multimedia Production", desc: "Video editing, 3D CGI visuals, motion typography, and sound design." },
  { icon: Layers3, title: "Creative Design", desc: "Visual identity, design systems, brand guidelines, and UI/UX presentation." },
  { icon: CalendarDays, title: "Event Organizer", desc: "Stage production, LED mapping, technical rider, and live event direction." }
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(initialPortfolioData as PortfolioItem[]);
  const [products, setProducts] = useState<Product[]>(initialProductsData as Product[]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  // Modals
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  
  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const nav = [
    ["Home", "#home"],
    ["About Me", "#about"],
    ["Portfolio", "#portfolio"],
    ["FERNOVA", "#fernova"],
    ["Store", "#store"],
    ["Contact", "#contact"]
  ];

  const filteredProjects = portfolioItems.filter((project) => {
    if (activeFilter === "all") return true;
    return project.discipline === activeFilter;
  });

  const handleProjectAdded = (newProject: PortfolioItem) => {
    setPortfolioItems((prev) => [newProject, ...prev]);
    setToastMessage(`Proyek "${newProject.title}" berhasil ditambahkan ke database!`);
  };

  const handleProductAdded = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setToastMessage(`Produk "${newProduct.name}" berhasil ditambahkan ke toko FERNOVA!`);
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Hapus produk "${name}" dari database?`)) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setToastMessage(`Produk "${name}" telah dihapus.`);
      } else {
        alert(json.error || "Gagal menghapus produk");
      }
    } catch {
      alert("Terjadi kesalahan saat menghapus");
    }
  };

  return (
    <main>
      {/* Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Add Project to Database Modal */}
      <AddProjectModal
        isOpen={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
        onProjectAdded={handleProjectAdded}
      />

      {/* Add Product to Database Modal */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onProductAdded={handleProductAdded}
      />

      {/* Header */}
      <header className="site-header">
        <a href="#home" className="brand-lockup" aria-label="FERNOVA home">
          <span className="brand-symbol">F</span>
          <div className="brand-text-col">
            <span className="brand-name">FERNOVA<span className="orange">.</span></span>
            <span className="brand-chinese-sub">费迪南 · 个人作品集</span>
          </div>
          <span className="brand-divider" />
          <span className="brand-caption">PORTOFOLIO PRIBADI</span>
        </a>

        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {nav.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <a className="button button-small header-cta" href="#contact">
          Let&apos;s Talk <ArrowRight size={15} />
        </a>
      </header>

      {/* Hero Section */}
      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> PORTOFOLIO PRIBADI <span className="eyebrow-cross">×</span> 个人作品集 <span className="eyebrow-cross">×</span> FERNOVA
          </div>
          <h1>
            Halo, Saya<br />
            <span className="orange">Ferdinand</span><br />
            Leandro<span className="orange">.</span>
            <span className="hero-chinese-name">费迪南 · 莱安德罗</span>
          </h1>

          <div className="name-bilingual-badge">
            <span>🇮🇩 Ferdinand Leandro</span>
            <span className="dot">•</span>
            <span>🇨🇳 费迪南 · 莱安德罗</span>
          </div>

          <p className="hero-lead">
            Kreator Multimedia, Pengembang Web, dan Produser Acara yang membangun pengalaman digital bermakna melalui perpaduan teknologi dan seni visual.
          </p>

          <div className="hero-actions">
            <a className="button" href="#portfolio">
              <Play size={15} fill="currentColor" /> Lihat Karya <ArrowRight size={16} />
            </a>
            <a className="button button-outline" href="#fernova">
              <span className="mini-f">F</span> Studio FERNOVA
            </a>
          </div>

          <div className="stats">
            <div>
              <strong>{portfolioItems.length}<span>+</span></strong>
              <small>Proyek Pilihan</small>
            </div>
            <div>
              <strong>{products.length}<span>+</span></strong>
              <small>Produk Digital</small>
            </div>
            <div>
              <strong>04</strong>
              <small>Disiplin Kreatif</small>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Decorative interactive 3D sculpture">
          <div className="visual-glow" />
          <Scene3D />
          <div className="floating-label label-top">
            <Code2 size={17} />
            <span>Digital Development</span>
          </div>
          <div className="floating-label label-bottom">
            <Video size={17} />
            <span>Creative Production</span>
          </div>
          <div className="visual-index">FIG. 01 <span>—</span> DIGITAL FORM</div>
        </div>

        <div className="hero-bottom-note">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDownRight size={17} />
        </div>
      </section>

      {/* Intro Strip */}
      <section className="intro-strip section-shell" id="about">
        <div className="strip-icon">
          <BriefcaseBusiness />
        </div>
        <div>
          <span className="kicker">A LITTLE ABOUT ME</span>
          <p>
            I turn ideas into experiences — combining <b>technology, design, and production</b> to create work that connects with people.
          </p>
        </div>
        <a href="#contact" className="text-link">
          More about me <ArrowRight size={16} />
        </a>
      </section>

      {/* Portfolio Section */}
      <section className="section-shell section-block" id="portfolio">
        <div className="section-heading">
          <div>
            <span className="kicker">01 / SELECTED WORK & ARCHIVE</span>
            <h2>Ideas made<br /><span className="muted">tangible.</span></h2>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              className="button button-small button-outline"
              onClick={() => setIsAddProjectOpen(true)}
              title="Tambah proyek baru ke database portofolio"
            >
              <Plus size={14} /> Tambah Portofolio
            </button>
            <a href="#contact" className="text-link" style={{ marginLeft: "10px" }}>
              Discuss a project <ArrowUpRightIcon />
            </a>
          </div>
        </div>

        {/* Category Filters */}
        <div className="filter-bar">
          {[
            { key: "all", label: "Semua Karya" },
            { key: "web", label: "Web & App Development" },
            { key: "multimedia", label: "Multimedia & Video" },
            { key: "design", label: "Creative Design" },
            { key: "event", label: "Event Organizer & Production" }
          ].map((item) => (
            <button
              key={item.key}
              className={`filter-btn ${activeFilter === item.key ? "active" : ""}`}
              onClick={() => setActiveFilter(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Database Info Bar for user */}
        <div className="admin-toolbar">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FolderKanban size={16} style={{ color: "var(--orange)" }} />
            <p>
              Menampilkan <b>{filteredProjects.length}</b> proyek aktif dari <code>data/portfolio.json</code>.
              File gambar lokal dapat ditaruh di folder <code>public/images/portfolio/</code>.
            </p>
          </div>
          <button
            onClick={() => setIsAddProjectOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "var(--orange)",
              fontSize: "12px",
              cursor: "pointer",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <Plus size={14} /> Tambah Proyek
          </button>
        </div>

        {/* Portfolio Grid */}
        <div className="project-grid">
          {filteredProjects.map((project, i) => (
            <motion.article
              className="project-card"
              key={project.id || project.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.08 }}
              onClick={() => setSelectedProject(project)}
            >
              <div
                className="project-image"
                style={{
                  backgroundImage: `url("${project.image}"), url("/images/portfolio/placeholder.svg")`
                }}
              >
                <span className="project-number">{project.no} / {portfolioItems.length.toString().padStart(2, "0")}</span>
                <span className="project-arrow"><ArrowUpRightIcon /></span>
              </div>
              <div className="project-body">
                <div className="project-body-top">
                  <div>
                    <h3>{project.title}</h3>
                    <div className="project-category">{project.category}</div>
                  </div>
                  <span className="project-year">{project.year}</span>
                </div>
                <p className="project-summary">{project.summary}</p>
                {project.tags && project.tags.length > 0 && (
                  <div className="tech-pills">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span className="tech-pill" key={tag}>{tag}</span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="tech-pill">+{project.tags.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* FERNOVA Studio Section */}
      <section className="fernova-section" id="fernova">
        <div className="section-shell fernova-inner">
          <div className="fernova-copy">
            <span className="kicker">02 / THE STUDIO BEHIND THE WORK</span>
            <div className="fernova-title">
              <span className="brand-symbol large">F</span>
              <h2>FERNOVA<span className="orange">.</span></h2>
            </div>
            <p className="fernova-subtitle">Your ideas. Our creative playground.</p>
            <p className="body-copy">
              FERNOVA is my digital creative studio — a place where development, multimedia, design, and event production come together to build purposeful experiences.
            </p>
            <a href="#services" className="button">
              Discover the studio <ArrowRight size={16} />
            </a>
          </div>

          <div className="service-list" id="services">
            {services.map(({ icon: Icon, title, desc }, i) => (
              <div className="service-row" key={title}>
                <span className="service-index">0{i + 1}</span>
                <Icon />
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
                <ArrowUpRightIcon />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FERNOVA Store & Products Database */}
      <section className="section-shell section-block store-section" id="store">
        <div className="section-heading">
          <div>
            <span className="kicker">03 / THE DIGITAL STORE & DATABASE</span>
            <h2>Useful things.<br /><span className="muted">Made with intent.</span></h2>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              className="button button-small"
              onClick={() => setIsAddProductOpen(true)}
              title="Tambah produk baru ke katalog dan database"
            >
              <Plus size={14} /> Tambah Produk Fernova
            </button>
            <span className="store-note" style={{ marginLeft: "6px" }}>
              <ShoppingBag size={17} /> {products.length} PRODUK TERSIMPAN
            </span>
          </div>
        </div>

        {/* Database info banner */}
        <div className="admin-toolbar">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldCheck size={16} style={{ color: "var(--orange)" }} />
            <p>
              Database Produk aktif: <code>data/products.json</code>. File gambar produk disimpan di folder <code>public/images/products/</code>.
            </p>
          </div>
          <button
            onClick={() => setIsAddProductOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "var(--orange)",
              fontSize: "12px",
              cursor: "pointer",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <Plus size={14} /> + Produk Baru
          </button>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id || product.name}>
              <div
                className="product-image"
                style={{
                  backgroundImage: `url("${product.image}"), url("/images/products/placeholder.svg")`
                }}
              >
                <span className={`product-status-tag status-${product.status || "available"}`}>
                  {product.status === "available" ? "Ready" : product.status === "coming_soon" ? "Coming Soon" : "Pre-Order"}
                </span>
              </div>

              <div className="product-content">
                <div className="product-header-row">
                  <div>
                    <h3>{product.name}</h3>
                    <div className="product-type">{product.type}</div>
                  </div>
                  <span className="product-price">{product.price}</span>
                </div>

                <p className="product-desc">{product.description}</p>

                {product.features && product.features.length > 0 && (
                  <ul className="product-features-list">
                    {product.features.map((feat, idx) => (
                      <li key={idx}>
                        <Check size={13} /> <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="product-card-footer">
                  <a
                    href={product.link || "https://wa.me/6281234567890"}
                    target="_blank"
                    rel="noreferrer"
                    className="button button-small"
                    style={{ flex: 1 }}
                  >
                    {product.status === "available" ? "Pesan / Beli Sekarang" : "Hubungi Pre-Order"} <ArrowRight size={13} />
                  </a>
                  <button
                    className="btn-delete-item"
                    onClick={() => handleDeleteProduct(product.id, product.name)}
                    title="Hapus produk dari database"
                    aria-label="Hapus produk"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="store-disclaimer">
          Katalog ini tersinkronisasi otomatis dengan database backend. Anda dapat menambah, mengedit, atau menghapus item langsung dari web atau melalui file <code>data/products.json</code>.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact-section section-shell" id="contact">
        <div>
          <span className="kicker">04 / HAVE SOMETHING IN MIND?</span>
          <h2>Let&apos;s make<br /><span className="orange">it happen.</span></h2>
          <p>Have a project, collaboration, or idea? I&apos;d love to hear about it.</p>
        </div>
        <div className="contact-actions">
          <a className="button" href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
            Chat on WhatsApp <ArrowRight size={16} />
          </a>
          <a className="button button-outline" href="mailto:hello@fernova.id">
            <Mail size={16} /> Send an email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer section-shell">
        <a href="#home" className="brand-lockup">
          <span className="brand-symbol">F</span>
          <div className="brand-text-col">
            <span className="brand-name">FERNOVA<span className="orange">.</span></span>
            <span className="brand-chinese-sub">费迪南 · 莱安德罗</span>
          </div>
        </a>
        <p>Portofolio Pribadi (个人主页) × Studio Kreatif Digital</p>
        <div className="social-links">
          <a href="https://instagram.com/" aria-label="Instagram"><Instagram size={17} /></a>
          <a href="mailto:hello@fernova.id" aria-label="Email"><Mail size={17} /></a>
        </div>
        <small>© {new Date().getFullYear()} Ferdinand Leandro (费迪南 · 莱安德罗). Hak cipta dilindungi undang-undang.</small>
      </footer>
    </main>
  );
}

function ArrowUpRightIcon() {
  return <ArrowDownRight className="diagonal-arrow" size={17} />;
}
