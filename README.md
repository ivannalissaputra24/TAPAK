# TAPAK

**Teknologi Akuisisi dan Pencatatan Hutan Kita**
*Every Track Tells a Story.*

Aplikasi Android untuk pemetaan, navigasi, dan pencatatan lapangan yang bekerja tanpa internet.

---

## 1. Tentang Aplikasi

| | |
|---|---|
| **Nama** | TAPAK |
| **Kepanjangan** | Teknologi Akuisisi dan Pencatatan Hutan Kita |
| **Tagline** | Every Track Tells a Story. |
| **Versi** | 1.0 |
| **ID aplikasi** | `id.tapak.patroli` |
| **Platform** | Android |
| **Bahasa antarmuka** | Indonesia |

TAPAK dibuat sebagai alternatif ringan untuk aplikasi peta lapangan berbayar. Aplikasi ini memakai peta PDF berreferensi geografis (GeoPDF), misalnya hasil ekspor ArcMap atau QGIS, sebagai peta dasar saat tidak ada sinyal. Data yang dikumpulkan tersimpan di HP dan dapat diekspor ke format standar GIS.

## 2. Kegunaan

- **Navigasi dan orientasi peta** memakai posisi GPS, kompas, dan skala.
- **Peta offline:** impor GeoPDF dari HP, tampil sesuai posisi sebenarnya, dengan pengaturan transparansi.
- **Peta online gratis** (jalan, kontur, satelit) saat ada internet.
- **Rekam jejak patroli (tracking):** jarak dan durasi tampil langsung, hasilnya disimpan sebagai jalur.
- **Tandai titik, gambar jalur, dan gambar area** langsung di peta atau dari lokasi GPS.
- **Ukur jarak dan luas** (metrik, imperial, atau nautika).
- **Atribut objek:** nama, keterangan, dan data tambahan bebas (jenis, jumlah, kondisi, dan lain-lain).
- **Foto lampiran dengan geotag:** koordinat dituliskan ke EXIF foto. Foto kamera dan galeri sama-sama didukung.
- **Navigasi ke titik tujuan:** jarak dan arah dari posisi saat ini.
- **Sistem koordinat:** derajat desimal (WGS84), derajat-menit-detik, dan UTM. Ketuk kotak koordinat di kiri atas untuk berganti.
- **Ekspor data:** GeoJSON, KMZ (foto ikut), dan SHP dalam zip (foto ikut), dibagikan lewat menu Share Android.

## 3. Teknologi dan Package

**Kerangka aplikasi**
- Aplikasi web (HTML, CSS, JavaScript tanpa framework) yang dibungkus menjadi APK dengan **Capacitor 6**.
- Build APK otomatis di **GitHub Actions** (Ubuntu, Java 17 Temurin, Gradle).

**Package Capacitor (versi TAPAK 1.0)**
| Package | Versi | Fungsi |
|---|---|---|
| `@capacitor/core`, `cli`, `android` | ^6.1.2 | Pembungkus aplikasi menjadi APK |
| `@capacitor/geolocation` | ^6.0.1 | GPS dan izin lokasi |
| `@capacitor/filesystem` | ^6.0.1 | Menyimpan berkas ekspor sementara |
| `@capacitor/share` | ^6.0.2 | Membagikan berkas ekspor |
| `@capacitor/assets` | terbaru (saat build) | Membuat ikon dan splash Android |

**Library peta dan data (versi TAPAK 1.0)** (disalin ke `www/lib` saat build agar jalan offline)
| Library | Versi | Fungsi |
|---|---|---|
| Leaflet | 1.9.4 | Mesin peta |
| pdf.js (`pdfjs-dist`) | 3.11.174 | Membaca dan merender PDF |
| proj4 | 2.9.2 | Konversi koordinat (UTM) |
| JSZip | 3.10.1 | Membuat berkas KMZ dan ZIP |
| piexifjs | 1.0.6 | Menulis dan membaca geotag EXIF foto |
| @mapbox/shp-write | 0.4.3 | Membuat Shapefile |

**Penyimpanan:** IndexedDB di dalam aplikasi (objek, foto, peta PDF, pengaturan).

**Izin Android:** lokasi (presisi dan perkiraan), kamera, baca foto, dan internet. Izin ditulis otomatis ke AndroidManifest oleh workflow build.

## 4. Struktur Repo

```
www/index.html, style.css, app.js   Seluruh aplikasi
assets/                             Ikon dan splash sumber
prepare.js                          Menyalin library ke www/lib saat build
capacitor.config.json               Nama dan ID aplikasi
package.json                        Daftar dependensi
.github/workflows/build.yml         Build APK otomatis
```

## 5. Catatan

**Peta**
- **Impor GeoPDF** membaca data georeferensi dari PDF lalu menyesuaikannya dengan peta. Hanya **halaman pertama** yang dibaca. PDF yang georeferensinya tersimpan terkompresi, atau PDF biasa tanpa georeferensi, akan ditolak dengan pesan error. Saat ekspor dari ArcMap, centang **"Export Map Georeference Information"**.
- Pada peta yang sangat luas bisa ada selisih posisi kecil. Cek posisi GPS pada fitur yang dikenal sebelum dipakai.
- Peta PDF sangat besar dirender dengan resolusi dibatasi, sehingga detail halus bisa berkurang.
- **Peta online tidak disimpan** untuk offline. Tanpa internet, hanya peta PDF yang tampil. Pemakaian tile OpenStreetMap harus mengikuti kebijakan penggunaannya.

**Tracking dan GPS**
- Fix GPS pertama bisa lama, terutama di dalam bangunan atau di bawah kanopi lebat. Titik dengan akurasi buruk (lebih dari 50 m) tidak dicatat dalam track.
- Kompas bergantung pada sensor HP dan bisa perlu dikalibrasi. Peta tidak berputar mengikuti arah HP.

**Data dan ekspor**
- Tidak ada fitur impor GeoJSON, KML, atau SHP, dan tidak ada pengeditan titik (vertex) setelah objek disimpan.
- Foto diperkecil maksimal 1600 px dan disimpan di dalam aplikasi, jadi banyak foto menambah ukuran data.
- Shapefile membatasi nama atribut maksimal 10 karakter, dan koordinatnya WGS84.
- Satu objek hanya bertipe titik, jalur, atau area. Tidak ada lapisan (layer) terpisah.

**Distribusi**
- APK ditandatangani dengan kunci **debug**, cukup untuk dibagikan internal, tetapi bukan untuk Play Store.
- Belum diuji pada semua merek dan versi Android. Uji di beberapa HP sebelum dipakai luas.

## 6. Disclaimer

```
Sebagian kode sumber aplikasi ini telah melalui proses _refactoring_ dengan bantuan Claude AI, berdasarkan prompt dan instruksi yang ditentukan oleh pengembang, dengan menggunakan kode sumber awal yang dikembangkan secara mandiri sebagai bahan masukan.

## 7. Lisensi dan Atribusi

Peta dasar online: © kontributor OpenStreetMap, OpenTopoMap, dan Esri. Library pihak ketiga memakai lisensi masing-masing (Leaflet BSD-2, pdf.js Apache-2.0, proj4 MIT, JSZip MIT/GPLv3, piexifjs MIT, shp-write BSD). Tentukan lisensi TAPAK sendiri sesuai kebijakan organisasi Anda.
