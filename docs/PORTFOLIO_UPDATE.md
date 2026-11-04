# Portfolio Update & Redesign — Spesifikasi Lengkap

Dokumen ini adalah sumber kebenaran untuk update dan redesign `zand-port`.
Bagian bertanda **TODO** diisi oleh pemilik repo sebelum/selama pengerjaan.

---

## 1. Tujuan
- Memperbarui kode dan me-redesign tampilan portfolio agar modern, cepat, dan mudah dirawat.
- Target pembaca: recruiter dan hiring manager untuk posisi developer (fullstack/frontend), juga calon klien freelance.
- Hasil akhir: pengunjung paham siapa pemiliknya, apa keahliannya, dan melihat bukti kerjanya dalam waktu kurang dari 1 menit.

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
- Warna: 1 warna aksen + netral. Aksen: **TODO**
- Tipografi: **TODO** (contoh: Geist atau Inter untuk teks, 1 font display) — pakai `next/font`
- Referensi portfolio yang disukai: **TODO** (tempel 2–3 link)
- Animasi: halus dan ringan; tidak boleh mengorbankan performa
- Bentuk komponen: **TODO** (sudut membulat / tajam, bayangan / border)

## 5. Struktur Panel (Urutan Horizontal)
1. **Hero** — nama, peran, 1 kalimat value, CTA (Lihat Project, Kontak)
2. **About** — 3–5 kalimat + status ketersediaan ("Open to work": fulltime/freelance/remote)
3. **Featured Projects** — 2–3 project terbaik dengan cerita singkat (masalah, peran, solusi, hasil)
4. **All Projects** — grid/daftar semua project dari `projects.ts` (bisa filter berdasarkan stack)
5. **Tech Stack** — dikelompokkan: Frontend, Backend, Database, Tools
6. **Experience** — timeline pengalaman kerja/freelance (hanya yang boleh ditampilkan)
7. **Process** (opsional) — 3–4 langkah cara kerja, cocok untuk calon klien
8. **Contact** — email, GitHub, LinkedIn, tombol Download CV

Section opsional jika kontennya ada: Education & Certifications, Testimonials (hanya kutipan asli), Blog/Catatan Teknis.
Jangan terlalu banyak panel; tiap panel harus menambah nilai.

## 6. Konten yang Harus Disiapkan Pemilik
- [ ] Foto/avatar profesional → `public/images/avatar.*`
- [ ] Teks About (versi singkat)
- [ ] Daftar project terbaik (3–6), masing-masing: judul, masalah yang diselesaikan, peran, tech stack, link demo, link repo, screenshot
- [ ] Pengalaman kerja/freelance (yang tidak terikat NDA)
- [ ] CV terbaru (PDF) → `public/cv/`
- [ ] Tautan sosial (email, GitHub, LinkedIn)

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
  cv/
docs/
  PORTFOLIO_UPDATE.md
  AGENT_PROMPT.md
```

### 7.2 Type Project
```ts
// src/types/index.ts
export type Project = {
  slug: string;             // unik, huruf kecil + tanda hubung
  title: string;
  summary: string;          // 1–2 kalimat
  role?: string;
  stack: string[];
  image?: string;           // /projects/<slug>/cover.png
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;       // tampil di panel Featured
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
- Versi: Next.js __ / React __ / Tailwind __
- Mekanisme horizontal scroll saat ini: __
- Konfigurasi yang dipakai (PostCSS/Tailwind): __
- Daftar temuan + prioritas: __
