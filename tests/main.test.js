import http from 'k6/http';
import { check, sleep } from 'k6';
import { config, headers } from '../utils/config.js';

// Konfigurasi test
export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp-up ke 10 users dalam 30 detik
    { duration: '1m', target: 10 },   // Maintain 10 users selama 1 menit
    { duration: '30s', target: 20 },  // Ramp-up ke 20 users dalam 30 detik
    { duration: '1m', target: 20 },   // Maintain 20 users selama 1 menit
    { duration: '30s', target: 0 },   // Ramp-down ke 0 users
  ],
  thresholds: config.thresholds,
};

export default function () {
  // Test halaman utama
  const response = http.get(config.baseUrl, { headers });

  // Validasi response
  check(response, {
    'status adalah 200': (r) => r.status === 200,
    'response time < 5000ms': (r) => r.timings.duration < 5000,
    'body tidak kosong': (r) => r.body.length > 0,
  });

  // Simulasi user membaca halaman
  sleep(1);

  // Test dengan parameter tambahan (jika ada)
  const response2 = http.get(`${config.baseUrl}?page=1`, { headers });
  
  check(response2, {
    'status adalah 200': (r) => r.status === 200,
    'response time < 5000ms': (r) => r.timings.duration < 5000,
  });

  sleep(2);
}

// Fungsi untuk setup (dijalankan sekali di awal)
export function setup() {
  console.log('🚀 Starting K6 load test for Sholat Champions');
  console.log(`Target URL: ${config.baseUrl}`);
}

// Fungsi untuk teardown (dijalankan sekali di akhir)
export function teardown(data) {
  console.log('✅ Test completed');
}
