const cassandra = require('cassandra-driver');
const logger = require('./logger');

let client;

async function connectCassandra() {
  // First connect without keyspace to check/create it
  const tempClient = new cassandra.Client({
    contactPoints: [process.env.CASSANDRA_HOST || 'cassandra'],
    localDataCenter: 'datacenter1',
    credentials: {
      username: process.env.CASSANDRA_USER     || 'cassandra',
      password: process.env.CASSANDRA_PASSWORD || 'cassandra',
    },
    socketOptions: { connectTimeout: 10000 },
  });

  try {
    await tempClient.connect();
    logger.info('✅ Cassandra connected (temporary)');
    
    // Check if keyspace exists
    const keyspaceName = process.env.CASSANDRA_KEYSPACE || 'srs_events';
    const result = await tempClient.execute(
      "SELECT keyspace_name FROM system_schema.keyspaces WHERE keyspace_name = ?",
      [keyspaceName],
      { prepare: true }
    );
    
    if (result.rows.length === 0) {
      logger.info(`Creating keyspace: ${keyspaceName}`);
      await tempClient.execute(`
        CREATE KEYSPACE IF NOT EXISTS ${keyspaceName}
        WITH replication = {
          'class': 'SimpleStrategy',
          'replication_factor': 1
        }
        AND durable_writes = true
      `);
      logger.info(`✅ Keyspace ${keyspaceName} created`);
    } else {
      logger.info(`✅ Keyspace ${keyspaceName} already exists`);
    }
    
    // Now create main client with keyspace
    client = new cassandra.Client({
      contactPoints: [process.env.CASSANDRA_HOST || 'cassandra'],
      localDataCenter: 'datacenter1',
      credentials: {
        username: process.env.CASSANDRA_USER     || 'cassandra',
        password: process.env.CASSANDRA_PASSWORD || 'cassandra',
      },
      keyspace: keyspaceName,
      socketOptions: { connectTimeout: 10000 },
      pooling: { coreConnectionsPerHost: { [cassandra.types.distance.local]: 2 } },
    });
    
    await client.connect();
    logger.info(`✅ Cassandra connected to keyspace ${keyspaceName}`);
    
    // Create tables from schema file
    await createTables();
    
    // Close temporary client
    await tempClient.shutdown();
  } catch (error) {
    if (tempClient) await tempClient.shutdown();
    throw error;
  }
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

async function createTables() {
  const queries = [
    // user_activity_log
    `CREATE TABLE IF NOT EXISTS user_activity_log (
      user_id     TEXT,
      event_date  DATE,
      event_time  TIMESTAMP,
      event_id    UUID,
      event_type  TEXT,
      entity_id   TEXT,
      entity_type TEXT,
      metadata    TEXT,
      ip_address  TEXT,
      user_agent  TEXT,
      PRIMARY KEY ((user_id, event_date), event_time, event_id)
    ) WITH CLUSTERING ORDER BY (event_time DESC, event_id ASC)
      AND compaction = {
        'class': 'TimeWindowCompactionStrategy',
        'compaction_window_unit': 'DAYS',
        'compaction_window_size': 1
      }
      AND default_time_to_live = 7776000`,
    
    // job_view_stats
    `CREATE TABLE IF NOT EXISTS job_view_stats (
      job_id      TEXT,
      stat_date   DATE,
      hour        INT,
      view_count  COUNTER,
      apply_count COUNTER,
      PRIMARY KEY ((job_id, stat_date), hour)
    ) WITH CLUSTERING ORDER BY (hour ASC)`,
    
    // search_history
    `CREATE TABLE IF NOT EXISTS search_history (
      user_id     TEXT,
      search_date DATE,
      searched_at TIMESTAMP,
      search_id   UUID,
      query       TEXT,
      filters     TEXT,
      result_count INT,
      clicked_ids LIST<TEXT>,
      PRIMARY KEY ((user_id, search_date), searched_at, search_id)
    ) WITH CLUSTERING ORDER BY (searched_at DESC, search_id ASC)
      AND default_time_to_live = 2592000`,
    
    // notification_log
    `CREATE TABLE IF NOT EXISTS notification_log (
      user_id     TEXT,
      notif_date  DATE,
      sent_at     TIMESTAMP,
      notif_id    UUID,
      type        TEXT,
      title       TEXT,
      body        TEXT,
      is_read     BOOLEAN,
      channel     TEXT,
      PRIMARY KEY ((user_id, notif_date), sent_at, notif_id)
    ) WITH CLUSTERING ORDER BY (sent_at DESC, notif_id ASC)
      AND default_time_to_live = 604800`
  ];

  for (const query of queries) {
    try {
      await client.execute(query);
      logger.debug(`Table created: ${query.split('(')[0].split(' ')[3]}`);
    } catch (error) {
      logger.warn(`Table may already exist: ${error.message}`);
    }
  }
  logger.info('✅ Cassandra tables checked/created');
}

module.exports = { connectCassandra, getCassandra, execute };
