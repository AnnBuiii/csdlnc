const { Pool } = require('pg');
const logger = require('./logger');

let pool;

async function connectPostgres() {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  const client = await pool.connect();
  await client.query('SELECT 1');
  client.release();
  logger.info('✅ PostgreSQL connected');
}

function getPool() {
  if (!pool) throw new Error('PostgreSQL not initialized');
  return pool;
}

// Helper: query với logging
async function query(text, params) {
  const start = Date.now();
  const res = await getPool().query(text, params);
  logger.debug(`PG query (${Date.now() - start}ms): ${text.substring(0, 80)}`);
  return res;
}

// Helper: transaction
async function withTransaction(fn) {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { connectPostgres, getPool, query, withTransaction };
