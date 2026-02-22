import http from 'k6/http';
import { check, sleep } from 'k6';
import { config, headers } from '../utils/config.js';

// Spike Test: Test dengan lonjakan traffic mendadak
// Tujuan: Memastikan sistem dapat handle sudden traffic spike
export const options = {
  stages: [
    { duration: '30s', target: 10 },   // Normal traffic
    { duration: '10s', target: 5000 },  // SPIKE! Lonjakan ke 5000 users
    { duration: '1m', target: 5000 },   // Maintain spike
    { duration: '30s', target: 10 },   // Kembali ke normal
    { duration: '30s', target: 0 },    // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<10000'],  // Lebih toleran untuk spike ekstrem
    http_req_failed: ['rate<0.50'],    // Toleransi error 50% untuk spike besar
  },
};

export default function () {
  const response = http.get(config.baseUrl, { headers });

  check(response, {
    'status adalah 200': (r) => r.status === 200,
    'response time < 10000ms': (r) => r.timings.duration < 10000,
    'sistem tidak crash': (r) => r.status !== 0,
  });

  sleep(0.5); // Sleep lebih singkat untuk simulate spike
}

export function setup() {
  console.log('⚡ Starting Spike Test');
  console.log('Testing dengan sudden traffic spike dari 10 ke 5000 users');
  console.log('⚠️  Warning: Test ini akan memberikan sudden load spike EKSTREM');
}

export function teardown(data) {
  console.log('✅ Spike Test completed');
}
