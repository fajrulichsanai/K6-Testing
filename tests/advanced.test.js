import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { config, headers } from '../utils/config.js';

// Custom metrics
const errorRate = new Rate('errors');
const pageLoadTime = new Trend('page_load_time');

// Test dengan multiple scenarios
export const options = {
  scenarios: {
    // Scenario 1: User biasa yang mengakses halaman
    normal_users: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 20 },
        { duration: '2m', target: 20 },
        { duration: '1m', target: 0 },
      ],
      gracefulRampDown: '30s',
    },
    // Scenario 2: User yang melakukan action tertentu
    active_users: {
      executor: 'constant-vus',
      vus: 10,
      duration: '3m',
      startTime: '30s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<2000', 'p(99)<3000'],
    http_req_failed: ['rate<0.01'],
    errors: ['rate<0.1'],
    page_load_time: ['avg<1500'],
  },
};

// Simulasi user membuka halaman
export default function () {
  group('Halaman Utama', function () {
    const response = http.get(config.baseUrl, { headers });
    
    const checkResult = check(response, {
      'status adalah 200': (r) => r.status === 200,
      'response time < 3000ms': (r) => r.timings.duration < 3000,
      'body tidak kosong': (r) => r.body.length > 0,
      'content type is HTML': (r) => r.headers['Content-Type']?.includes('text/html') || r.headers['content-type']?.includes('text/html'),
    });

    errorRate.add(!checkResult);
    pageLoadTime.add(response.timings.duration);

    sleep(1);
  });

  group('Navigasi', function () {
    // Simulasi user melakukan navigasi atau action
    const urls = [
      config.baseUrl,
      `${config.baseUrl}?tab=info`,
      `${config.baseUrl}?action=view`,
    ];

    urls.forEach((url) => {
      const res = http.get(url, { headers });
      check(res, {
        'status is 200 or 404': (r) => r.status === 200 || r.status === 404,
      });
      sleep(0.5);
    });
  });

  sleep(2);
}

export function setup() {
  console.log('🎯 Starting Advanced Scenario Test');
  console.log(`Target: ${config.baseUrl}`);
  console.log('Running multiple scenarios simultaneously');
  return { startTime: new Date().toISOString() };
}

export function teardown(data) {
  console.log(`✅ Test completed. Started at: ${data.startTime}`);
}
