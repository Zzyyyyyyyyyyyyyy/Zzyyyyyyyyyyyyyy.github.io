const test = require('node:test');
const assert = require('node:assert');
const app = require('../src/index');

// Helper to start server on random port and fetch root
async function requestRoot() {
  const server = app.listen(0);
  const { port } = server.address();
  const res = await fetch(`http://localhost:${port}/`);
  server.close();
  return res;
}

test('GET / returns backend status message', async () => {
  const res = await requestRoot();
  const text = await res.text();
  assert.strictEqual(text, 'Backend is running');
});

