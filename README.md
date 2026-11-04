# ZAND Portfolio

Portfolio personal ZAND untuk menampilkan profil, project, keahlian, pengalaman, dan kontak. Dibangun dengan Next.js App Router, React, TypeScript, dan Tailwind CSS.

## Fitur

- Panel horizontal dengan scroll-snap, navigasi tombol, indikator posisi, serta dukungan keyboard dan swipe.
- Carousel project dengan kontrol navigasi dan swipe.
- Skills dikelompokkan menjadi Frontend, Backend/BaaS, Integration & Tools, dan Familiar.
- Contact menggunakan grid Mondrian dengan footer profil di sisi kanan.
- Tema light/dark mengikuti preferensi sistem; pilihan manual tersimpan.
- Data project, profil, stack, dan pengalaman dikelola terpisah dari komponen.
- Metadata Open Graph/Twitter, sitemap, robots, dan gambar sosial otomatis.

## Menjalankan secara lokal

```bash
npm ci
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS 3
- next-themes
- lucide-react
- Vercel Analytics

## Menambah project

1. Tambahkan gambar ke `public/projects/<slug>/cover.webp` (rasio 16:9 disarankan).
2. Tambahkan satu objek bertipe `Project` ke array di `src/data/projects.ts`:

   ```ts
   {
     slug: "project-baru",
     title: "Nama Project",
     summary: "Ringkasan faktual project.",
     stack: ["Next.js", "TypeScript"],
     image: "/projects/project-baru/cover.webp",
     demoUrl: "https://example.com",
     status: "live",
   }
   ```

3. Isi hanya detail dan tautan yang sudah diverifikasi. Hapus field opsional yang belum tersedia; jangan menambah klaim atau data rekaan.
4. Jalankan `npm run lint` dan `npm run build`.

Project lama saat ini menggunakan aset statis yang diimpor dari `src/app/assets`. Project baru dapat memakai path gambar publik seperti contoh di atas.

## Profil, stack, pengalaman, dan tema

- Profil dan tautan sosial: `src/data/profile.ts`
- Keahlian: `src/data/stack.ts`
- Pengalaman: `src/data/experience.ts`
- Project: `src/data/projects.ts`
- Token light/dark: `src/app/globals.css`

Nilai yang belum diverifikasi ditandai `TODO` dan tidak ditampilkan sebagai tautan aktif.

## Konten visual

- Screenshot project contoh: aset yang sudah ada di `src/app/assets`.
- Screenshot tambahan: `TODO`.
- Avatar: `TODO`.
