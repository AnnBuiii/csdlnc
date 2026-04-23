const neo4j = require('neo4j-driver');
const logger = require('./logger');

let driver;

async function connectNeo4j() {
  driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://neo4j:7687',
    neo4j.auth.basic(
      process.env.NEO4J_USER     || 'neo4j',
      process.env.NEO4J_PASSWORD || 'srs_neo4j_pass'
    ),
    { maxConnectionPoolSize: 50 }
  );

  await driver.verifyConnectivity();
  logger.info('✅ Neo4j connected');
}

function getDriver() {
  if (!driver) throw new Error('Neo4j not initialized');
  return driver;
}

// Helper: chạy Cypher query, tự đóng session
async function runCypher(cypher, params = {}) {
  const session = getDriver().session({ database: 'neo4j' });
  try {
    const result = await session.run(cypher, params);
    return result.records;
  } finally {
    await session.close();
  }
}

// Helper: chạy write transaction
async function writeTransaction(fn) {
  const session = getDriver().session();
  try {
    return await session.writeTransaction(fn);
  } finally {
    await session.close();
  }
}

module.exports = { connectNeo4j, getDriver, runCypher, writeTransaction };
