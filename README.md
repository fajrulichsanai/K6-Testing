# K6 Load Testing - Sholat Champions

Project ini berisi load testing untuk website Sholat Champions menggunakan K6.

## 🚀 Instalasi K6

### macOS
```bash
brew install k6
```

### Linux
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### Windows (via Chocolatey)
```bash
choco install k6
```

## 📁 Struktur Project

```
K6 Testing/
├── tests/
│   ├── main.test.js      # Test utama
│   ├── smoke.test.js     # Smoke test (minimal load)
│   ├── load.test.js      # Load test (normal load)
│   ├── stress.test.js    # Stress test (heavy load)
│   └── spike.test.js     # Spike test (sudden load)
├── utils/
│   └── config.js         # Konfigurasi umum
├── package.json
└── README.md
```

## 🧪 Menjalankan Test

### Test Utama
```bash
npm test
# atau
k6 run tests/main.test.js
```

### Smoke Test (Validasi dasar)
```bash
npm run test:smoke
```

### Load Test (Testing dengan load normal)
```bash
npm run test:load
```

### Stress Test (Testing dengan load tinggi)
```bash
npm run test:stress
```

### Spike Test (Testing dengan lonjakan mendadak)
```bash
npm run test:spike
```

### Menjalankan semua test
```bash
npm run test:all
```

## 📊 Hasil Test

K6 akan menampilkan metrics seperti:
- **http_req_duration**: Waktu response
- **http_req_failed**: Persentase request yang gagal
- **iterations**: Jumlah iterasi yang diselesaikan
- **vus**: Virtual users yang aktif

## 🎯 Threshold yang Digunakan

- Response time (p95) < 2000ms
- Response time (p99) < 3000ms
- Error rate < 1%
- Request duration < 5000ms

## 📝 Catatan

- Target URL: https://sholatchampions.com/masjid
- Sesuaikan jumlah virtual users dan durasi sesuai kebutuhan
- Monitor server selama test untuk melihat penggunaan resources

## 🔧 Kustomisasi

Edit file di folder `tests/` untuk menyesuaikan:
- Jumlah virtual users (VUs)
- Durasi test
- Threshold metrics
- Endpoint yang akan ditest

## 📚 Referensi

- [K6 Documentation](https://k6.io/docs/)
- [K6 Test Types](https://k6.io/docs/test-types/introduction/)
