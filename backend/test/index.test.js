const test = require('node:test');
const assert = require('node:assert');
const app = require('../src/index');

// Helper to start server on random port and fetch a given path
async function request(path, options = {}) {
  const server = app.listen(0);
  const { port } = server.address();
  const res = await fetch(`http://localhost:${port}${path}`, options);
  server.close();
  return res;
}

test('GET / returns backend status message', async () => {
  const res = await request('/');
  assert.strictEqual(res.status, 200);
  const text = await res.text();
  assert.strictEqual(text, 'Backend is running');
});

test('GET /unknown returns 404', async () => {
  const res = await request('/unknown');
  assert.strictEqual(res.status, 404);
});

test('POST / returns 404 for unsupported method', async () => {
  const res = await request('/', { method: 'POST' });
  assert.strictEqual(res.status, 404);
});

