# TAKARKUY

Tata Kelola Anggaran dan Resep, Kuy! Rencanakan makan yang sehat, hemat, dan minim sisa bahan.

TAKARKUY memulai perencanaan dari budget dan stok bahan yang sudah ada di dapur, lalu menyusun menu dan daftar belanja untuk beberapa hari ke depan. Cocok untuk mahasiswa, anak kos, dan keluarga muda.

## Fitur

- **Smart Budget Meal Planner:** isi budget, durasi 1–7 hari, porsi, waktu makan, dan target gizi. Hasilnya jadwal menu dan daftar belanja yang tidak melebihi budget, dengan stok Pantry dipakai lebih dulu.
- **Smart Pantry:** catat bahan lewat scan struk atau form manual. Perkiraan masa simpan diambil dari acuan lokal, dengan Gemini sebagai cadangan.
- **Akun & Preferensi:** login, profil, alergi, dan bahan yang ingin dihindari.
- **Recipe Book & Cooking Tracker:** cari resep, simpan favorit, lalu tekan *Sudah Masak* untuk mengurangi stok secara otomatis.
- **Dashboard & Market Locator:** ringkasan rencana, stok yang perlu segera dipakai, riwayat masak, dan peta pasar terdekat.

## Cara kerjanya

1. Tentukan budget dan target makan.
2. TAKARKUY memilih resep halal dari katalog lokal dengan harga snapshot (Garut, dilengkapi toko daring).
3. Simpan rencana, belanja, lalu masukkan belanjaan ke Pantry.
4. Masak dari jadwal, dan stok akan berkurang dengan sendirinya.

## Teknologi

Django 5.2 · SQLite (lokal) / PostgreSQL (produksi) · Tesseract.js (OCR struk di browser) · Gemini API (opsional) · Leaflet + OpenStreetMap.

## Menjalankan

```bash
python -m venv .venv
.venv\Scripts\activate          # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py import_catalog data/fixtures/catalog_seed.json --sync-generated-relations
python manage.py import_catalog data/authored_instructions.json
python manage.py runserver
```

Buka http://127.0.0.1:8000/. Gemini bersifat opsional. Kalau mau dipakai, isi `GEMINI_API_KEY` di file `.env` (jangan di-commit).

Verifikasi: `python manage.py test` dan `node --test apps/*/tests_js/*.mjs`.

## Dokumen lain

| Topik | File |
| --- | --- |
| Akun, login, dan alergi | [docs/ACCOUNTS.md](docs/ACCOUNTS.md) |
| Pantry, OCR, dan Gemini | [docs/PANTRY.md](docs/PANTRY.md) |
| Dashboard dan peta | [docs/DASHBOARD.md](docs/DASHBOARD.md) |
| Sumber dan jumlah data | [data/DATASETS.md](data/DATASETS.md) |
| Pipeline build katalog | [data/PIPELINE_DATA.md](data/PIPELINE_DATA.md) |
| Hak pakai sumber resep | [data/SOURCE_REVIEW.md](data/SOURCE_REVIEW.md) |