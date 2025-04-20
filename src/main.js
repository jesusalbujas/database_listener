require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    user: process.env.DB_USER || "adempiere",
    host: process.env.DB_HOST || "192.168.1.108",
    database: process.env.DB_NAME || "NATULAC",
    password: process.env.DB_PASSWORD || "adempiere",
    port: process.env.DB_PORT || 5424,
});

async function main() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL');

        await client.query('LISTEN invoice_deleted');

        client.on('notification', (msg) => {
            const data = JSON.parse(msg.payload);
            console.log('Invoice Deleted:', data);
        });

        client.on('error', (err) => {
            console.error('Error connection:', err);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

main();
