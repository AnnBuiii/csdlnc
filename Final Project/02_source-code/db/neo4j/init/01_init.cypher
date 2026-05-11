// =============================================================
// Neo4j Init Script – Smart Recruitment System (NV06)
// Graph model: Candidate – Skill – Job – Company – Industry
// Chạy file này qua neo4j-admin hoặc Cypher shell
// =============================================================

// ── Constraints (đảm bảo unique ID) ──────────────────────────

CREATE CONSTRAINT constraint_candidate_id IF NOT EXISTS
  FOR (c:Candidate) REQUIRE c.id IS UNIQUE;

CREATE CONSTRAINT constraint_job_id IF NOT EXISTS
  FOR (j:Job) REQUIRE j.id IS UNIQUE;

CREATE CONSTRAINT constraint_skill_name IF NOT EXISTS
  FOR (s:Skill) REQUIRE s.name IS UNIQUE;

CREATE CONSTRAINT constraint_company_id IF NOT EXISTS
  FOR (co:Company) REQUIRE co.id IS UNIQUE;

CREATE CONSTRAINT constraint_industry_name IF NOT EXISTS
  FOR (i:Industry) REQUIRE i.name IS UNIQUE;

// ── Indexes (tăng tốc WHERE clause) ──────────────────────────

CREATE INDEX idx_candidate_location IF NOT EXISTS
  FOR (c:Candidate) ON (c.location);

CREATE INDEX idx_candidate_experience IF NOT EXISTS
  FOR (c:Candidate) ON (c.yearsExperience);

CREATE INDEX idx_job_status IF NOT EXISTS
  FOR (j:Job) ON (j.status);

CREATE INDEX idx_job_location IF NOT EXISTS
  FOR (j:Job) ON (j.location);

CREATE INDEX idx_job_deadline IF NOT EXISTS
  FOR (j:Job) ON (j.deadline);

CREATE INDEX idx_skill_category IF NOT EXISTS
  FOR (s:Skill) ON (s.category);

// ── Seed: Industries & Skills mẫu ────────────────────────────

MERGE (i1:Industry {name: 'Công nghệ thông tin'});
MERGE (i2:Industry {name: 'Tài chính - Ngân hàng'});
MERGE (i3:Industry {name: 'Bán lẻ - Thương mại điện tử'});
MERGE (i4:Industry {name: 'Sản xuất'});
MERGE (i5:Industry {name: 'Y tế'});

MERGE (s1:Skill  {name: 'Java',         category: 'Backend'});
MERGE (s2:Skill  {name: 'Spring Boot',  category: 'Backend'});
MERGE (s3:Skill  {name: 'Python',       category: 'Backend'});
MERGE (s4:Skill  {name: 'Node.js',      category: 'Backend'});
MERGE (s5:Skill  {name: 'React',        category: 'Frontend'});
MERGE (s6:Skill  {name: 'PostgreSQL',   category: 'Database'});
MERGE (s7:Skill  {name: 'MongoDB',      category: 'Database'});
MERGE (s8:Skill  {name: 'Docker',       category: 'DevOps'});
MERGE (s9:Skill  {name: 'Kubernetes',   category: 'DevOps'});
MERGE (s10:Skill {name: 'AWS',          category: 'Cloud'});

// Kỹ năng liên quan nhau (dùng cho gợi ý mở rộng)
MERGE (s1)-[:RELATED_TO]->(s2);   // Java → Spring Boot
MERGE (s8)-[:RELATED_TO]->(s9);   // Docker → Kubernetes
MERGE (s6)-[:RELATED_TO]->(s7);   // PostgreSQL → MongoDB
