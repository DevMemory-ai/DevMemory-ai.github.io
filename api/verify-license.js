const { Client } = require('pg');

// Helper to create PostgreSQL database client using environment variables
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
        console.error('[VercelAPI] Database error:', err.message);
        throw err;
    } finally {
        try {
            await client.end();
        } catch {
            // ignore
        }
    }
}

// Vercel Serverless Function entry point
module.exports = async (req, res) => {
    // CORS configuration headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ success: false, error: 'Method Not Allowed' });
        return;
    }

    try {
        const { licenseKey } = req.body || {};
        if (!licenseKey) {
            res.status(400).json({ success: false, error: 'License key is required' });
            return;
        }

        const isValid = await verifyLicenseKey(licenseKey);
        if (isValid) {
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false, error: 'License not found or invalid license key' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to verify license: ' + err.message });
    }
};
