#!/usr/bin/env node
// Minimal static file server for development
// Usage: node scripts/serve-static.js [rootDir] [port]

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const root = path.resolve(process.argv[2] || '.');
const port = parseInt(process.argv[3] || '8080', 10);

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8'
};

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  if (body) res.end(body); else res.end();
}

function safeJoin(rootDir, reqPath) {
  const decoded = decodeURIComponent(reqPath);
  const p = path.normalize(path.join(rootDir, decoded));
  if (!p.startsWith(rootDir)) return null; // prevent traversal
  return p;
}

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  let filePath = safeJoin(root, pathname || '/');
  if (!filePath) return send(res, 400, { 'Content-Type': 'text/plain' }, 'Bad Request');

  fs.stat(filePath, (err, stats) => {
    if (err) {
      return send(res, 404, { 'Content-Type': 'text/plain' }, 'Not Found');
    }
    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      fs.stat(indexPath, (e2, s2) => {
        if (e2 || !s2.isFile()) {
          return send(res, 403, { 'Content-Type': 'text/plain' }, 'Directory listing forbidden');
        }
        streamFile(indexPath, res);
      });
      return;
    }
    streamFile(filePath, res);
  });
});

function streamFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const type = mime[ext] || 'application/octet-stream';
  const stream = fs.createReadStream(filePath);
  stream.on('open', () => {
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
  });
  stream.on('error', () => send(res, 500, { 'Content-Type': 'text/plain' }, 'Server Error'));
  stream.pipe(res);
}

server.listen(port, () => {
  console.log(`Static server running at http://localhost:${port} -> ${root}`);
});

