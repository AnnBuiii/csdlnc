const mongoose = require('mongoose');
const logger = require('./logger');

async function connectMongo() {
  mongoose.set('strictQuery', false);

  await mongoose.connect(process.env.MONGO_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  logger.info('✅ MongoDB connected');
}

function getMongo() {
  return mongoose.connection.db;
}

module.exports = { connectMongo, getMongo };
