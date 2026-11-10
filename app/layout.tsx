import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ferdinand Leandro | Portfolio × FERNOVA",
  description: "Personal portfolio, creative projects, and FERNOVA Digital Creative Studio.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
