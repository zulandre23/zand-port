# Portfolio Update & Redesign — Spesifikasi Lengkap

Dokumen ini adalah sumber kebenaran untuk update dan redesign `zand-port`.
Bagian bertanda **TODO** diisi oleh pemilik repo sebelum/selama pengerjaan.

---

## 1. Tujuan

- Memperbarui kode dan me-redesign tampilan portfolio agar modern, cepat, dan mudah dirawat.
- Target pembaca: recruiter dan hiring manager untuk posisi developer (fullstack/frontend), juga calon klien freelance.
- Hasil akhir: pengunjung paham siapa pemiliknya, apa keahliannya, dan melihat bukti kerjanya dalam waktu kurang dari 1 menit.

## 1a. Keputusan Final (mengalahkan bagian lain jika ada konflik)

- **Aksen warna: pertahankan teal/cyan.** Di light mode pakai versi lebih gelap (mis. `teal-700`) untuk teks dan tombol agar kontras lolos WCAG AA; cyan terang hanya untuk dark mode.
- **Section tambahan yang dibangun: Experience dan Case Study.** Tidak ada section Sertifikasi, Testimonials, atau Blog untuk saat ini.
- **Tidak ada tombol/section Download CV.** Jangan menambah file CV atau folder `public/cv/`.
- **Contact:** pertahankan tautan kontak yang sudah ada dan tambahkan Instagram: https://www.instagram.com/zuuulllll_/ (simpan di `src/data/profile.ts`, buka di tab baru dengan `rel="noopener noreferrer"`).
- **Placeholder "Coming Soon" dihapus dari data project.** Jika perlu kesan "segera hadir", buat satu kartu penutup di komponen, bukan di `projects.ts`.
- **Horizontal scroll: jangan tulis ulang logika yang sudah berjalan.**

## 2. Kondisi Saat Ini

Diamati dari halaman repo (isi `src/` belum diaudit):

- Stack: Next.js, TypeScript, Tailwind CSS, ESLint
- Deploy: Vercel (https://zand-port.vercel.app), branch utama `main`
- Root: `public/`, `src/`, `eslint.config.mjs`, `next.config.ts`, `package.json`, `postcss.config.js`, `postcss.config.mjs`, `tailwind.config.js`, `tsconfig.json`
- Masalah yang sudah terlihat:
  - [ ] `README.md` masih template bawaan `create-next-app`
  - [ ] Konfigurasi ganda: `postcss.config.js` dan `postcss.config.mjs`
  - [ ] `tailwind.config.js` ada bersama `postcss.config.mjs` — kemungkinan campuran Tailwind v3 dan v4; verifikasi versi di `package.json`
- Hasil audit Tahap 1 dicatat di bagian **Lampiran A** di bawah.

## 3. Kebutuhan Wajib

### 3.1 Pertahankan Horizontal Scroll

- Layout horizontal scroll yang ada sekarang HARUS tetap ada.
- Tahap audit: identifikasi implementasinya (CSS scroll-snap, transform, library, atau handler wheel/scroll). Jangan ganti pendekatan kecuali ada bug nyata.
- Setiap section = satu panel horizontal.
- Input yang harus bekerja:
  - desktop: wheel/trackpad, drag, klik navigasi
  - mobile: swipe
  - keyboard: tombol panah, Tab tetap berurutan logis
- Wajib ada: indikator posisi/progress dan navigasi loncat ke section.
- Tidak boleh ada scroll yang "terkunci" sehingga pengguna tidak bisa keluar dari area scroll.
- Hormati `prefers-reduced-motion`.
- Jika di layar sempit horizontal scroll tidak nyaman, usulkan fallback vertikal dan minta persetujuan (jangan langsung dihapus).

### 3.2 Mudah Menambah Project

- Semua project bersumber dari SATU file data bertipe: `src/data/projects.ts`.
- Menambah project = (1) taruh gambar di `public/projects/<slug>/`, (2) tambah satu objek di array. Tidak ada perubahan di komponen UI.
- Field wajib vs opsional divalidasi lewat TypeScript.
- Fallback otomatis jika gambar atau link tidak ada (placeholder, tombol disembunyikan).
- Panduan "Cara menambah project" ada di bagian 8 dan di `README.md`.

### 3.3 Dual Mode (Dark & Light)

- Gunakan `next-themes` (atau solusi setara yang ringan).
- Default mengikuti sistem; ada toggle manual; pilihan tersimpan.
- Tidak boleh ada flash tema yang salah saat load.
- Semua warna lewat design token (CSS variables), bukan hardcode per komponen.
- Kontras minimal WCAG AA di kedua mode.
- Sesuaikan dengan versi Tailwind terdeteksi:
  - v3: `darkMode: "class"` di `tailwind.config.js`
  - v4: `@custom-variant dark (&:where(.dark, .dark *));` di CSS utama

## 4. Arah Desain (isi/ubah sesuai selera)

- Gaya: **TODO** (minimalis modern / bold / editorial / dark-first)
- Warna: aksen teal/cyan (dipertahankan), netral untuk sisanya. Light mode memakai teal yang lebih gelap untuk kontras
- Tipografi: **TODO** (contoh: Geist atau Inter untuk teks, 1 font display) — pakai `next/font`
- Referensi portfolio yang disukai: **TODO** (tempel 2–3 link)
- Animasi: halus dan ringan; tidak boleh mengorbankan performa
- Bentuk komponen: **TODO** (sudut membulat / tajam, bayangan / border)

## 5. Struktur Panel (Urutan Horizontal)

1. **Hero** — nama, peran, 1 kalimat value, CTA (Lihat Project, Kontak)
2. **About** — 3–5 kalimat + status ketersediaan ("Open to work": fulltime/freelance/remote)
3. **Featured Projects / Case Study** — project asli terbaik dengan cerita singkat (masalah, peran, solusi, hasil)
4. **All Projects** — grid/daftar semua project dari `projects.ts` (bisa filter berdasarkan stack)
5. **Tech Stack** — dikelompokkan: Frontend, Backend, Database, Tools
6. **Experience** — timeline pengalaman kerja/freelance (hanya yang boleh ditampilkan)
7. **Process** (opsional) — 3–4 langkah cara kerja, cocok untuk calon klien
8. **Contact** — tautan kontak yang sudah ada + Instagram (https://www.instagram.com/zuuulllll_/). Tanpa tombol Download CV

Section tambahan yang dibangun: Experience dan Case Study. Education/Sertifikasi, Testimonials, dan Blog tidak dibuat untuk saat ini.
Jangan terlalu banyak panel; tiap panel harus menambah nilai.

## 6. Konten yang Harus Disiapkan Pemilik

- [ ] Foto/avatar profesional → `public/images/avatar.*`
- [ ] Teks About (versi singkat)
- [ ] Daftar project terbaik (3–6), masing-masing: judul, masalah yang diselesaikan, peran, tech stack, link demo, link repo, screenshot
- [ ] Pengalaman kerja/freelance (yang tidak terikat NDA)
- [ ] Tautan kontak (yang sudah ada) + Instagram: https://www.instagram.com/zuuulllll_/

Jika konten belum tersedia, agent memakai placeholder bertanda `TODO`, bukan mengarang.

## 7. Arsitektur Teknis

### 7.1 Struktur target (sesuaikan dengan `src/app` atau `src/pages` yang sudah ada)

```
src/
  app/                    # halaman, layout, metadata
  components/
    ui/                   # Button, Card, Badge, Section (komponen dasar)
    sections/             # Hero, About, Projects, Stack, Experience, Contact
    layout/               # HorizontalScroller, Nav, ProgressIndicator
    theme/                # ThemeProvider, ThemeToggle
  data/
    projects.ts           # SEMUA project (sumber tunggal)
    profile.ts            # nama, bio, sosial, status ketersediaan
    experience.ts         # timeline
    stack.ts              # grup teknologi
  types/
    index.ts              # type Project, Experience, dll.
  lib/                    # util kecil
public/
  projects/<slug>/cover.png
  images/
docs/
  PORTFOLIO_UPDATE.md
  AGENT_PROMPT.md
```

### 7.2 Type Project

```ts
// src/types/index.ts
export type Project = {
  slug: string; // unik, huruf kecil + tanda hubung
  title: string;
  summary: string; // 1–2 kalimat
  role?: string;
  stack: string[];
  image?: string; // /projects/<slug>/cover.png
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean; // tampil di panel Featured
  year?: number;
  status?: "live" | "wip" | "archived";
};
```

### 7.3 Contoh data

```ts
// src/data/projects.ts
import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "contoh-project",
    title: "Contoh Project",
    summary: "Masalah yang diselesaikan dan hasilnya.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/projects/contoh-project/cover.png",
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/zulandre23/contoh-project",
    featured: true,
    year: 2026,
    status: "live",
  },
];
```

### 7.4 Design token (contoh, sesuaikan)

```css
:root {
  --bg: #ffffff;
  --fg: #0a0a0a;
  --muted: #6b7280;
  --card: #f5f5f5;
  --border: #e5e5e5;
  --accent: #4f46e5;
}
.dark {
  --bg: #0a0a0a;
  --fg: #fafafa;
  --muted: #9ca3af;
  --card: #141414;
  --border: #262626;
  --accent: #818cf8;
}
```

Komponen memakai token ini (mis. `bg-[var(--bg)]` atau mapping ke theme Tailwind), bukan warna langsung.

## 8. Cara Menambah Project (untuk README)

1. Buat folder `public/projects/<slug>/` dan taruh `cover.png` (disarankan rasio 16:9, maksimal ~300 KB).
2. Buka `src/data/projects.ts`, tambahkan satu objek `Project` baru.
3. Jalankan `npm run dev`, cek di panel Projects.
4. `npm run lint && npm run build`, lalu commit: `feat(projects): add <nama project>`.

Opsional: skrip `npm run new:project -- <slug>` (di `scripts/new-project.mjs`) yang membuat folder gambar dan menambahkan template entri.

## 9. SEO & Performa

- [ ] Metadata per halaman (title, description) lewat Next.js Metadata API
- [ ] Open Graph + Twitter image
- [ ] `sitemap.xml` dan `robots.txt`
- [ ] `next/image` untuk semua gambar, `next/font` untuk font
- [ ] Target Lighthouse ≥ 90 di semua kategori (cek mode mobile)
- [ ] Hindari JavaScript berlebih di panel yang statis

## 10. Aksesibilitas

- [ ] Heading berurutan (satu `h1`)
- [ ] Alt text untuk gambar bermakna
- [ ] Fokus keyboard terlihat; navigasi horizontal bisa dipakai tanpa mouse
- [ ] Kontras warna lolos WCAG AA (dark dan light)
- [ ] Toggle tema punya label aksesibel
- [ ] Animasi menghormati `prefers-reduced-motion`

## 11. Alur Git

1. `git checkout main && git pull`
2. `git checkout -b redesign/portfolio-v2`
3. Satu commit per langkah kecil (Conventional Commits)
4. Sebelum commit: `npm run lint && npm run build`
5. Push branch → cek Preview Deployment di Vercel
6. Merge ke `main` setelah semua checklist di bagian 12 lolos

## 12. Definition of Done

- [ ] Horizontal scroll tetap berfungsi (desktop, mobile, keyboard)
- [ ] Menambah project hanya perlu edit `projects.ts` + taruh gambar
- [ ] Dark dan light mode berfungsi tanpa flash, kontras lolos
- [ ] Tampil baik di mobile, tablet, desktop
- [ ] Tidak ada error lint/build
- [ ] Semua link berfungsi
- [ ] README sudah ditulis ulang (fitur, stack, cara menjalankan, cara menambah project, screenshot)
- [ ] Konfigurasi PostCSS/Tailwind sudah dirapikan (tidak ada duplikasi)
- [ ] Lighthouse sesuai target

## 13. Larangan untuk Agent

- Jangan mengarang data pribadi, perusahaan, angka, atau testimoni.
- Jangan mengganti mekanisme horizontal scroll tanpa persetujuan.
- Jangan menambah library besar tanpa alasan tertulis.
- Jangan commit langsung ke `main`.
- Jangan menghapus file konten/gambar milik pemilik repo.

---

## Lampiran A — Hasil Audit (diisi agent di Tahap 1)

- Versi dari `package.json`: Next.js **15.4.6** / React **19.1.0** / Tailwind CSS **3.4.17**.
- Struktur `src/`: Next App Router di `src/app` (`page.tsx`, `layout.tsx`, `globals.css`); komponen di `src/component` (folder singular), termasuk empat section; aset gambar berada di `src/app/assets`. Belum ada folder data atau types terpusat.
- Mekanisme horizontal scroll: `#main-container` adalah flex container dengan native `overflow-x-auto`, `scroll-snap-type: x mandatory`, dan panel `min-w-full`; navigasi programatis memakai `scrollTo({ left: index * window.innerWidth, behavior: "smooth" })`. Wheel vertikal dipetakan menjadi perpindahan panel melalui listener global; touch/swipe ditangani listener manual; About dan Portfolio juga memiliki scroll/subsection internal. Header dan tombol navigator menyediakan navigasi klik.
- Konfigurasi PostCSS/Tailwind: versi terpasang dan `globals.css` memakai pola Tailwind v3 (`@tailwind ...`), cocok dengan `postcss.config.js` (plugin `tailwindcss` + `autoprefixer`) dan `tailwind.config.js`. `postcss.config.mjs` memakai plugin gaya Tailwind v4 (`@tailwindcss/postcss`), yang tidak tercantum di `package.json`. Karena dua konfigurasi PostCSS hidup bersamaan dan belum menjalankan build, berkas yang dipilih runtime serta hasil build belum diverifikasi; konfigurasi ini perlu dibereskan sebelum implementasi.
- Temuan + prioritas:
  - **Tinggi — scroll, keyboard, dan aksesibilitas:** logika wheel/touch bertumpuk dengan scroll internal; handler wheel utama mencegah perilaku default, sementara `html/body` disembunyikan dari scroll vertikal dan CSS menerapkan `touch-action: none` pada panel. Ini berisiko membuat gesture/keluar panel tidak konsisten, khususnya mobile dan area scroll internal. Tidak ditemukan navigasi tombol panah; navigasi klik dapat difokuskan dengan Tab. Progress dots bukan kontrol navigasi. Tombol menu mobile tidak menyatakan status/label aksesibel; kontrol ikon dan CTA “View Code” juga tidak memiliki nama/link yang berfungsi. Ada beberapa `h1` dalam panel yang hadir bersamaan.
  - **Tinggi — konfigurasi dan konten kontak:** dua konfigurasi PostCSS berbeda generasi berpotensi membuat build tidak konsisten. Tautan email menuju `zand@example.com`, tetapi teks menampilkan `zulfadi.andre23@gmai.com`; nomor telepon/WhatsApp menggunakan `1234567890`. Pemilik perlu memverifikasi data tersebut sebelum dipublikasikan.
  - **Sedang — pemeliharaan konten:** project, skills, profile, dan pengalaman masih ditulis langsung di komponen; project berisi tiga entri “Comming Soon”, dan tombol “View Code” bukan tautan. Stack juga ditulis ulang di Footer. Belum tersedia satu sumber data bertipe; Education saat ini ada meski spesifikasi final tidak menghendaki section Education.
  - **Sedang — tema dan responsivitas:** tampilan dominan hardcoded gelap tanpa token warna, toggle, atau light mode. Layout menggabungkan panel horizontal dengan scroll vertikal bersarang; fallback vertikal tidak tersedia. CSS sudah memiliki aturan `prefers-reduced-motion`, tetapi animasi juga dikelola di komponen/Framer Motion dan perlu diuji bersama.
  - **Sedang — SEO/performa:** metadata hanya title dan description; belum tampak Open Graph/Twitter metadata, sitemap, atau robots. `next/image` sudah digunakan untuk gambar lokal. `next/font` Inter dimuat di layout, sementara Google Fonts Orbitron/Exo 2 diimpor dari bagian akhir CSS; font-family CSS dapat menggantikan Inter dan impor font terlambat berisiko tidak diterapkan/menambah request. Animasi partikel dibuat di client.
  - **Rendah — dokumentasi:** `README.md` masih template create-next-app, bukan panduan portfolio/penambahan project.
- Batas audit: temuan berasal dari pembacaan berkas; tidak menjalankan install, lint, build, tes, atau pemeriksaan visual.
