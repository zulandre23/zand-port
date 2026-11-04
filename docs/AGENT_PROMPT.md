# AGENT_PROMPT — Tahapan Kerja Update Portfolio

Kamu adalah senior frontend engineer. Project ini adalah website portfolio pribadi (Next.js + TypeScript + Tailwind CSS, deploy di Vercel).

Tujuan: memperbarui kode dan me-redesign tampilan agar modern, profesional, dan meyakinkan bagi recruiter/hiring manager (posisi developer) serta calon klien freelance.

## Sebelum mulai

1. Baca `AGENTS.md` dan `docs/PORTFOLIO_UPDATE.md` sampai selesai. Dokumen itu adalah sumber kebenaran.
2. Jangan mengubah kode sebelum Tahap 1 dan Tahap 2 selesai dan disetujui pemilik repo.
3. Kalau ada konflik antara prompt ini dan `docs/PORTFOLIO_UPDATE.md`, ikuti docs dan beri tahu pemilik repo.

## Kebutuhan wajib (ringkas)

- Pertahankan layout horizontal scroll yang sudah ada.
- Menambah project cukup lewat satu file data bertipe (`src/data/projects.ts`) + gambar di `public/projects/<slug>/`.
- Dual mode dark & light dengan design token, tanpa flash tema.
- Rekomendasi section tambahan mengikuti bagian 5 di docs, disesuaikan dengan layout horizontal (satu section = satu panel).

---

## TAHAP 1 — AUDIT (tanpa mengubah kode)

1. Petakan struktur `src/` (halaman, komponen, data, style).
2. Catat versi Next.js, React, Tailwind, dan dependency lain dari `package.json`.
3. Identifikasi mekanisme horizontal scroll saat ini (CSS scroll-snap, transform, library, atau handler wheel/scroll). Jelaskan cara kerjanya dan titik rawannya (mobile, keyboard, aksesibilitas).
4. Cek konfigurasi ganda: `postcss.config.js` vs `postcss.config.mjs`, dan `tailwind.config.js`. Tentukan mana yang benar-benar dipakai sesuai versi Tailwind.
5. Cek bagaimana konten (project, skill, pengalaman) disimpan: hardcoded di komponen atau sudah terpisah.
6. Daftar masalah lain: komponen duplikat, aksesibilitas, responsivitas, performa (gambar, font), SEO (metadata, OG image).
7. Isi **Lampiran A** di `docs/PORTFOLIO_UPDATE.md` dan keluarkan laporan singkat berisi temuan + prioritas.

Berhenti dan tunggu respons pemilik repo.

## TAHAP 2 — RENCANA (tanpa mengubah kode)

1. Usulkan arah desain: palet warna (light + dark), tipografi, layout tiap panel, pola animasi. Gunakan bagian 4 docs; kalau masih TODO, ajukan 2 opsi singkat.
2. Usulkan struktur komponen dan folder sesuai bagian 7 docs, disesuaikan dengan struktur yang sudah ada.
3. Jelaskan bagaimana horizontal scroll dipertahankan dan apa yang diperbaiki di dalamnya (indikator, keyboard, mobile, reduced motion).
4. Usulkan daftar panel/section akhir beserta urutannya.
5. Sebutkan dependency baru yang diperlukan (mis. `next-themes`) beserta alasannya.

Berhenti dan tunggu persetujuan.

## TAHAP 3 — IMPLEMENTASI (satu commit per langkah)

Kerjakan di branch `redesign/portfolio-v2`. Sebelum setiap commit: `npm run lint && npm run build` harus lolos.

1. **Rapikan konfigurasi** — hapus duplikasi PostCSS/Tailwind, samakan dengan versi Tailwind yang dipakai, update dependency yang aman.
2. **Design system** — token warna (light + dark), font via `next/font`, spacing, komponen dasar: `Button`, `Card`, `Badge`, `Section`.
3. **Dual mode** — `ThemeProvider` + `ThemeToggle` (next-themes), default `system`, tersimpan, tanpa flash, kontras lolos AA.
4. **Layer data & tipe** — buat `src/types`, `src/data/projects.ts`, `profile.ts`, `experience.ts`, `stack.ts`. Pindahkan konten yang hardcoded ke sini. Komponen hanya membaca data.
5. **Horizontal scroller** — rapikan/bungkus mekanisme yang ada dalam komponen yang jelas (`HorizontalScroller`), tambahkan progress indicator, navigasi antar panel, dukungan keyboard dan swipe, reduced motion.
6. **Redesign panel** — Hero, About, Featured Projects / Case Study, All Projects, Tech Stack, Experience, Contact (tambahkan Instagram https://www.instagram.com/zuuulllll_/, tanpa Download CV). Fallback otomatis untuk gambar/link yang tidak ada.
7. **Kemudahan menambah project** — validasi tipe, fallback, entri contoh, dan (opsional) `scripts/new-project.mjs` + script `npm run new:project`.
8. **SEO & performa** — metadata, OG image, sitemap, robots, `next/image`, cek Lighthouse mobile.
9. **README** — tulis ulang: deskripsi, fitur, stack, cara menjalankan, **cara menambah project**, cara mengganti tema/warna, screenshot (placeholder bila belum ada).

Di akhir setiap langkah: ringkas apa yang diubah, file yang disentuh, dan apa yang perlu dicek pemilik repo.

## TAHAP 4 — VERIFIKASI

- Jalankan `npm run lint` dan `npm run build`.
- Uji manual: horizontal scroll (wheel, drag, swipe, keyboard), toggle tema, menambah satu project dummy hanya dengan edit `projects.ts` lalu hapus lagi.
- Centang checklist **Definition of Done** (bagian 12 docs) dan laporkan item yang belum lolos.

## Aturan

- Ikuti bagian **1a. Keputusan Final** di `docs/PORTFOLIO_UPDATE.md` (aksen teal/cyan, Experience + Case Study, tanpa CV, Instagram di Contact).
- Jangan mengarang data pribadi, perusahaan, angka, atau testimoni. Gunakan placeholder `TODO`.
- Jangan mengganti mekanisme horizontal scroll tanpa persetujuan.
- Jangan menambah library besar tanpa alasan tertulis.
- Jangan commit ke `main`.
- Jangan menghapus file konten/gambar milik pemilik repo.
- Jika ragu atau data kurang, tanyakan sebelum melanjutkan.

---

## Prompt pembuka (tempel ke agent)

```
Baca AGENTS.md, docs/PORTFOLIO_UPDATE.md, dan docs/AGENT_PROMPT.md sampai selesai.
Lalu kerjakan Tahap 1 (AUDIT) saja, tanpa mengubah kode. Setelah selesai,
isi Lampiran A di docs/PORTFOLIO_UPDATE.md dan tampilkan laporan audit.
Tunggu persetujuan saya sebelum lanjut ke Tahap 2.
```
