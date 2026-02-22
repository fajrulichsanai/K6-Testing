import http from 'k6/http';
import { check, sleep } from 'k6';
import { config, headers } from '../utils/config.js';

// Load Test: Test dengan traffic normal/expected
// Tujuan: Memastikan sistem dapat handle traffic normal
export const options = {
  stages: [
    { duration: '1m', target: 20 },   // Ramp-up ke 20 users dalam 1 menit
    { duration: '3m', target: 20 },   // Maintain 20 users selama 3 menit
    { duration: '1m', target: 50 },   // Ramp-up ke 50 users dalam 1 menit
    { duration: '3m', target: 50 },   // Maintain 50 users selama 3 menit
    { duration: '1m', target: 0 },    // Ramp-down ke 0 users
  ],
  thresholds: config.thresholds,
};

export default function () {
  // Test halaman utama
  const response = http.get(config.baseUrl, { headers });

  check(response, {
    'status adalah 200': (r) => r.status === 200,
    'response time < 3000ms': (r) => r.timings.duration < 3000,
    'body tidak kosong': (r) => r.body.length > 0,
  });

  sleep(1);

  // Simulasi user interaction
  const response2 = http.get(`${config.baseUrl}?action=view`, { headers });
  
  check(response2, {
    'status adalah 200 atau 404': (r) => r.status === 200 || r.status === 404,
  });

  sleep(2);
}

export function setup() {
  console.log('📊 Starting Load Test');
  console.log('Testing dengan 20-50 virtual users');
}

export function teardown(data) {
  console.log('✅ Load Test completed');
}
