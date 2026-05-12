require('dotenv').config();
const app = require('./app');
const { connectPostgres } = require('./config/postgres');
const { connectMongo }    = require('./config/mongo');
const { connectRedis }    = require('./config/redis');
const { connectNeo4j }    = require('./config/neo4j');
const logger = require('./config/logger');
const { initSocketIO } = require('./config/socket');
const http = require('http');
const { execSync } = require('child_process');
const path = require('path');

const PORT = process.env.PORT || 3000;

async function checkAndSeedDatabase() {
  try {
    const { query } = require('./config/postgres');
    const result = await query('SELECT COUNT(*) FROM users');
    const userCount = parseInt(result.rows[0].count);
    
    if (userCount === 0) {
      logger.info('📊 Database empty, running seed script...');
      const seedScript = path.join(__dirname, '../scripts/seed.js');
      execSync(`node ${seedScript}`, { stdio: 'inherit' });
      logger.info('✅ Database seeded successfully');
    } else {
      logger.info(`📊 Database already has ${userCount} users, skipping seed`);
    }
  } catch (error) {
    logger.warn(`⚠️  Could not check database emptiness: ${error.message}`);
  }
}

async function bootstrap() {
  try {
    // Kết nối tất cả databases
    await connectPostgres();
    await connectMongo();
    await connectRedis();
    await connectNeo4j();

    // Check if database is empty and seed if needed
    await checkAndSeedDatabase();

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
