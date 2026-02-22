# 🚀 Quick Start Guide - K6 Load Testing

## Langkah Cepat untuk Memulai

### 1. Install K6

**macOS:**
```bash
brew install k6
```

**Verifikasi instalasi:**
```bash
k6 version
```

### 2. Menjalankan Test Pertama

**Smoke Test (Tercepat - 30 detik):**
```bash
k6 run tests/smoke.test.js
```

**Main Test (Sedang - 3.5 menit):**
```bash
npm test
# atau
k6 run tests/main.test.js
```

### 3. Menggunakan Script Runner

```bash
./run-tests.sh
```

Lalu pilih test yang ingin dijalankan (1-7).

### 4. Membaca Hasil Test

Setelah test selesai, K6 akan menampilkan:

```
✓ status adalah 200
✓ response time < 5000ms
✓ body tidak kosong

checks.........................: 100.00% ✓ 150  ✗ 0  
http_req_duration..............: avg=234ms   min=112ms  med=201ms  max=987ms  p(90)=345ms  p(95)=456ms
http_req_failed................: 0.00%   ✓ 0    ✗ 150
iterations.....................: 150     2.5/s
```

**Metrics Penting:**
- ✓ checks: Semua validasi berhasil
- http_req_duration: Waktu response (semakin rendah semakin baik)
- http_req_failed: Persentase request gagal (target: 0%)
- p(95): 95% request selesai dalam waktu ini

### 5. Hasil Test Tersimpan

Hasil test tersimpan di folder `results/` dalam format JSON.

## 📚 Jenis Test

| Test | Virtual Users | Durasi | Tujuan |
|------|--------------|--------|---------|
| Smoke | 1 | 30s | Validasi dasar |
| Main | 10-20 | 3.5m | Test normal |
| Load | 20-50 | 9m | Load normal |
| Stress | 50-200 | 17m | Breaking point |
| Spike | 10-200 | 3m | Sudden spike |
| Advanced | 20-30 | 4m | Multiple scenarios |

## ⚙️ Kustomisasi

Edit file test untuk mengubah:

```javascript
export const options = {
  vus: 10,           // Jumlah virtual users
  duration: '30s',   // Durasi test
};
```

## 🔍 Tips

1. **Mulai dari Smoke Test** - Validasi dulu sebelum load test
2. **Monitor Server** - Perhatikan CPU, RAM, dan response time
3. **Bertahap** - Jangan langsung stress test
4. **Dokumentasi** - Catat hasil setiap test

## ❗ Perhatian

- Stress test memberikan load tinggi pada server
- Pastikan Anda punya izin untuk testing
- Jangan jalankan stress test di production tanpa approval

## 📞 Bantuan

Lihat [README.md](README.md) untuk dokumentasi lengkap.
