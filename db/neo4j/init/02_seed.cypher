// =============================================================
// Neo4j Enhanced Seed Data – Smart Recruitment System
// Comprehensive Vietnamese market data for AI recommendations
// =============================================================

// Clear existing data (except constraints and indexes)
MATCH (n) DETACH DELETE n;

// ─── CREATE INDUSTRIES ────────────────────────────────────────
MERGE (tech:Industry {name: 'Công nghệ thông tin', description: 'Phần mềm, dịch vụ IT, công nghệ'});
MERGE (finance:Industry {name: 'Tài chính - Ngân hàng', description: 'Ngân hàng, fintech, insurance'});
MERGE (retail:Industry {name: 'Bán lẻ - Thương mại điện tử', description: 'Retail, e-commerce, supply chain'});
MERGE (manufacturing:Industry {name: 'Sản xuất', description: 'Sản xuất công nghiệp, chế tạo'});
MERGE (healthcare:Industry {name: 'Y tế', description: 'Healthcare, pharmaceutical, medical devices'});
MERGE (education:Industry {name: 'Giáo dục - Đào tạo', description: 'Edtech, training, education services'});
MERGE (realestate:Industry {name: 'Bất động sản', description: 'Real estate development, property management'});
MERGE (logistics:Industry {name: 'Logistics - Vận tải', description: 'Logistics, transportation, supply chain'});

// ─── CREATE COMPREHENSIVE SKILLS ──────────────────────────────
// Programming Languages
MERGE (java:Skill {name: 'Java', category: 'Programming Language', popularity: 95});
MERGE (python:Skill {name: 'Python', category: 'Programming Language', popularity: 98});
MERGE (javascript:Skill {name: 'JavaScript', category: 'Programming Language', popularity: 99});
MERGE (typescript:Skill {name: 'TypeScript', category: 'Programming Language', popularity: 85});
MERGE (csharp:Skill {name: 'C#', category: 'Programming Language', popularity: 75});
MERGE (kotlin:Skill {name: 'Kotlin', category: 'Programming Language', popularity: 65});
MERGE (swift:Skill {name: 'Swift', category: 'Programming Language', popularity: 60});
MERGE (go:Skill {name: 'Go', category: 'Programming Language', popularity: 55});
MERGE (php:Skill {name: 'PHP', category: 'Programming Language', popularity: 70});

// Frontend Frameworks
MERGE (react:Skill {name: 'React', category: 'Frontend Framework', popularity: 90});
MERGE (angular:Skill {name: 'Angular', category: 'Frontend Framework', popularity: 65});
MERGE (vue:Skill {name: 'Vue.js', category: 'Frontend Framework', popularity: 60});
MERGE (nextjs:Skill {name: 'Next.js', category: 'Frontend Framework', popularity: 75});

// Backend Frameworks
MERGE (nodejs:Skill {name: 'Node.js', category: 'Backend Framework', popularity: 85});
MERGE (spring:Skill {name: 'Spring Boot', category: 'Backend Framework', popularity: 80});
MERGE (dotnet:Skill {name: '.NET Core', category: 'Backend Framework', popularity: 70});
MERGE (express:Skill {name: 'Express.js', category: 'Backend Framework', popularity: 75});
MERGE (django:Skill {name: 'Django', category: 'Backend Framework', popularity: 60});

// Databases
MERGE (postgresql:Skill {name: 'PostgreSQL', category: 'Database', popularity: 85});
MERGE (mysql:Skill {name: 'MySQL', category: 'Database', popularity: 80});
MERGE (mongodb:Skill {name: 'MongoDB', category: 'Database', popularity: 75});
MERGE (sqlserver:Skill {name: 'SQL Server', category: 'Database', popularity: 65});
MERGE (redis:Skill {name: 'Redis', category: 'Database', popularity: 70});

// Cloud & DevOps
MERGE (aws:Skill {name: 'AWS', category: 'Cloud Platform', popularity: 90});
MERGE (azure:Skill {name: 'Azure', category: 'Cloud Platform', popularity: 70});
MERGE (gcp:Skill {name: 'Google Cloud', category: 'Cloud Platform', popularity: 60});
MERGE (docker:Skill {name: 'Docker', category: 'DevOps', popularity: 85});
MERGE (kubernetes:Skill {name: 'Kubernetes', category: 'DevOps', popularity: 75});
MERGE (terraform:Skill {name: 'Terraform', category: 'DevOps', popularity: 65});
MERGE (jenkins:Skill {name: 'Jenkins', category: 'DevOps', popularity: 60});

// Mobile Development
MERGE (reactnative:Skill {name: 'React Native', category: 'Mobile Development', popularity: 70});
MERGE (flutter:Skill {name: 'Flutter', category: 'Mobile Development', popularity: 65});
MERGE (iosdev:Skill {name: 'iOS Development', category: 'Mobile Development', popularity: 50});
MERGE (androiddev:Skill {name: 'Android Development', category: 'Mobile Development', popularity: 55});

// Data Science & ML
MERGE (pandas:Skill {name: 'Pandas', category: 'Data Science', popularity: 85});
MERGE (numpy:Skill {name: 'NumPy', category: 'Data Science', popularity: 80});
MERGE (scikitlearn:Skill {name: 'Scikit-learn', category: 'Machine Learning', popularity: 75});
MERGE (tensorflow:Skill {name: 'TensorFlow', category: 'Machine Learning', popularity: 65});
MERGE (pytorch:Skill {name: 'PyTorch', category: 'Machine Learning', popularity: 60});
MERGE (apachespark:Skill {name: 'Apache Spark', category: 'Big Data', popularity: 55});

// Web Technologies
MERGE (html:Skill {name: 'HTML5', category: 'Web Technology', popularity: 95});
MERGE (css:Skill {name: 'CSS3', category: 'Web Technology', popularity: 95});
MERGE (restapi:Skill {name: 'REST APIs', category: 'Web Technology', popularity: 90});
MERGE (graphql:Skill {name: 'GraphQL', category: 'Web Technology', popularity: 55});

// Testing
MERGE (jest:Skill {name: 'Jest', category: 'Testing', popularity: 70});
MERGE (junit:Skill {name: 'JUnit', category: 'Testing', popularity: 60});
MERGE (selenium:Skill {name: 'Selenium', category: 'Testing', popularity: 55});

// ─── CREATE SKILL RELATIONSHIPS FOR AI RECOMMENDATIONS ────────
// Programming Language relationships
MERGE (javascript)-[:RELATED_TO {strength: 0.9}]->(typescript);
MERGE (typescript)-[:RELATED_TO {strength: 0.9}]->(javascript);
MERGE (java)-[:RELATED_TO {strength: 0.8}]->(kotlin);
MERGE (kotlin)-[:RELATED_TO {strength: 0.8}]->(java);
MERGE (csharp)-[:RELATED_TO {strength: 0.7}]->(java);

// Framework relationships
MERGE (javascript)-[:RELATED_TO {strength: 0.8}]->(react);
MERGE (javascript)-[:RELATED_TO {strength: 0.8}]->(nodejs);
MERGE (typescript)-[:RELATED_TO {strength: 0.9}]->(react);
MERGE (typescript)-[:RELATED_TO {strength: 0.9}]->(nodejs);
MERGE (java)-[:RELATED_TO {strength: 0.9}]->(spring);
MERGE (csharp)-[:RELATED_TO {strength: 0.9}]->(dotnet);
MERGE (python)-[:RELATED_TO {strength: 0.8}]->(django);

// Database relationships
MERGE (mysql)-[:RELATED_TO {strength: 0.7}]->(postgresql);
MERGE (postgresql)-[:RELATED_TO {strength: 0.7}]->(mysql);

// Cloud/DevOps relationships
MERGE (docker)-[:RELATED_TO {strength: 0.8}]->(kubernetes);
MERGE (kubernetes)-[:RELATED_TO {strength: 0.8}]->(docker);
MERGE (aws)-[:RELATED_TO {strength: 0.7}]->(docker);
MERGE (aws)-[:RELATED_TO {strength: 0.7}]->(kubernetes);

// Data Science relationships
MERGE (python)-[:RELATED_TO {strength: 0.9}]->(pandas);
MERGE (python)-[:RELATED_TO {strength: 0.9}]->(numpy);
MERGE (python)-[:RELATED_TO {strength: 0.8}]->(scikitlearn);
MERGE (python)-[:RELATED_TO {strength: 0.7}]->(tensorflow);

// Mobile relationships
MERGE (javascript)-[:RELATED_TO {strength: 0.7}]->(reactnative);
MERGE (dart:Skill {name: 'Dart', category: 'Programming Language', popularity: 40});
MERGE (dart)-[:RELATED_TO {strength: 0.9}]->(flutter);

// ─── CREATE COMPANIES ─────────────────────────────────────────
// Companies from PostgreSQL seed data
MERGE (techviet:Company {
  id: '22222222-2222-2222-2222-222222222221',
  name: 'TechViet JSC',
  industry: 'Công nghệ Thông tin',
  size: '200-500',
  location: 'TP.HCM',
  rating: 4.5,
  isVerified: true
});

MERGE (fintechvn:Company {
  id: '22222222-2222-2222-2222-222222222222', 
  name: 'FinTech Solutions Vietnam',
  industry: 'Tài chính - Ngân hàng',
  size: '50-200',
  location: 'TP.HCM',
  rating: 4.2,
  isVerified: true
});

MERGE (vincommerce:Company {
  id: '22222222-2222-2222-2222-222222222223',
  name: 'VinCommerce',
  industry: 'Bán lẻ',
  size: '500+',
  location: 'Hà Nội',
  rating: 4.0,
  isVerified: true
});

MERGE (mbbank:Company {
  id: '22222222-2222-2222-2222-222222222224',
  name: 'MB Bank',
  industry: 'Ngân hàng',
  size: '500+',
  location: 'Hà Nội',
  rating: 4.3,
  isVerified: true
});

MERGE (fptsoftware:Company {
  id: '22222222-2222-2222-2222-222222222225',
  name: 'FPT Software',
  industry: 'Công nghệ Thông tin',
  size: '500+',
  location: 'Hà Nội',
  rating: 4.7,
  isVerified: true
});

// Connect companies to industries
MERGE (techviet)-[:BELONGS_TO]->(tech);
MERGE (fintechvn)-[:BELONGS_TO]->(finance);
MERGE (vincommerce)-[:BELONGS_TO]->(retail);
MERGE (mbbank)-[:BELONGS_TO]->(finance);
MERGE (fptsoftware)-[:BELONGS_TO]->(tech);

// ─── CREATE CANDIDATES ───────────────────────────────────────
// Candidates from PostgreSQL seed data with enhanced attributes
MERGE (candidate1:Candidate {
  id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
  userId: '11111111-1111-1111-1111-111111111111',
  fullName: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  location: 'Hà Nội',
  yearsExperience: 5,
  expectedSalaryMin: 35000000,
  expectedSalaryMax: 60000000,
  currency: 'VND',
  isActive: true,
  lastUpdated: datetime()
});

MERGE (candidate2:Candidate {
  id: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
  userId: '22222222-2222-2222-2222-222222222222',
  fullName: 'Trần Thị B',
  email: 'tranthib@example.com',
  location: 'TP.HCM',
  yearsExperience: 3,
  expectedSalaryMin: 25000000,
  expectedSalaryMax: 40000000,
  currency: 'VND',
  isActive: true,
  lastUpdated: datetime()
});

MERGE (candidate3:Candidate {
  id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
  userId: '33333333-3333-3333-3333-333333333333',
  fullName: 'Lê Thị C',
  email: 'lethic@example.com',
  location: 'Đà Nẵng',
  yearsExperience: 7,
  expectedSalaryMin: 45000000,
  expectedSalaryMax: 70000000,
  currency: 'VND',
  isActive: true,
  lastUpdated: datetime()
});

MERGE (candidate4:Candidate {
  id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
  userId: '44444444-4444-4444-4444-444444444444',
  fullName: 'Phạm Văn D',
  email: 'phamd@example.com',
  location: 'Hà Nội',
  yearsExperience: 4,
  expectedSalaryMin: 30000000,
  expectedSalaryMax: 45000000,
  currency: 'VND',
  isActive: true,
  lastUpdated: datetime()
});

MERGE (candidate5:Candidate {
  id: '11111111-1111-1111-1111-111111111112',
  userId: '55555555-5555-5555-5555-555555555555',
  fullName: 'Văn Thị E',
  email: 'vane@example.com',
  location: 'Cần Thơ',
  yearsExperience: 0,
  expectedSalaryMin: 10000000,
  expectedSalaryMax: 18000000,
  currency: 'VND',
  isActive: true,
  lastUpdated: datetime()
});

// ─── CONNECT CANDIDATES TO SKILLS ─────────────────────────────
// Candidate 1: Senior Full-stack Developer
MERGE (candidate1)-[:HAS_SKILL {level: 'Expert', years: 5}]->(javascript);
MERGE (candidate1)-[:HAS_SKILL {level: 'Advanced', years: 4}]->(typescript);
MERGE (candidate1)-[:HAS_SKILL {level: 'Expert', years: 5}]->(react);
MERGE (candidate1)-[:HAS_SKILL {level: 'Advanced', years: 4}]->(nodejs);
MERGE (candidate1)-[:HAS_SKILL {level: 'Advanced', years: 4}]->(express);
MERGE (candidate1)-[:HAS_SKILL {level: 'Intermediate', years: 3}]->(mongodb);
MERGE (candidate1)-[:HAS_SKILL {level: 'Advanced', years: 4}]->(postgresql);
MERGE (candidate1)-[:HAS_SKILL {level: 'Intermediate', years: 3}]->(aws);
MERGE (candidate1)-[:HAS_SKILL {level: 'Intermediate', years: 3}]->(docker);
MERGE (candidate1)-[:HAS_SKILL {level: 'Advanced', years: 5}]->(git:Skill {name: 'Git', category: 'Version Control', popularity: 95});

// Candidate 2: Data Scientist
MERGE (candidate2)-[:HAS_SKILL {level: 'Expert', years: 4}]->(python);
MERGE (candidate2)-[:HAS_SKILL {level: 'Advanced', years: 4}]->(sql:Skill {name: 'SQL', category: 'Database', popularity: 90});
MERGE (candidate2)-[:HAS_SKILL {level: 'Expert', years: 4}]->(pandas);
MERGE (candidate2)-[:HAS_SKILL {level: 'Advanced', years: 4}]->(numpy);
MERGE (candidate2)-[:HAS_SKILL {level: 'Advanced', years: 3}]->(scikitlearn);
MERGE (candidate2)-[:HAS_SKILL {level: 'Intermediate', years: 2}]->(tensorflow);
MERGE (candidate2)-[:HAS_SKILL {level: 'Intermediate', years: 2}]->(pytorch);
MERGE (candidate2)-[:HAS_SKILL {level: 'Intermediate', years: 2}]->(apachespark);
MERGE (candidate2)-[:HAS_SKILL {level: 'Advanced', years: 3}]->(tableau:Skill {name: 'Tableau', category: 'Data Visualization', popularity: 70});
MERGE (candidate2)-[:HAS_SKILL {level: 'Intermediate', years: 2}]->(aws);

// Candidate 3: DevOps Engineer
MERGE (candidate3)-[:HAS_SKILL {level: 'Expert', years: 6}]->(aws);
MERGE (candidate3)-[:HAS_SKILL {level: 'Expert', years: 5}]->(kubernetes);
MERGE (candidate3)-[:HAS_SKILL {level: 'Expert', years: 6}]->(docker);
MERGE (candidate3)-[:HAS_SKILL {level: 'Advanced', years: 4}]->(terraform);
MERGE (candidate3)-[:HAS_SKILL {level: 'Advanced', years: 5}]->(jenkins);
MERGE (candidate3)-[:HAS_SKILL {level: 'Intermediate', years: 3}]->(gitlabci:Skill {name: 'GitLab CI', category: 'DevOps', popularity: 50});
MERGE (candidate3)-[:HAS_SKILL {level: 'Advanced', years: 4}]->(prometheus:Skill {name: 'Prometheus', category: 'Monitoring', popularity: 60});
MERGE (candidate3)-[:HAS_SKILL {level: 'Advanced', years: 4}]->(grafana:Skill {name: 'Grafana', category: 'Monitoring', popularity: 55});
MERGE (candidate3)-[:HAS_SKILL {level: 'Expert', years: 8}]->(linux:Skill {name: 'Linux', category: 'Operating System', popularity: 85});
MERGE (candidate3)-[:HAS_SKILL {level: 'Expert', years: 8}]->(bash:Skill {name: 'Bash', category: 'Scripting', popularity: 80});

// Candidate 4: Mobile Developer
MERGE (candidate4)-[:HAS_SKILL {level: 'Advanced', years: 4}]->(swift);
MERGE (candidate4)-[:HAS_SKILL {level: 'Advanced', years: 3}]->(kotlin);
MERGE (candidate4)-[:HAS_SKILL {level: 'Intermediate', years: 2}]->(reactnative);
MERGE (candidate4)-[:HAS_SKILL {level: 'Beginner', years: 1}]->(flutter);
MERGE (candidate4)-[:HAS_SKILL {level: 'Advanced', years: 4}]->(iosdev);
MERGE (candidate4)-[:HAS_SKILL {level: 'Advanced', years: 3}]->(androiddev);
MERGE (candidate4)-[:HAS_SKILL {level: 'Intermediate', years: 3}]->(firebase:Skill {name: 'Firebase', category: 'Mobile Backend', popularity: 70});
MERGE (candidate4)-[:HAS_SKILL {level: 'Advanced', years: 4}]->(restapi);
MERGE (candidate4)-[:HAS_SKILL {level: 'Advanced', years: 4}]->(git);

// Candidate 5: Junior .NET Developer
MERGE (candidate5)-[:HAS_SKILL {level: 'Intermediate', years: 2}]->(csharp);
MERGE (candidate5)-[:HAS_SKILL {level: 'Intermediate', years: 2}]->(dotnet);
MERGE (candidate5)-[:HAS_SKILL {level: 'Intermediate', years: 1}]->(aspnet:Skill {name: 'ASP.NET', category: 'Web Framework', popularity: 65});
MERGE (candidate5)-[:HAS_SKILL {level: 'Intermediate', years: 1}]->(entityframework:Skill {name: 'Entity Framework', category: 'ORM', popularity: 60});
MERGE (candidate5)-[:HAS_SKILL {level: 'Intermediate', years: 2}]->(sqlserver);
MERGE (candidate5)-[:HAS_SKILL {level: 'Intermediate', years: 3}]->(html);
MERGE (candidate5)-[:HAS_SKILL {level: 'Intermediate', years: 3}]->(css);
MERGE (candidate5)-[:HAS_SKILL {level: 'Beginner', years: 1}]->(javascript);
MERGE (candidate5)-[:HAS_SKILL {level: 'Beginner', years: 1}]->(git);

// ─── CREATE JOBS ──────────────────────────────────────────────
// Jobs from PostgreSQL seed data
MERGE (job1:Job {
  id: '33333333-3333-3333-3333-333333333331',
  title: 'Senior Full-stack Developer (ReactJS/NodeJS)',
  companyId: '22222222-2222-2222-2222-222222222221',
  level: 'Senior',
  jobType: 'Full-time',
  workMode: 'Hybrid',
  location: 'Hà Nội',
  salaryMin: 35000000,
  salaryMax: 60000000,
  currency: 'VND',
  status: 'active',
  deadline: date('2026-05-30'),
  viewCount: 245,
  applicationCount: 18,
  createdAt: datetime()
});

MERGE (job2:Job {
  id: '33333333-3333-3333-3333-333333333332',
  title: 'Data Scientist',
  companyId: '22222222-2222-2222-2222-222222222221',
  level: 'Mid-level',
  jobType: 'Full-time',
  workMode: 'Remote',
  location: 'TP.HCM',
  salaryMin: 25000000,
  salaryMax: 40000000,
  currency: 'VND',
  status: 'active',
  deadline: date('2026-06-15'),
  viewCount: 189,
  applicationCount: 12,
  createdAt: datetime()
});

MERGE (job3:Job {
  id: '33333333-3333-3333-3333-333333333336',
  title: '.NET Developer (Fresher/Junior)',
  companyId: '22222222-2222-2222-2222-222222222225',
  level: 'Fresher/Junior',
  jobType: 'Full-time',
  workMode: 'Hybrid',
  location: 'Hà Nội',
  salaryMin: 10000000,
  salaryMax: 18000000,
  currency: 'VND',
  status: 'active',
  deadline: date('2026-06-05'),
  viewCount: 76,
  applicationCount: 20,
  createdAt: datetime()
});

// Connect jobs to companies
MERGE (job1)-[:POSTED_BY]->(techviet);
MERGE (job2)-[:POSTED_BY]->(techviet);
MERGE (job3)-[:POSTED_BY]->(fptsoftware);

// Connect jobs to required skills
// Job 1: Senior Full-stack Developer
MERGE (job1)-[:REQUIRES_SKILL {required: true, priority: 'high'}]->(javascript);
MERGE (job1)-[:REQUIRES_SKILL {required: true, priority: 'high'}]->(typescript);
MERGE (job1)-[:REQUIRES_SKILL {required: true, priority: 'high'}]->(react);
MERGE (job1)-[:REQUIRES_SKILL {required: true, priority: 'high'}]->(nodejs);
MERGE (job1)-[:REQUIRES_SKILL {required: true, priority: 'medium'}]->(postgresql);
MERGE (job1)-[:REQUIRES_SKILL {required: false, priority: 'medium'}]->(aws);
MERGE (job1)-[:REQUIRES_SKILL {required: false, priority: 'low'}]->(docker);

// Job 2: Data Scientist
MERGE (job2)-[:REQUIRES_SKILL {required: true, priority: 'high'}]->(python);
MERGE (job2)-[:REQUIRES_SKILL {required: true, priority: 'high'}]->(sql);
MERGE (job2)-[:REQUIRES_SKILL {required: true, priority: 'high'}]->(machinelearning:Skill {name: 'Machine Learning', category: 'Data Science', popularity: 85});
MERGE (job2)-[:REQUIRES_SKILL {required: true, priority: 'medium'}]->(pandas);
MERGE (job2)-[:REQUIRES_SKILL {required: true, priority: 'medium'}]->(scikitlearn);
MERGE (job2)-[:REQUIRES_SKILL {required: false, priority: 'low'}]->(tensorflow);
MERGE (job2)-[:REQUIRES_SKILL {required: false, priority: 'low'}]->(pytorch);

// Job 3: .NET Developer
MERGE (job3)-[:REQUIRES_SKILL {required: true, priority: 'high'}]->(csharp);
MERGE (job3)-[:REQUIRES_SKILL {required: true, priority: 'high'}]->(dotnet);
MERGE (job3)-[:REQUIRES_SKILL {required: false, priority: 'medium'}]->(sql);
MERGE (job3)-[:REQUIRES_SKILL {required: false, priority: 'low'}]->(html);
MERGE (job3)-[:REQUIRES_SKILL {required: false, priority: 'low'}]->(css);

// ─── CREATE APPLICATIONS (for AI matching analysis) ───────────
// Applications from PostgreSQL seed data
MERGE (app1:Application {
  id: '44444444-4444-4444-4444-444444444441',
  candidateId: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
  jobId: '33333333-3333-3333-3333-333333333331',
  status: 'interview',
  appliedAt: datetime('2026-04-20T09:30:00'),
  matchScore: 0.92
});

MERGE (app2:Application {
  id: '44444444-4444-4444-4444-444444444444',
  candidateId: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
  jobId: '33333333-3333-3333-3333-333333333332',
  status: 'offered',
  appliedAt: datetime('2026-04-18T11:20:00'),
  matchScore: 0.88
});

MERGE (app3:Application {
  id: '44444444-4444-4444-4444-444444444449',
  candidateId: '11111111-1111-1111-1111-111111111112',
  jobId: '33333333-3333-3333-3333-333333333336',
  status: 'reviewing',
  appliedAt: datetime('2026-04-23T10:00:00'),
  matchScore: 0.75
});

// Connect applications
MERGE (candidate1)-[:APPLIED_TO]->(app1);
MERGE (app1)-[:APPLICATION_FOR]->(job1);
MERGE (candidate2)-[:APPLIED_TO]->(app2);
MERGE (app2)-[:APPLICATION_FOR]->(job2);
MERGE (candidate5)-[:APPLIED_TO]->(app3);
MERGE (app3)-[:APPLICATION_FOR]->(job3);

// ─── CREATE MATCH SCORES FOR AI RECOMMENDATIONS ──────────────
// Calculate and create match relationships between candidates and jobs
// These would normally be calculated by the AI recommendation engine
// For seed data, we'll create some example matches

// Candidate 1 matches with Job 1 (high match)
MERGE (candidate1)-[:MATCHES_JOB {
  matchScore: 0.92,
  scoreBreakdown: {
    skills: 0.95,
    experience: 0.90,
    salary: 0.85,
    location: 1.0,
    jobType: 1.0
  },
  recommended: true,
  lastCalculated: datetime()
}]->(job1);

// Candidate 2 matches with Job 2 (high match)
MERGE (candidate2)-[:MATCHES_JOB {
  matchScore: 0.88,
  scoreBreakdown: {
    skills: 0.92,
    experience: 0.80,
    salary: 0.90,
    location: 0.85,
    jobType: 1.0
  },
  recommended: true,
  lastCalculated: datetime()
}]->(job2);

// Candidate 5 matches with Job 3 (medium match)
MERGE (candidate5)-[:MATCHES_JOB {
  matchScore: 0.75,
  scoreBreakdown: {
    skills: 0.80,
    experience: 0.65,
    salary: 0.85,
    location: 0.70,
    jobType: 1.0
  },
  recommended: true,
  lastCalculated: datetime()
}]->(job3);

// Additional potential matches (for AI recommendation testing)
MERGE (candidate1)-[:MATCHES_JOB {
  matchScore: 0.45,
  scoreBreakdown: {
    skills: 0.30,
    experience: 0.90,
    salary: 0.50,
    location: 0.20,
    jobType: 1.0
  },
  recommended: false,
  lastCalculated: datetime()
}]->(job2);

MERGE (candidate3)-[:MATCHES_JOB {
  matchScore: 0.68,
  scoreBreakdown: {
    skills: 0.85,
    experience: 0.95,
    salary: 0.40,
    location: 0.50,
    jobType: 1.0
  },
  recommended: false,
  lastCalculated: datetime()
}]->(job1);

// ─── CREATE SIMILARITY RELATIONSHIPS ──────────────────────────
// For collaborative filtering recommendations
MERGE (candidate1)-[:SIMILAR_TO {similarityScore: 0.75}]->(candidate3);
MERGE (candidate3)-[:SIMILAR_TO {similarityScore: 0.75}]->(candidate1);
MERGE (candidate1)-[:SIMILAR_TO {similarityScore: 0.60}]->(candidate4);
MERGE (candidate4)-[:SIMILAR_TO {similarityScore: 0.60}]->(candidate1);
MERGE (candidate2)-[:SIMILAR_TO {similarityScore: 0.40}]->(candidate5);
MERGE (candidate5)-[:SIMILAR_TO {similarityScore: 0.40}]->(candidate2);

// ─── SEED COMPLETION MESSAGE ──────────────────────────────────
RETURN '✅ Neo4j enhanced seed data inserted successfully!' AS message,
  COUNT(DISTINCT(c:Candidate)) AS candidates,
  COUNT(DISTINCT(j:Job)) AS jobs,
  COUNT(DISTINCT(s:Skill)) AS skills,
  COUNT(DISTINCT(co:Company)) AS companies,
  COUNT(DISTINCT(i:Industry)) AS industries,
  COUNT(DISTINCT(a:Application)) AS applications;