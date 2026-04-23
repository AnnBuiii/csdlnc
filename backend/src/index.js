require('dotenv').config();
const app = require('./app');
const { connectPostgres } = require('./config/postgres');
const { connectMongo }    = require('./config/mongo');
const { connectRedis }    = require('./config/redis');
const { connectNeo4j }    = require('./config/neo4j');
const { connectCassandra } = require('./config/cassandra');
const logger = require('./config/logger');
const { initSocketIO } = require('./config/socket');
const http = require('http');

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    // Kết nối tất cả databases
    await connectPostgres();
    await connectMongo();
    await connectRedis();
    await connectNeo4j();
    await connectCassandra();

    const server = http.createServer(app);
    initSocketIO(server);

    server.listen(PORT, () => {
      logger.info(`🚀 SRS Backend running on port ${PORT} [${process.env.NODE_ENV}]`);
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      logger.info(`${signal} received – shutting down gracefully`);
      server.close(() => process.exit(0));
    };
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT',  () => shutdown('SIGINT'));

  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
}

bootstrap();
