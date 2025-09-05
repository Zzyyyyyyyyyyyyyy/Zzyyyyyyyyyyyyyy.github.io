const test = require('node:test');
const assert = require('node:assert');
const app = require('../src/index');

async function request(path = '/', options = {}) {
  const server = app.listen(0);
  const { port } = server.address();
  const res = await fetch(`http://localhost:${port}${path}`, options);
  server.close();
  return res;
}

test('GET / returns backend status message', async () => {
  const res = await request();
  const text = await res.text();
  assert.strictEqual(text, 'Backend is running');
});

test('GET /missing returns 404', async () => {
  const res = await request('/missing');
  assert.strictEqual(res.status, 404);
});

test('POST / returns 404', async () => {
  const res = await request('/', { method: 'POST' });
  assert.strictEqual(res.status, 404);
});
