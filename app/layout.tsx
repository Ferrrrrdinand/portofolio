import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ferdinand Leandro | Portfolio × FERNOVA",
  description: "Personal portfolio, creative projects, and FERNOVA Digital Creative Studio.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        {/* Breathing Multi-Color Aurora Ambient Background */}
        <div className="ambient-breathing-bg" aria-hidden="true">
          <div className="ambient-orb orb-orange" />
          <div className="ambient-orb orb-cyan" />
          <div className="ambient-orb orb-purple" />
          <div className="ambient-orb orb-rose" />
          <div className="ambient-orb orb-emerald" />
          <div className="ambient-grid-overlay" />
        </div>
        {children}
      </body>
    </html>
  );
}
