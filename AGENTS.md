# AGENTS.md — zand-port

Website portfolio pribadi milik Z (zulandre23). Dibuat dengan Next.js + TypeScript + Tailwind CSS, deploy di Vercel (https://zand-port.vercel.app).

## BACA INI DULU (wajib, berurutan)
1. `docs/PORTFOLIO_UPDATE.md` — spesifikasi lengkap update & redesign (sumber kebenaran).
2. `docs/AGENT_PROMPT.md` — tahapan kerja yang harus kamu ikuti.

Jangan mengubah kode sebelum Tahap 1 (audit) dan Tahap 2 (rencana) selesai dan disetujui pemilik repo.

## Perintah
- Install: `npm install`
- Dev: `npm run dev` (http://localhost:3000)
- Lint: `npm run lint`
- Build: `npm run build`
- `npm run lint` dan `npm run build` harus lolos sebelum setiap commit.

## Aturan inti (ringkas)
- PERTAHANKAN layout horizontal scroll yang sudah ada. Audit dulu cara kerjanya; jangan ganti pendekatannya tanpa alasan kuat.
- Semua project berasal dari satu sumber data bertipe: `src/data/projects.ts`. Menambah project tidak boleh menyentuh komponen UI.
- Dual mode (dark & light) lewat design token (CSS variables), bukan warna hardcode.
- Jangan mengarang data (perusahaan, angka, tautan, testimoni). Data yang belum ada diberi placeholder `TODO`.
- Jangan menambah dependency besar tanpa penjelasan alasan.
- Kerja di branch `redesign/portfolio-v2`, satu commit per langkah kecil, pesan commit jelas (gaya Conventional Commits).
- Bahasa konten: ikuti yang sudah dipakai di repo; komentar kode dan dokumentasi boleh Bahasa Indonesia.
