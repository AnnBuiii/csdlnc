#!/usr/bin/env node

/**
 * Smart Recruitment System - Database Seed Runner
 * 
 * This script seeds all databases (PostgreSQL, MongoDB, Neo4j) with realistic Vietnamese data.
 * Usage: node scripts/seed.js [--all | --postgres | --mongo | --neo4j]
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const envPath = path.join(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else {
  require('dotenv').config();
}

const POSTGRES_USER = process.env.POSTGRES_USER || 'srs_user';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'srs_password';
const POSTGRES_DB = process.env.POSTGRES_DB || 'srs_db';
const MONGO_ROOT_USER = process.env.MONGO_ROOT_USER || 'srs_admin';
const MONGO_ROOT_PASSWORD = process.env.MONGO_ROOT_PASSWORD || 'srs_mongo_pass';
const MONGO_DB = process.env.MONGO_DB || 'srs_mongo';
const NEO4J_USER = process.env.NEO4J_USER || 'neo4j';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || 'srs_neo4j_pass';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// ASCII art banner
const banner = `
${colors.cyan}╔══════════════════════════════════════════════════════════════╗
║  ${colors.bright}Smart Recruitment System - Database Seeding Tool${colors.reset}${colors.cyan}  ║
║                    ${colors.yellow}Vietnamese Market Data${colors.reset}${colors.cyan}                     ║
╚══════════════════════════════════════════════════════════════╝${colors.reset}
`;

console.log(banner);

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  all: args.includes('--all'),
  postgres: args.includes('--postgres') || args.includes('--pg'),
  mongo: args.includes('--mongo') || args.includes('--mongodb'),
  neo4j: args.includes('--neo4j'),
  help: args.includes('--help') || args.includes('-h'),
  force: args.includes('--force') || args.includes('-f')
};

// If no specific option is provided, seed all databases
if (!options.all && !options.postgres && !options.mongo && !options.neo4j) {
  options.all = true;
}

// Show help
if (options.help) {
  console.log(`${colors.bright}Usage:${colors.reset} node scripts/seed.js [options]
  
${colors.bright}Options:${colors.reset}
  --all, -a         Seed all databases (default)
  --postgres, --pg  Seed PostgreSQL only
  --mongo           Seed MongoDB only
  --neo4j           Seed Neo4j only
  --force, -f       Force seed even if databases are not empty
  --help, -h        Show this help message

${colors.bright}Examples:${colors.reset}
  node scripts/seed.js                     # Seed all databases
  node scripts/seed.js --postgres --mongo  # Seed PostgreSQL and MongoDB
  node scripts/seed.js --force             # Force seed all databases

${colors.bright}Note:${colors.reset}
  - Make sure Docker containers are running
  - PostgreSQL seed script: db/postgres/init/02_seed.sql
  - MongoDB seed script: db/mongo/init/02_seed.js
  - Neo4j seed script: db/neo4j/init/02_seed.cypher
`);
  process.exit(0);
}

console.log(`${colors.yellow}🔍 Checking environment and dependencies...${colors.reset}`);

// Check if Docker is running
try {
  execSync('docker ps', { stdio: 'pipe' });
  console.log(`${colors.green}✅ Docker is running${colors.reset}`);
} catch (error) {
  console.log(`${colors.red}❌ Docker is not running or not installed${colors.reset}`);
  console.log(`${colors.yellow}Please start Docker before running seed script${colors.reset}`);
  process.exit(1);
}

// Base directory
const baseDir = path.join(__dirname, '../..');

// Utility functions
function runCommand(command, description) {
  console.log(`${colors.blue}⚡ ${description}...${colors.reset}`);
  try {
    const output = execSync(command, { cwd: baseDir, stdio: 'pipe', encoding: 'utf8' });
    console.log(`${colors.green}✅ ${description} completed${colors.reset}`);
    return { success: true, output };
  } catch (error) {
    console.log(`${colors.red}❌ ${description} failed${colors.reset}`);
    console.log(`${colors.yellow}Error: ${error.message}${colors.reset}`);
    if (error.stdout) console.log(`${colors.yellow}STDOUT: ${error.stdout}${colors.reset}`);
    if (error.stderr) console.log(`${colors.yellow}STDERR: ${error.stderr}${colors.reset}`);
    return { success: false, error };
  }
}

function checkDatabaseConnection(dbType, checkCommand) {
  console.log(`${colors.blue}🔍 Checking ${dbType} connection...${colors.reset}`);
  try {
    execSync(checkCommand, { stdio: 'pipe' });
    console.log(`${colors.green}✅ ${dbType} connection successful${colors.reset}`);
    return true;
  } catch (error) {
    console.log(`${colors.red}❌ ${dbType} connection failed${colors.reset}`);
    console.log(`${colors.yellow}Make sure the ${dbType} container is running${colors.reset}`);
    return false;
  }
}

async function seedPostgreSQL() {
  console.log(`\n${colors.cyan}══════════════ PostgreSQL Seeding ══════════════${colors.reset}`);
  
  // Check PostgreSQL connection
  if (!checkDatabaseConnection('PostgreSQL', `docker compose exec postgres pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}`)) {
    return false;
  }
  
  // Check if database already has data
  if (!options.force) {
    try {
      const checkData = execSync(
        `docker compose exec postgres psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -c "SELECT COUNT(*) FROM users;"`,
        { stdio: 'pipe', encoding: 'utf8' }
      );
      const count = parseInt(checkData.match(/\d+/)?.[0] || '0');
      if (count > 0) {
        console.log(`${colors.yellow}⚠️  PostgreSQL already has data (${count} users). Use --force to re-seed.${colors.reset}`);
        return true;
      }
    } catch (error) {
      // Database might not exist yet, continue with seeding
    }
  }
  
  // Run PostgreSQL seed script
  const seedFile = 'db/postgres/init/02_seed.sql';
  const result = runCommand(
    `docker compose exec -i postgres psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -f - < ${seedFile}`,
    'Running PostgreSQL seed script'
  );
  
  if (result.success) {
    console.log(`${colors.green}🎉 PostgreSQL seeded successfully!${colors.reset}`);
    return true;
  }
  
  return false;
}

async function seedMongoDB() {
  console.log(`\n${colors.cyan}══════════════ MongoDB Seeding ═══════════════${colors.reset}`);
  
  // Check MongoDB connection
  if (!checkDatabaseConnection('MongoDB', `docker compose exec mongo mongosh --username ${MONGO_ROOT_USER} --password ${MONGO_ROOT_PASSWORD} --authenticationDatabase admin --eval "db.adminCommand('ping')"`)) {
    return false;
  }
  
  // Run MongoDB seed script
  const seedFile = 'db/mongo/init/02_seed.js';
  const result = runCommand(
    `docker compose exec -i mongo mongosh \
      --username ${MONGO_ROOT_USER} \
      --password ${MONGO_ROOT_PASSWORD} \
      --authenticationDatabase admin \
      ${MONGO_DB} < ${seedFile}`,
    'Running MongoDB seed script'
  );
  
  if (result.success) {
    console.log(`${colors.green}🎉 MongoDB seeded successfully!${colors.reset}`);
    return true;
  }
  
  return false;
}

async function seedNeo4j() {
  console.log(`\n${colors.cyan}══════════════ Neo4j Seeding ═════════════════${colors.reset}`);
  
  // Check Neo4j connection
  if (!checkDatabaseConnection('Neo4j', `docker compose exec neo4j cypher-shell --username ${NEO4J_USER} --password ${NEO4J_PASSWORD} "RETURN 1;"`)) {
    return false;
  }
  
  // Run Neo4j seed script
  const seedFile = 'db/neo4j/init/02_seed.cypher';
  const result = runCommand(
    `docker compose exec -i neo4j cypher-shell --username ${NEO4J_USER} --password ${NEO4J_PASSWORD} --format plain < ${seedFile}`,
    'Running Neo4j seed script'
  );
  
  if (result.success) {
    console.log(`${colors.green}🎉 Neo4j seeded successfully!${colors.reset}`);
    return true;
  }
  
  return false;
}

// Main seeding function
async function runSeeding() {
  const results = {
    postgres: { success: false, message: 'Skipped' },
    mongo: { success: false, message: 'Skipped' },
    neo4j: { success: false, message: 'Skipped' },
  };
  
  const totalStartTime = Date.now();
  
  try {
    // Start Docker containers if not running
    console.log(`${colors.yellow}🔧 Starting Docker containers if needed...${colors.reset}`);
    runCommand('docker compose up -d postgres mongo neo4j', 'Starting database containers');
    
    // Wait for containers to be ready
    console.log(`${colors.yellow}⏳ Waiting for databases to be ready...${colors.reset}`);
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Seed databases based on options
    if (options.all || options.postgres) {
      results.postgres = await seedPostgreSQL() 
        ? { success: true, message: 'Seeded successfully' }
        : { success: false, message: 'Failed' };
    }
    
    if (options.all || options.mongo) {
      results.mongo = await seedMongoDB()
        ? { success: true, message: 'Seeded successfully' }
        : { success: false, message: 'Failed' };
    }
    
    if (options.all || options.neo4j) {
      results.neo4j = await seedNeo4j()
        ? { success: true, message: 'Seeded successfully' }
        : { success: false, message: 'Failed' };
    }

  } catch (error) {
    console.log(`${colors.red}❌ Unexpected error: ${error.message}${colors.reset}`);
  }
  
  const totalTime = ((Date.now() - totalStartTime) / 1000).toFixed(2);
  
  // Print summary
  console.log(`\n${colors.cyan}══════════════ Seeding Summary ══════════════${colors.reset}`);
  console.log(`${colors.bright}Total time: ${totalTime}s${colors.reset}\n`);
  
  Object.entries(results).forEach(([db, result]) => {
    const icon = result.success ? `${colors.green}✅` : `${colors.red}❌`;
    const status = result.success ? `${colors.green}${result.message}` : `${colors.red}${result.message}`;
    console.log(`${icon} ${db.padEnd(10)} ${status}${colors.reset}`);
  });
  
  const successCount = Object.values(results).filter(r => r.success).length;
  const totalCount = Object.values(results).filter(r => r.message !== 'Skipped').length;
  
  console.log(`\n${colors.bright}🎯 Result: ${successCount}/${totalCount} databases seeded successfully${colors.reset}`);
  
  if (successCount === totalCount) {
    console.log(`\n${colors.green}✨ All selected databases seeded successfully!${colors.reset}`);
    console.log(`\n${colors.cyan}══════════════ Next Steps ═══════════════${colors.reset}`);
    console.log(`${colors.yellow}1.${colors.reset} Start the backend server: ${colors.blue}cd backend && npm run dev${colors.reset}`);
    console.log(`${colors.yellow}2.${colors.reset} Test the API with the seed data`);
    console.log(`${colors.yellow}3.${colors.reset} Check the data in each database`);
  } else {
    console.log(`\n${colors.red}⚠️  Some databases failed to seed. Check the logs above.${colors.reset}`);
  }
  
  // Show data statistics
  if (successCount > 0) {
    console.log(`\n${colors.cyan}══════════════ Data Statistics ═══════════════${colors.reset}`);
    console.log(`${colors.bright}Seeded data includes:${colors.reset}`);
    console.log(`${colors.yellow}•${colors.reset} 5 users (candidates, recruiters, admin)`);
    console.log(`${colors.yellow}•${colors.reset} 5 candidates with detailed profiles`);
    console.log(`${colors.yellow}•${colors.reset} 5 companies in various industries`);
    console.log(`${colors.yellow}•${colors.reset} 10 job postings with requirements`);
    console.log(`${colors.yellow}•${colors.reset} 9 job applications with various statuses`);
    console.log(`${colors.yellow}•${colors.reset} 5 scheduled interviews`);
    console.log(`${colors.yellow}•${colors.reset} 50+ technology skills with relationships`);
    console.log(`${colors.yellow}•${colors.reset} User activity logs and search history`);
    console.log(`${colors.yellow}•${colors.reset} Company reviews and ratings`);
  }
}

// Run the seeding process
runSeeding().catch(error => {
  console.log(`${colors.red}❌ Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log(`\n${colors.yellow}⚠️  Seeding interrupted by user${colors.reset}`);
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(`\n${colors.yellow}⚠️  Seeding terminated${colors.reset}`);
  process.exit(0);
});