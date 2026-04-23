# Smart Recruitment System - Seed Data Guide

## Overview

This project includes comprehensive seed data for all 5 databases in the polyglot persistence architecture:
- **PostgreSQL**: Relational data (users, candidates, companies, jobs, applications, interviews)
- **MongoDB**: Document data (detailed candidate profiles, job postings, company reviews)
- **Neo4j**: Graph data (skills, relationships, AI recommendations)
- **Cassandra**: Time-series analytics (user activity, search history, notifications)
- **Redis**: Already configured for caching/sessions

## Seed Data Summary

### 👥 **Users & Candidates**
- **5 candidates** with realistic Vietnamese profiles
- **5 recruiters** from different companies
- **1 admin** user
- Each candidate has detailed information (experience, education, skills, preferences)

### 🏢 **Companies**
- **5 companies** from different industries (Tech, Finance, Retail, Banking, Software)
- Real Vietnamese company names and locations
- Company ratings and verification status

### 💼 **Job Postings**
- **10 active job postings** with detailed requirements
- Various levels (Fresher, Junior, Mid-level, Senior)
- Different work modes (Onsite, Hybrid, Remote)
- Salary ranges in VND for Vietnamese market

### 📝 **Applications & Interviews**
- **9 job applications** with various statuses
- **5 scheduled interviews** with different rounds and types
- Realistic application timeline (submitted → reviewing → interview → offered)

### 🛠️ **Skills & Technologies**
- **50+ technology skills** across different categories
- Skill relationships for AI recommendations
- Popularity scores for each skill

### 📊 **Analytics Data**
- User activity logs for past 7 days
- Search history for AI improvement
- Notifications and engagement tracking

## How to Use Seed Data

### Option 1: Run All Databases (Recommended)

From the project root:

```bash
# Make sure Docker containers are running
docker ps | grep srs

# Navigate to backend and run seed
cd backend
npm run seed
# or
node scripts/seed.js
```

### Option 2: Seed Individual Databases

```bash
cd backend

# Seed everything
npm run seed:all

# Seed only PostgreSQL
npm run seed:pg

# Seed only MongoDB
npm run seed:mongo

# Seed only Neo4j
npm run seed:neo4j

# Seed only Cassandra
npm run seed:cassandra

# Force seed even if data exists
node scripts/seed.js --force
```

### Option 3: Manual Database Commands

If you prefer to work directly with the databases:

**PostgreSQL:**
```bash
docker exec -i srs-postgres psql -U postgres -d srs_postgres -f db/postgres/init/02_seed.sql
```

**MongoDB:**
```bash
docker exec -i srs-mongo mongo srs_mongo db/mongo/init/02_seed.js
```

**Neo4j:**
```bash
docker exec -i srs-neo4j cypher-shell --username neo4j --password password --format plain < db/neo4j/init/02_seed.cypher
```

**Cassandra:**
```bash
docker exec -i srs-cassandra cqlsh -f db/cassandra/init/02_seed.cql
```

## Seed Data Files

### PostgreSQL (`db/postgres/init/02_seed.sql`)
- Creates all relational tables with foreign key relationships
- Inserts users, candidates, companies, jobs, applications, interviews
- Includes denormalized candidate profiles for performance
- Creates materialized views for analytics

### MongoDB (`db/mongo/init/02_seed.js`)
- Creates detailed candidate profiles with skills, experience, education
- Creates rich job postings with full descriptions and requirements
- Adds company reviews with ratings and feedback
- Sets up full-text search indexes for Vietnamese text

### Neo4j (`db/neo4j/init/02_seed.cypher`)
- Creates comprehensive skill graph with 50+ skills
- Establishes relationships between skills (RELATED_TO)
- Connects candidates to their skills (HAS_SKILL)
- Connects jobs to required skills (REQUIRES_SKILL)
- Calculates match scores for AI recommendations
- Creates similarity relationships for collaborative filtering

### Cassandra (`db/cassandra/init/02_seed.cql`)
- Logs user activities (logins, searches, views, applications)
- Creates search history for AI recommendation improvement
- Tracks notifications for user engagement analytics
- Uses appropriate data models for time-series queries

## Sample Data Preview

### Candidate 1: Nguyễn Văn A
- **Role**: Senior Full-stack Developer
- **Experience**: 5 years
- **Skills**: JavaScript, TypeScript, React, Node.js, PostgreSQL, AWS
- **Salary**: 35-60 million VND
- **Location**: Hà Nội
- **Applications**: Applied to 3 jobs, 1 interview scheduled

### Company: TechViet JSC
- **Industry**: Công nghệ Thông tin
- **Size**: 200-500 employees
- **Location**: TP.HCM
- **Rating**: 4.5/5
- **Jobs**: Senior Full-stack Developer, Data Scientist

### Job: Senior Full-stack Developer (ReactJS/NodeJS)
- **Company**: TechViet JSC
- **Location**: Hà Nội (Hybrid)
- **Salary**: 35-60 million VND
- **Requirements**: 5+ years, React, Node.js, TypeScript, PostgreSQL
- **Status**: Active (18 applications received)
- **Deadline**: 2026-05-30

## Verifying Seed Data

### PostgreSQL Verification:
```bash
docker exec srs-postgres psql -U postgres -d srs_postgres -c "SELECT 'Users:' as table, COUNT(*) FROM users UNION ALL SELECT 'Candidates:', COUNT(*) FROM candidates UNION ALL SELECT 'Companies:', COUNT(*) FROM companies UNION ALL SELECT 'Jobs:', COUNT(*) FROM job_postings UNION ALL SELECT 'Applications:', COUNT(*) FROM applications UNION ALL SELECT 'Interviews:', COUNT(*) FROM interviews;"
```

### MongoDB Verification:
```bash
docker exec srs-mongo mongo srs_mongo --eval "print('Candidate Profiles: ' + db.candidate_profiles.count()); print('Job Postings: ' + db.job_postings.count()); print('Company Reviews: ' + db.company_reviews.count());"
```

### Neo4j Verification:
```bash
docker exec srs-neo4j cypher-shell --username neo4j --password password "MATCH (c:Candidate) RETURN 'Candidates:' AS label, COUNT(c) AS count UNION ALL MATCH (j:Job) RETURN 'Jobs:' AS label, COUNT(j) AS count UNION ALL MATCH (s:Skill) RETURN 'Skills:' AS label, COUNT(s) AS count;"
```

### Cassandra Verification:
```bash
docker exec srs-cassandra cqlsh -e "USE srs_events; SELECT COUNT(*) FROM user_activity_log; SELECT COUNT(*) FROM search_history; SELECT COUNT(*) FROM notification_log;"
```

## Data Relationships

```
PostgreSQL (Relational)
├── users (base authentication)
├── candidates (linked to users)
├── companies (linked to users)
├── job_postings (linked to companies)
├── applications (candidates → jobs)
└── interviews (applications → candidates)

MongoDB (Document)
├── candidate_profiles (detailed profiles)
├── job_postings (rich content + search)
└── company_reviews (ratings + feedback)

Neo4j (Graph)
├── Candidates -[HAS_SKILL]-> Skills
├── Jobs -[REQUIRES_SKILL]-> Skills
├── Skills -[RELATED_TO]-> Skills
└── Candidates -[MATCHES_JOB]-> Jobs (AI recommendations)

Cassandra (Time-series)
├── user_activity_log (event tracking)
├── search_history (AI improvement)
└── notification_log (engagement tracking)
```

## Resetting Seed Data

To clear all seed data and start fresh:

```bash
cd backend
node scripts/seed.js --force
```

Or manually:

```bash
# PostgreSQL
docker exec srs-postgres psql -U postgres -d srs_postgres -c "TRUNCATE interviews, applications, candidate_profiles, job_postings, companies, candidates, users RESTART IDENTITY CASCADE;"

# MongoDB
docker exec srs-mongo mongo srs_mongo --eval "db.candidate_profiles.deleteMany({}); db.job_postings.deleteMany({}); db.company_reviews.deleteMany({});"

# Neo4j
docker exec srs-neo4j cypher-shell --username neo4j --password password "MATCH (n) DETACH DELETE n;"

# Cassandra (Note: counter tables cannot be truncated)
docker exec srs-cassandra cqlsh -e "USE srs_events; TRUNCATE user_activity_log; TRUNCATE search_history; TRUNCATE notification_log;"
```

## Development Notes

1. **Realistic Vietnamese Data**: All data is localized for the Vietnamese job market
2. **Consistent IDs**: Same UUIDs used across all databases for relationships
3. **AI-Ready**: Data structured for AI recommendation algorithms (NV06)
4. **Performance Optimized**: Includes appropriate indexes and materialized views
5. **Time-Series Ready**: Historical data for analytics dashboards (NV10)

## Troubleshooting

**"Container not found" error:**
```bash
# Start all containers
docker-compose up -d
# or
docker start srs-postgres srs-mongo srs-neo4j srs-cassandra srs-redis
```

**"Connection refused" error:**
- Wait 10-15 seconds after starting containers
- Check if containers are healthy: `docker ps | grep srs`
- Verify ports are not in use

**"Already has data" warning:**
- Use `--force` flag to override existing data
- Or manually clear data using reset commands above

**Database-specific issues:**
- PostgreSQL: Check if schema exists (`01_schema.sql` should run first)
- MongoDB: Verify database name (`srs_mongo`)
- Neo4j: Default password is `password`
- Cassandra: Keyspace `srs_events` should be created automatically

## Next Steps After Seeding

1. **Start the backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Test API endpoints** with the seed data
3. **Explore the data** using the verification queries above
4. **Run AI recommendations** with the skill graph in Neo4j
5. **Check analytics** in the Cassandra time-series data

## Support

For issues with seed data:
- Check the seed script output for errors
- Verify Docker containers are running
- Check database connection strings in `.env`
- Review individual seed files for SQL/CQL/Cypher syntax

The seed data provides a complete development environment with realistic Vietnamese market data for building and testing all features of the Smart Recruitment System.