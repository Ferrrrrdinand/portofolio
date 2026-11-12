"use client";

import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  return (
    <div className="toast-container">
      <div className="toast">
        {type === "success" ? (
          <CheckCircle2 size={16} className="toast-icon" />
        ) : (
          <AlertCircle size={16} style={{ color: "#ef4444" }} />
        )}
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#888",
            cursor: "pointer",
            marginLeft: "8px",
            display: "grid",
            placeItems: "center"
          }}
          aria-label="Tutup"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

