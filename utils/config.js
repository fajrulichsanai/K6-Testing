// Konfigurasi umum untuk semua test
export const config = {
  baseUrl: 'https://sholatchampions.com/masjid',
  thresholds: {
    // 95% dari request harus selesai dalam 2 detik
    http_req_duration: ['p(95)<2000'],
    // 99% dari request harus selesai dalam 3 detik
    'http_req_duration{expected_response:true}': ['p(99)<3000'],
    // Error rate harus dibawah 1%
    http_req_failed: ['rate<0.01'],
  },
};

export const headers = {
  'Content-Type': 'application/json',
  'User-Agent': 'K6 Load Test',
};
