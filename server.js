const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const DEFAULT_PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'pledges.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function readPledges() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading pledges:', err.message);
  }
  return [];
}

function savePledges(pledges) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(pledges, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving pledges:', err.message);
    return false;
  }
}

function handleApi(req, res, parsedUrl) {
  if (req.method === 'GET' && parsedUrl.pathname === '/api/pledges') {
    const pledges = readPledges();
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(pledges));
    return true;
  }

  if (req.method === 'POST' && parsedUrl.pathname === '/api/pledges') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const item = JSON.parse(body || '{}');
        const pledges = readPledges();
        const newPledge = {
          id: Date.now(),
          name: item.name || 'Anonymous Soul',
          location: item.location || 'Global Citizen',
          avatar: item.avatar || '',
          category: item.category || 'Earth Healing',
          text: (item.text || '').trim(),
          lights: 1,
          time: 'Just now',
          tier: item.tier || 'Guardian'
        };
        pledges.unshift(newPledge);
        savePledges(pledges);

        res.writeHead(201, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ success: true, pledge: newPledge }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return true;
  }

  if (req.method === 'POST' && parsedUrl.pathname === '/api/bless') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const pledges = readPledges();
        const found = pledges.find(p => String(p.id) === String(payload.id));
        if (found) {
          const delta = payload.increment || 1;
          found.lights = Math.max(0, (found.lights || 0) + delta);
          savePledges(pledges);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, lights: found.lights }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Pledge not found' }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return true;
  }

  return false;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Handle API routes
  if (parsedUrl.pathname.startsWith('/api/')) {
    if (handleApi(req, res, parsedUrl)) return;
  }

  // Resolve file path
  let relativePath = parsedUrl.pathname;
  if (relativePath === '/' || relativePath === '/home') {
    relativePath = '/index.html';
  } else if (relativePath === '/issues') {
    relativePath = fs.existsSync(path.join(__dirname, 'issues.html')) ? '/issues.html' : '/index.html';
  } else if (relativePath === '/impact') {
    relativePath = fs.existsSync(path.join(__dirname, 'impact.html')) ? '/impact.html' : '/index.html';
  } else if (relativePath === '/pledge') {
    relativePath = fs.existsSync(path.join(__dirname, 'pledge.html')) ? '/pledge.html' : '/index.html';
  }

  // Sanitize path to prevent directory traversal
  const safePath = path.normalize(decodeURIComponent(relativePath)).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safePath);

  // If path is a directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Fallback to index.html for SPA sub-routes
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found - A Better Tomorrow');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

function startServer(port) {
  server.listen(port, () => {
    console.log('\n=============================================================');
    console.log(' ✨ A BETTER TOMORROW - ETHEREAL WEB PLATFORM');
    console.log('=============================================================');
    console.log(` 🌐 Local Server running at: http://localhost:${port}`);
    console.log(` 🌐 Network URL:            http://127.0.0.1:${port}`);
    console.log('-------------------------------------------------------------');
    console.log(' Integrated Pages:');
    console.log(`   * Home:      http://localhost:${port}/#home`);
    console.log(`   * Issues:    http://localhost:${port}/#issues`);
    console.log(`   * Impact:    http://localhost:${port}/#impact`);
    console.log(`   * Pledge:    http://localhost:${port}/#pledge`);
    console.log('=============================================================\n');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

const PORT = parseInt(process.env.PORT || DEFAULT_PORT, 10);
startServer(PORT);

