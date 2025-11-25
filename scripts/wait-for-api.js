/* eslint-env node */
/* eslint-disable no-undef */
const http = require('http');

const host = process.env.API_HOST || 'localhost';
const port = process.env.API_PORT || 5176;
const path = '/api/health';
const timeout = Number(process.env.WAIT_TIMEOUT || 30000);
const interval = Number(process.env.WAIT_INTERVAL || 500);

const start = Date.now();

function check() {
  const req = http.request({ hostname: host, port, path, timeout: 2000 }, (res) => {
    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
      console.log('API is ready');
      process.exit(0);
    } else {
      retry();
    }
  });

  req.on('error', () => retry());
  req.on('timeout', () => {
    req.destroy();
    retry();
  });
  req.end();
}

function retry() {
  if (Date.now() - start > timeout) {
    console.error('Timed out waiting for API');
    process.exit(2);
  }
  setTimeout(check, interval);
}

check();
