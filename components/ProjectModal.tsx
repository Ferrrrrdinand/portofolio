"use client";

import { X, ExternalLink, Calendar, Building, Tag, ArrowRight } from "lucide-react";
import { PortfolioItem } from "@/lib/types";

interface ProjectModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="kicker">{project.category}</span>
            <h3 style={{ margin: "4px 0 0", fontSize: "18px", color: "#fff" }}>{project.title}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <div
            className="modal-image"
            style={{
              backgroundImage: `url("${project.image}")`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />

          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "16px", color: "#aaa", fontSize: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={14} style={{ color: "var(--orange)" }} />
              <span>{project.year}</span>
            </div>
            {project.client && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Building size={14} style={{ color: "var(--orange)" }} />
                <span>Klien: <b>{project.client}</b></span>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ fontSize: "13px", color: "#ddd", margin: "0 0 8px" }}>Ringkasan Proyek</h4>
            <p style={{ color: "#aaa", fontSize: "13px", lineHeight: "1.7", margin: 0 }}>
              {project.description || project.summary}
            </p>
          </div>

          {project.tags && project.tags.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", color: "#ddd", fontSize: "12px" }}>
                <Tag size={13} style={{ color: "var(--orange)" }} />
                <span>Teknologi & Ruang Lingkup:</span>
              </div>
              <div className="tech-pills">
                {project.tags.map((t) => (
                  <span className="tech-pill" key={t}>{t}</span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="button"
                style={{ flex: 1, padding: "12px" }}
              >
                Kunjungi Live Proyek <ExternalLink size={14} />
              </a>
            ) : null}
            <a
              href={`https://wa.me/6281234567890?text=Halo%20Ferdinand,%20saya%20tertarik%20dengan%20proyek%20${encodeURIComponent(project.title)}`}
              target="_blank"
              rel="noreferrer"
              className="button button-outline"
              style={{ flex: 1, padding: "12px" }}
            >
              Diskusikan Konsep Serupa <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
