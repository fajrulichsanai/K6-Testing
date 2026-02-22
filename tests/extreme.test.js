import http from 'k6/http';
import { check, sleep } from 'k6';
import { config, headers } from '../utils/config.js';

// EXTREME TEST: 5000 Virtual Users!
// ⚠️ WARNING: Test ini akan memberikan beban SANGAT BERAT pada server
// Tujuan: Menemukan breaking point dan mendorong server hingga DOWN

export const options = {
  stages: [
    { duration: '5m', target: 1000 },   // Warm up ke 1000 users
    { duration: '10m', target: 10000 }, // Ramp up ke 10000 users
    { duration: '240m', target: 10000 }, // Maintain 10000 users selama 4 jam
    { duration: '5m', target: 0 },     // Ramp down
  ],
  thresholds: {
    // Thresholds yang lebih toleran untuk extreme test
    http_req_duration: ['p(95)<10000'],  // 10 detik
    http_req_failed: ['rate<0.50'],      // Toleransi error 50%
  },
  // Konfigurasi untuk handle banyak connections
  batch: 20,
  batchPerHost: 10,
  maxRedirects: 4,
};

export default function () {
  const response = http.get(config.baseUrl, { 
    headers,
    timeout: '30s',  // Timeout lebih lama
  });

  check(response, {
    'server masih merespons': (r) => r.status !== 0,
    'status adalah 2xx atau 3xx atau 5xx': (r) => r.status > 0,
    'tidak timeout': (r) => r.error !== 'request timeout',
  });

  // Sleep sangat singkat untuk maximize pressure
  sleep(0.1);
}

export function setup() {
  console.log('');
  console.log('═════════════════════════════════════════════════════════════');
  console.log('⚠️  EXTREME LOAD TEST - 10000 VIRTUAL USERS ⚠️');
  console.log('═════════════════════════════════════════════════════════════');
  console.log(`🎯 Target: ${config.baseUrl}`);
  console.log('🔥 Durasi: ~4 jam 20 menit');
  console.log('⚡ Peak Load: 10000 concurrent users');
  console.log('');
  console.log('⚠️  WARNING: Test ini akan memberikan beban SANGAT BERAT!');
  console.log('⚠️  Server kemungkinan besar akan mengalami degradasi atau DOWN!');
  console.log('⚠️  Pastikan Anda memiliki izin untuk melakukan test ini!');
  console.log('═════════════════════════════════════════════════════════════');
  console.log('');
}

export function teardown(data) {
  console.log('');
  console.log('═════════════════════════════════════════════════════════════');
  console.log('✅ EXTREME TEST COMPLETED');
  console.log('═════════════════════════════════════════════════════════════');
}
