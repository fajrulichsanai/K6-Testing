import http from 'k6/http';
import { check, sleep } from 'k6';
import { config, headers } from '../utils/config.js';

// Smoke Test: Test minimal untuk memvalidasi script dan sistem
// Tujuan: Memastikan sistem berfungsi dengan load minimal
export const options = {
  vus: 1,              // 1 virtual user
  duration: '30s',     // Selama 30 detik
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const response = http.get(config.baseUrl, { headers });

  check(response, {
    'status adalah 200': (r) => r.status === 200,
    'response time < 2000ms': (r) => r.timings.duration < 2000,
    'body tidak kosong': (r) => r.body.length > 0,
    'tidak ada error': (r) => r.error === '',
  });

  sleep(1);
}

export function setup() {
  console.log('🔥 Starting Smoke Test');
  console.log('Testing dengan 1 virtual user selama 30 detik');
}

export function teardown(data) {
  console.log('✅ Smoke Test completed');
}
