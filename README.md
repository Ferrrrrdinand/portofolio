# FERNOVA × Personal Portfolio

Personal portfolio untuk Ferdinand Leandro yang terhubung dengan FERNOVA sebagai digital creative studio.

## Tech stack
- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- React Three Fiber + Drei + Three.js
- Framer Motion
- Lucide React

## Menjalankan project

Pastikan Node.js versi 20 LTS atau lebih baru sudah terpasang.

```bash
npm install
npm run dev
```

Buka http://localhost:3000

Untuk build production:

```bash
npm run build
npm start
```

## Hal yang perlu kamu ubah sebelum dipublikasikan

1. Ganti nama, deskripsi, statistik, dan data proyek di `app/page.tsx`.
2. Ganti URL gambar demo dengan foto asli proyek dan foto profil kamu.
3. Ganti `https://wa.me/62XXXXXXXXXX` dengan nomor WhatsApp bisnis dalam format internasional tanpa `+`.
4. Ganti `hello@fernova.id` dengan email aktif.
5. Ganti tautan Instagram di footer.
6. Tambahkan detail produk, keranjang, checkout, payment gateway, dan dashboard admin pada tahap backend berikutnya.

## Struktur folder

```text
fernova-portfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── Scene3D.tsx
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Catatan

Versi ini adalah frontend awal. Bagian store masih berupa katalog demonstrasi; belum memproses pesanan atau pembayaran. Angka statistik dan beberapa proyek adalah konten contoh yang harus disesuaikan dengan data sebenarnya.
