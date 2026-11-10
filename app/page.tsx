"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight, ArrowRight, BriefcaseBusiness, CalendarDays, Code2,
  Instagram, Layers3, Mail, Menu, Monitor, Play, ShoppingBag, Video, X
} from "lucide-react";
import Scene3D from "@/components/Scene3D";

const projects = [
  { no: "01", title: "Zantova Website", category: "Web Development", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1100&q=85", year: "2026" },
  { no: "02", title: "Event & Multimedia", category: "Event Organizer · Production", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1100&q=85", year: "2026" },
  { no: "03", title: "Brand Identity", category: "Creative Design", image: "https://images.unsplash.com/photo-1634942536790-253d6f3b1c2?auto=format&fit=crop&w=1100&q=85", year: "2026" }
];

const services = [
  { icon: Code2, title: "Web & App Development", desc: "Website, landing page, and digital platform." },
  { icon: Video, title: "Multimedia Production", desc: "Video editing, event visuals, and production." },
  { icon: Layers3, title: "Creative Design", desc: "Visual identity, graphic design, and presentation." },
  { icon: CalendarDays, title: "Event Organizer", desc: "Planning and technical production for events." }
];

const products = [
  { name: "Website Templates", type: "Digital template", price: "Coming soon", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" },
  { name: "Digital Modules", type: "Learning resources", price: "Coming soon", image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=80" },
  { name: "Creative Assets", type: "Design resources", price: "Coming soon", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80" }
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    ["Home", "#home"], ["About Me", "#about"], ["Portfolio", "#portfolio"],
    ["FERNOVA", "#fernova"], ["Store", "#store"], ["Contact", "#contact"]
  ];

  return (
    <main>
      <header className="site-header">
        <a href="#home" className="brand-lockup" aria-label="FERNOVA home">
          <span className="brand-symbol">F</span><span className="brand-name">FERNOVA<span className="orange">.</span></span>
          <span className="brand-divider" /><span className="brand-caption">PERSONAL PORTFOLIO</span>
        </a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <a className="button button-small header-cta" href="#contact">Let&apos;s Talk <ArrowRight size={15} /></a>
      </header>

      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> PERSONAL PORTFOLIO <span className="eyebrow-cross">×</span> FERNOVA</div>
          <h1>Hi, I&apos;m<br /><span className="orange">Ferdinand</span><br />Leandro<span className="orange">.</span></h1>
          <p className="hero-lead">Multimedia Creator, Developer, and Event Producer building meaningful digital experiences through creativity and technology.</p>
          <div className="hero-actions">
            <a className="button" href="#portfolio"><Play size={15} fill="currentColor" /> Explore My Work <ArrowRight size={16} /></a>
            <a className="button button-outline" href="#fernova"><span className="mini-f">F</span> Explore FERNOVA</a>
          </div>
          <div className="stats">
            <div><strong>50<span>+</span></strong><small>Projects & Creations</small></div>
            <div><strong>30<span>+</span></strong><small>Collaborations</small></div>
            <div><strong>04</strong><small>Creative Disciplines</small></div>
          </div>
        </div>
        <div className="hero-visual" aria-label="Decorative interactive 3D sculpture">
          <div className="visual-glow" />
          <Scene3D />
          <div className="floating-label label-top"><Code2 size={17} /><span>Digital Development</span></div>
          <div className="floating-label label-bottom"><Video size={17} /><span>Creative Production</span></div>
          <div className="visual-index">FIG. 01 <span>—</span> DIGITAL FORM</div>
        </div>
        <div className="hero-bottom-note"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={17} /></div>
      </section>

      <section className="intro-strip section-shell" id="about">
        <div className="strip-icon"><BriefcaseBusiness /></div>
        <div><span className="kicker">A LITTLE ABOUT ME</span><p>I turn ideas into experiences — combining <b>technology, design, and production</b> to create work that connects with people.</p></div>
        <a href="#contact" className="text-link">More about me <ArrowRight size={16} /></a>
      </section>

      <section className="section-shell section-block" id="portfolio">
        <div className="section-heading">
          <div><span className="kicker">01 / SELECTED WORK</span><h2>Ideas made<br /><span className="muted">tangible.</span></h2></div>
          <a href="#contact" className="text-link">Discuss a project <ArrowUpRightIcon /></a>
        </div>
        <div className="project-grid">
          {projects.map((project, i) => (
            <motion.article className="project-card" key={project.no} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
              <div className="project-image" style={{ backgroundImage: `url("${project.image}")` }}>
                <span className="project-number">{project.no} / 03</span><span className="project-arrow"><ArrowUpRightIcon /></span>
              </div>
              <div className="project-meta"><div><h3>{project.title}</h3><p>{project.category}</p></div><span>{project.year}</span></div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="fernova-section" id="fernova">
        <div className="section-shell fernova-inner">
          <div className="fernova-copy">
            <span className="kicker">02 / THE STUDIO BEHIND THE WORK</span>
            <div className="fernova-title"><span className="brand-symbol large">F</span><h2>FERNOVA<span className="orange">.</span></h2></div>
            <p className="fernova-subtitle">Your ideas. Our creative playground.</p>
            <p className="body-copy">FERNOVA is my digital creative studio — a place where development, multimedia, design, and event production come together to build purposeful experiences.</p>
            <a href="#services" className="button">Discover the studio <ArrowRight size={16} /></a>
          </div>
          <div className="service-list" id="services">
            {services.map(({ icon: Icon, title, desc }, i) => <div className="service-row" key={title}><span className="service-index">0{i + 1}</span><Icon /><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRightIcon /></div>)}
          </div>
        </div>
      </section>

      <section className="section-shell section-block store-section" id="store">
        <div className="section-heading">
          <div><span className="kicker">03 / THE DIGITAL STORE</span><h2>Useful things.<br /><span className="muted">Made with intent.</span></h2></div>
          <span className="store-note"><ShoppingBag size={17} /> FERNOVA GOODS & RESOURCES</span>
        </div>
        <div className="product-grid">
          {products.map((product) => <article className="product-card" key={product.name}>
            <div className="product-image" style={{ backgroundImage: `url("${product.image}")` }}><span>COMING SOON</span></div>
            <div className="product-meta"><div><h3>{product.name}</h3><p>{product.type}</p></div><strong>{product.price}</strong></div>
          </article>)}
        </div>
        <p className="store-disclaimer">The store preview is ready for your products. Product details, cart, checkout, and payment integration can be added in the next development phase.</p>
      </section>

      <section className="contact-section section-shell" id="contact">
        <div><span className="kicker">04 / HAVE SOMETHING IN MIND?</span><h2>Let&apos;s make<br /><span className="orange">it happen.</span></h2><p>Have a project, collaboration, or idea? I&apos;d love to hear about it.</p></div>
        <div className="contact-actions"><a className="button" href="https://wa.me/62XXXXXXXXXX" target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowRight size={16} /></a><a className="button button-outline" href="mailto:hello@fernova.id"><Mail size={16} /> Send an email</a></div>
      </section>

      <footer className="footer section-shell">
        <a href="#home" className="brand-lockup"><span className="brand-symbol">F</span><span className="brand-name">FERNOVA<span className="orange">.</span></span></a>
        <p>Personal portfolio × Digital Creative Studio</p>
        <div className="social-links"><a href="https://instagram.com/" aria-label="Instagram"><Instagram size={17} /></a><a href="mailto:hello@fernova.id" aria-label="Email"><Mail size={17} /></a></div>
        <small>© {new Date().getFullYear()} Ferdinand Leandro. Built with intention.</small>
      </footer>
    </main>
  );
}

function ArrowUpRightIcon() {
  return <ArrowDownRight className="diagonal-arrow" size={17} />;
}
