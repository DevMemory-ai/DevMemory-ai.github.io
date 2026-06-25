const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { Client } = require('pg');

// Parse and load environment variables from docs/.env
function loadEnv() {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        try {
            const content = fs.readFileSync(envPath, 'utf8');
            content.split(/\r?\n/).forEach(line => {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith('#')) return;
                const parts = trimmed.split('=');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    let val = parts.slice(1).join('=').trim();
                    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                        val = val.substring(1, val.length - 1);
                    }
                    if (!process.env[key]) {
                        process.env[key] = val;
                    }
                }
            });
        } catch (e) {
            console.error('Failed to parse .env file:', e.message);
        }
    }
}

// Load env before establishing any DB connections
loadEnv();

// Helper to create PostgreSQL database client
function getDbClient() {
    if (process.env.DATABASE_URL) {
        return new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
    }
    const dbConfig = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432', 10),
        database: process.env.DB_DATABASE,
        ssl: { rejectUnauthorized: false }
    };
    return new Client(dbConfig);
}

// Queries the database to check if a license key is valid and active
async function verifyLicenseKey(key) {
    if (!key) return false;
    const client = getDbClient();
    try {
        const connectPromise = client.connect();
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Database connection timeout')), 5000)
        );
        await Promise.race([connectPromise, timeoutPromise]);

        const res = await client.query(
            'SELECT is_active FROM licenses WHERE key = $1;',
            [key]
        );
        if (res.rows.length > 0 && res.rows[0].is_active === true) {
            return true;
        }
        return false;
    } catch (err) {
        console.error('[VerifyServer] Database error:', err.message);
        throw err;
    } finally {
        try {
            await client.end();
        } catch {
            // ignore
        }
    }
}

// MIME types lookup table
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.svg': 'image/svg+xml; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.json': 'application/json; charset=utf-8',
    '.ico': 'image/x-icon',
};

const PORT = process.env.PORT || 3000;

// HTTP server instance
const server = http.createServer((req, res) => {
    // Standard CORS configuration
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;

    // Route: Verify License Key (POST /api/verify-license)
    if (req.method === 'POST' && pathname === '/api/verify-license') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const licenseKey = data.licenseKey;
                if (!licenseKey) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: 'License key is required' }));
                    return;
                }

                const isValid = await verifyLicenseKey(licenseKey);
                if (isValid) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: 'License not found or invalid license key' }));
                }
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Failed to verify license: ' + err.message }));
            }
        });
        return;
    }

    // Route: Static Files serving
    if (req.method === 'GET') {
        // Security guard: Deny access to hidden files and env files
        if (pathname.includes('/.') || pathname.includes('.env')) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end('Forbidden');
            return;
        }

        let relativePath = pathname;
        if (relativePath === '/' || relativePath === '/index.html') {
            relativePath = '/index.html';
        }

        const filePath = path.join(__dirname, relativePath);

        // Security check to avoid path traversal vulnerabilities
        if (!filePath.startsWith(__dirname)) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end('Forbidden');
            return;
        }

        fs.stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                return;
            }

            const ext = path.extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';

            res.writeHead(200, { 'Content-Type': contentType });
            fs.createReadStream(filePath).pipe(res);
        });
        return;
    }

    // Default 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Documentation backend server running at http://localhost:${PORT}`);
});

module.exports = server;
