import http from 'k6/http';
import { check, sleep } from 'k6';
import { config, headers } from '../utils/config.js';

// Stress Test: Test dengan traffic tinggi untuk menemukan breaking point
// Tujuan: Menemukan batas maksimal sistem
export const options = {
  stages: [
    { duration: '2m', target: 50 },    // Ramp-up ke 50 users
    { duration: '3m', target: 50 },    // Maintain 50 users
    { duration: '2m', target: 100 },   // Ramp-up ke 100 users
    { duration: '3m', target: 100 },   // Maintain 100 users
    { duration: '2m', target: 200 },   // Ramp-up ke 200 users
    { duration: '3m', target: 200 },   // Maintain 200 users
    { duration: '2m', target: 0 },     // Ramp-down ke 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],  // Lebih toleran untuk stress test
    http_req_failed: ['rate<0.05'],     // Toleransi error 5%
  },
};

export default function () {
  const response = http.get(config.baseUrl, { headers });

  check(response, {
    'status adalah 200': (r) => r.status === 200,
    'response time < 10000ms': (r) => r.timings.duration < 10000,
    'tidak timeout': (r) => r.status !== 0,
  });

  sleep(1);
}

export function setup() {
  console.log('💪 Starting Stress Test');
  console.log('Testing dengan 50-200 virtual users');
  console.log('⚠️  Warning: Test ini akan memberikan load tinggi pada sistem');
}

export function teardown(data) {
  console.log('✅ Stress Test completed');
}
