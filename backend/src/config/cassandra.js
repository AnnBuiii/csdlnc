const cassandra = require('cassandra-driver');
const logger = require('./logger');

let client;

async function connectCassandra() {
  client = new cassandra.Client({
    contactPoints: [process.env.CASSANDRA_HOST || 'cassandra'],
    localDataCenter: 'datacenter1',
    credentials: {
      username: process.env.CASSANDRA_USER     || 'cassandra',
      password: process.env.CASSANDRA_PASSWORD || 'cassandra',
    },
    keyspace: process.env.CASSANDRA_KEYSPACE || 'srs_events',
    socketOptions: { connectTimeout: 10000 },
    pooling: { coreConnectionsPerHost: { [cassandra.types.distance.local]: 2 } },
  });

  await client.connect();
  logger.info('✅ Cassandra connected');
}

function getCassandra() {
  if (!client) throw new Error('Cassandra not initialized');
  return client;
}

// Helper: execute với logging
async function execute(query, params = [], options = {}) {
  const start = Date.now();
  const result = await getCassandra().execute(query, params, {
    prepare: true,
    ...options,
  });
  logger.debug(`Cassandra (${Date.now() - start}ms): ${query.substring(0, 80)}`);
  return result;
}

module.exports = { connectCassandra, getCassandra, execute };
