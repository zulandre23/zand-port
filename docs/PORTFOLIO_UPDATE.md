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
- **Section tambahan final: Experience.** Case Study dihapus atas permintaan pemilik; tidak ada section Sertifikasi, Testimonials, atau Blog.
- **Projects:** gunakan vertical Peekaboo Carousel dengan autoplay dan kontrol manual; semua entri tetap berasal dari `src/data/projects.ts`.
- **Tidak ada tombol/section Download CV.** Jangan menambah file CV atau folder `public/cv/`.
- **Contact:** pertahankan tautan kontak yang sudah ada dan tambahkan Instagram: https://www.instagram.com/zuuulllll_/ (simpan di `src/data/profile.ts`, buka di tab baru dengan `rel="noopener noreferrer"`).
- **Placeholder "Coming Soon" dihapus dari data project.** Jika perlu kesan "segera hadir", buat satu kartu penutup di komponen, bukan di `projects.ts`.
- **Horizontal scroll: jangan tulis ulang logika yang sudah berjalan.**

## 2. Kondisi Awal Sebelum Audit

Catatan baseline sebelum Tahap 1; bukan gambaran kondisi repo saat ini:

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

- Gaya: **bold futuristik**, sesuai arah yang disetujui pemilik.
- Warna: aksen teal/cyan; light mode memakai teal gelap, dark mode memakai cyan terang; warna disalurkan melalui CSS variables.
- Tipografi: Inter untuk teks dan Orbitron untuk display, dimuat melalui `next/font`.
- Referensi portfolio yang disukai: **TODO** (tempel 2–3 link)
- Animasi: cover pembuka singkat, transisi carousel halus, dan efek logo saat hover; hormati `prefers-reduced-motion`.
- Bentuk komponen: panel geometris dengan border, glow, dan sudut kartu membulat.

## 5. Struktur Panel (Urutan Horizontal)

Urutan final setelah revisi pemilik:

1. **Home** — value statement, CTA project/kontak, lokasi, dan logo.
2. **About** — ringkasan profil dari CV dan ketersediaan remote/onsite.
3. **Projects** — vertical Peekaboo Carousel dengan autoplay, pause/play, navigasi manual, swipe, dan indikator.
4. **Tech Stack** — teknologi dikelompokkan ke Frontend, Backend/BaaS, Integration & Tools, dan Familiar.
5. **Experience** — pengalaman PROCSI, e-learning freelance, dan Assist.id.
6. **Contact** — email dan sosial dengan ikon, grid Mondrian, serta footer profil di kanan desktop.

Case Study dihapus atas permintaan pemilik. Tidak ada panel Process terpisah; Education/Sertifikasi, Testimonials, dan Blog tidak dibuat.

## 6. Konten yang Harus Disiapkan Pemilik

- [ ] Foto/avatar profesional → `public/images/avatar.*`
- [x] Teks About ringkas sudah dirangkum dari CV yang diberikan.
- [ ] Daftar 3–6 project terbaik dengan informasi lengkap; saat ini portfolio menampilkan 2 project.
- [x] Pengalaman kerja/freelance diberikan dan dimasukkan ke section Experience.
- [x] Tautan kontak yang dipakai, termasuk Instagram, sudah tersedia.

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

- [x] Metadata title/description, Open Graph/Twitter image, sitemap, dan robots tersedia.
- [x] Gambar project memakai `next/image`; font Inter dan Orbitron memakai `next/font`.
- [x] Target Lighthouse ≥ 90 di semua kategori tercapai pada satu audit build produksi lokal mobile (Performance 96, Accessibility 96, Best Practices 96, SEO 100). Preview deployment belum dapat diuji.
- [ ] Hindari JavaScript berlebih di panel yang statis — bundle/coverage belum diprofilkan.

## 10. Aksesibilitas

- [x] Satu `h1` terdeteksi; urutan navigasi keyboard diuji.
- [x] Gambar memiliki atribut `alt`; logo dekoratif menggunakan alt kosong.
- [x] Fokus keyboard terlihat lewat `:focus-visible`; navigasi panel menerima tombol panah.
- [x] Rasio kontras token foreground/muted/accent utama memenuhi WCAG AA pada light dan dark mode.
- [x] Toggle tema memiliki label aksesibel.
- [x] Cover dan carousel menghormati `prefers-reduced-motion`.

## 11. Alur Git

1. `git checkout main && git pull`
2. `git checkout -b redesign/portfolio-v2`
3. Satu commit per langkah kecil (Conventional Commits)
4. Sebelum commit: `npm run lint && npm run build`
5. Push branch → cek Preview Deployment di Vercel
6. Merge ke `main` setelah semua checklist di bagian 12 lolos

## 12. Definition of Done

- [x] Horizontal scroll diuji melalui wheel, swipe, navigasi klik, dots, dan keyboard.
- [x] Drag mouse desktop menggeser panel; klik pada kontrol interaktif tetap bekerja.
- [x] Project uji dapat ditambahkan hanya di `projects.ts`; entri uji tanpa gambar/link menampilkan fallback lalu dihapus.
- [x] Dark/light toggle dan penyimpanan tema diuji; rasio kontras token utama memenuhi AA.
- [x] Probe class tema dan paint pertama untuk preferensi light dan dark menunjukkan tema terset sebelum first paint.
- [x] Layout diuji pada viewport 390, 768, dan 1280 px; tidak ada overflow horizontal halaman.
- [x] `npm run lint` dan `npm run build` lulus.
- [x] Tautan project dan sosial yang dapat diuji merespons HTTP 200; email menggunakan tautan `mailto:`.
- [x] README mencakup fitur, stack, cara menjalankan, cara menambah project, sumber data, dan tema.
- [x] Hanya satu konfigurasi PostCSS aktif (`postcss.config.js`) dan Tailwind v3 memakai `tailwind.config.js`.
- [x] Lighthouse mobile lokal ≥90 untuk Performance, Accessibility, Best Practices, dan SEO.
- [x] Preview Vercel untuk commit `6c96f51` berstatus Ready dan halaman berhasil dibuka setelah login sebagai anggota team; deployment protection mewajibkan login anggota team.
- [x] Domain production `https://zand-zone.vercel.app/` terverifikasi merespons HTTP 200; pemilik memilih mempertahankan domain ini. `https://zand-port.vercel.app/` tidak digunakan dan membalas 404 `DEPLOYMENT_NOT_FOUND`.

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

## 14. Riwayat Pengerjaan dan Revisi

Audit dan rencana dilakukan sebelum implementasi. Audit awal dicatat di Lampiran A; rencana yang disetujui menggunakan arah bold-futuristik, tema teal/cyan, token CSS, dan mempertahankan native horizontal scroll-snap. Riwayat di bawah merangkum setiap revisi implementasi yang tercatat dalam commit:

| Commit | Revisi | Yang diperbarui |
|---|---|---|
| `5c3a8c4` | Menyiapkan panduan kerja redesign | Menambahkan dan merapikan instruksi agent, tahapan, spesifikasi portfolio, serta checklist awal. |
| `a108c3e` | Merapikan konfigurasi Tailwind/PostCSS | Menyatukan konfigurasi agar sesuai dengan Tailwind CSS v3 yang digunakan. |
| `411759c` | Redesign portfolio utama | Mengganti struktur halaman lama dengan komponen App Router; menambahkan design token, tema light/dark, provider tema, data bertipe (`profile`, `projects`, `stack`, `experience`), komponen UI, navigasi horizontal, metadata, Open Graph, sitemap, robots, dan README portfolio. |
| `65f4417` | Revisi Projects dan Contact | Memperbarui carousel/project dan layout Contact; menghapus panel Featured/Case Study dari implementasi sesuai keputusan pemilik. |
| `4941279` | Mengembalikan cover animasi | Menambahkan cover “Welcome to ZAND [Z]ONE” dengan logo dan grid animasi; cover menutup otomatis. |
| `72761a2` | Mempercepat cover | Memperpendek durasi intro dan menghilangkan kebutuhan tombol skip. |
| `9cb791b` | Autoplay carousel | Menambahkan autoplay dan kontrol pause/play serta jeda saat interaksi/reduced motion. |
| `09b9cd3` | Carousel Peekaboo vertikal | Mengubah carousel Project menjadi susunan vertikal dengan slide tetangga mengintip dan navigasi manual. |
| `8f7557e` | Menghaluskan transisi project | Mempertahankan identitas slide dan memperhalus perpindahan antarproject. |
| `5845ac1` | Skills dan Contact Mondrian | Memasukkan kategori skills sesuai CV; merancang ulang Contact menjadi grid Mondrian dan menambahkan footer profil di kanan desktop. |
| `7a29fef` | Pembaruan Work Experience | Mengganti konten menjadi pengalaman PROCSI, e-learning freelance, dan Assist.id; memadatkan tugas ke inti kontribusi. |
| `e4a00b3` | Revisi Home dan About | Memakai logo cover pada Home; merangkum profil berdasarkan CV dan memperbarui ketersediaan menjadi remote serta onsite. |
| `4ea8474` | Penyamaan logo dan ikon Stack | Menggunakan logo yang sama di header/footer dengan animasi hanya saat hover, memenuhi tinggi area footer Contact desktop, dan menambahkan ikon pada semua teknologi Stack. |
| `8247fd0` | Menambahkan drag mouse | Menambahkan drag pada area non-interaktif horizontal scroller desktop tanpa mengganti scroll-snap, wheel, atau swipe sentuh. |
| `6c96f51` | Upgrade Next.js ke versi patched | Memperbarui Next.js ke 15.5.29 beserta lockfile; lint/build lulus dan perubahan dipush ke branch redesign. |
| `5634012` | Meningkatkan visibilitas logo di dark mode | Menambahkan token latar mint terang untuk bidang logo pada Home, header, footer, dan cover; latar di light mode tetap putih. |

Perubahan konten yang belum disebut sebagai commit terpisah, termasuk penghapusan Case Study berdasarkan permintaan pemilik, masuk pada commit revisi Projects/Contact. Project yang ditampilkan sekarang tetap memakai satu sumber data bertipe di `src/data/projects.ts`.

## 15. Hasil Verifikasi Tahap 4

Verifikasi dilakukan pada 4 November 2026 di branch `redesign/portfolio-v2`, menggunakan browser lokal dan perintah proyek:

| Area | Pemeriksaan | Hasil |
|---|---|---|
| Build dan lint | `npm run lint`; `npm run build` | Lulus. Build sempat menemui file lock saat dev server berjalan; setelah server workspace dihentikan sementara, build selesai dan server dev dinyalakan kembali. |
| Navigasi desktop | Header nav, progress dots, tombol panah, ArrowRight pada scroller, wheel vertikal, dan drag mouse | Lulus; panel aktif dan posisi scroll ikut berubah, tombol CTA tetap dapat diklik. |
| Navigasi mobile | Swipe horizontal melalui touch event dan menu section | Lulus pada viewport 390 × 844; halaman tidak melebar secara horizontal. |
| Ukuran responsif | 390, 768, dan 1280 px | Lebar dokumen sama dengan viewport; Contact footer tidak overflow dan tersusun di bawah pada mobile. |
| Tema | Toggle light/dark, `localStorage`, reload, serta probe MutationObserver/first-paint untuk preferensi light dan dark | Lulus; tema tersimpan sebagai `light`/`dark`, dipulihkan saat reload, dan class/color-scheme yang sesuai aktif sebelum first paint. |
| Project carousel | Pause/play, Next project, autoplay 5 detik, dan reduced motion | Lulus; autoplay berhenti ketika reduced motion aktif. |
| Sumber data project | Menambahkan entri dummy hanya pada `src/data/projects.ts` | Lulus; kartu menampilkan “Preview unavailable” dan tidak membuat tautan demo palsu. Entri sementara sudah dihapus. |
| Stack | Jumlah chip dibandingkan dengan ikon yang dirender | 22 dari 22 teknologi memiliki ikon. |
| Link | Lima URL sosial/demo diperiksa dengan HTTP HEAD; atribut link eksternal | Semua merespons HTTP 200; semua link `target="_blank"` menggunakan `rel` yang memuat `noopener`. Link email menggunakan `mailto:` dan tidak mengirim email uji. |
| SEO endpoints | `/robots.txt`, `/sitemap.xml`, `/opengraph-image` | Ketiganya merespons HTTP 200. |
| Aksesibilitas dasar | Jumlah `h1`, gambar tanpa atribut alt, link tanpa href, external link tanpa noopener | 1 `h1`; 0 gambar tanpa alt; 0 link tanpa href; 0 external link tanpa noopener. |
| Kontras token | Rasio kontras foreground/muted/accent utama pada permukaan light/dark | Terukur sekitar 5.04:1–17.70:1, melewati ambang teks normal WCAG AA 4.5:1 untuk pasangan yang diperiksa. Ini bukan audit kontras otomatis seluruh state/elemen. |
| Lighthouse mobile | Lighthouse 12.8.2, build produksi lokal, throttling simulator; satu kali pengukuran pada 4 November 2026 | Performance **96**, Accessibility **96**, Best Practices **96**, SEO **100**; FCP 1.6 s, LCP 2.7 s, Speed Index 1.9 s, TBT 30 ms, CLS 0.03. Tidak ada run warnings. Insight yang perlu ditinjau: forced reflow dan critical request/network dependency tree. |
| Preview/prod deploy | GitHub status, Vercel Deployments/Domains/Deployment Protection, serta URL preview dan domain production | Commit `6c96f51` berstatus **Ready** pada Preview. Setelah pemilik login ke Vercel, preview `https://zand-port-6dwnne2uf-zands-projects-b1fe0547.vercel.app/` berhasil dimuat; title, enam panel, heading utama, metadata description, navigasi, dan link project/sosial diperiksa. Deployment Protection menggunakan Vercel Authentication: pengunjung harus login dan menjadi anggota team. Project Domains hanya mencantumkan `zand-zone.vercel.app` (Production, valid); domain yang sedang terpasang mengarah ke deployment Production dari branch `main` pada commit `64af315`. `https://zand-port.vercel.app/` tetap HTTP 404 `DEPLOYMENT_NOT_FOUND` karena tidak tercantum sebagai domain project. Perubahan domain/protection tidak dilakukan. |

Lighthouse mobile dan pemeriksaan tema sebelum first paint lulus pada build lokal. Preview terbaru berhasil diperiksa secara visual setelah login. Pemilik memilih mempertahankan domain production `zand-zone.vercel.app`; domain `zand-port.vercel.app` tidak digunakan. Deployment Protection sengaja tidak diubah. Lighthouse pada URL preview belum dijalankan.
