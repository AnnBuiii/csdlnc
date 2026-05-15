// =============================================================
// Neo4j Seed Data – Smart Recruitment System (SRS)
// AI-powered graph for job-candidate matching & recommendations
// All UUIDs match PostgreSQL + MongoDB seeds
// =============================================================

// Clear all existing nodes and relationships
MATCH (n) DETACH DELETE n;

// ─── SKILL TAXONOMY ───────────────────────────────────────────

// Programming Languages
MERGE (js:Skill     {name: 'JavaScript',  category: 'Programming Language', popularity: 99});
MERGE (ts:Skill     {name: 'TypeScript',  category: 'Programming Language', popularity: 87});
MERGE (python:Skill {name: 'Python',      category: 'Programming Language', popularity: 98});
MERGE (java:Skill   {name: 'Java',        category: 'Programming Language', popularity: 93});
MERGE (csharp:Skill {name: 'C#',          category: 'Programming Language', popularity: 76});
MERGE (kotlin:Skill {name: 'Kotlin',      category: 'Programming Language', popularity: 67});
MERGE (swift:Skill  {name: 'Swift',       category: 'Programming Language', popularity: 62});
MERGE (go:Skill     {name: 'Go',          category: 'Programming Language', popularity: 58});
MERGE (php:Skill    {name: 'PHP',         category: 'Programming Language', popularity: 68});
MERGE (dart:Skill   {name: 'Dart',        category: 'Programming Language', popularity: 42});
MERGE (r:Skill      {name: 'R',           category: 'Programming Language', popularity: 55});

// Frontend Frameworks
MERGE (react:Skill   {name: 'React',   category: 'Frontend Framework', popularity: 92});
MERGE (nextjs:Skill  {name: 'Next.js', category: 'Frontend Framework', popularity: 78});
MERGE (vue:Skill     {name: 'Vue.js',  category: 'Frontend Framework', popularity: 62});
MERGE (angular:Skill {name: 'Angular', category: 'Frontend Framework', popularity: 65});

// Backend Frameworks
MERGE (nodejs:Skill  {name: 'Node.js',     category: 'Backend Framework', popularity: 87});
MERGE (express:Skill {name: 'Express.js',  category: 'Backend Framework', popularity: 78});
MERGE (spring:Skill  {name: 'Spring Boot', category: 'Backend Framework', popularity: 82});
MERGE (dotnet:Skill  {name: '.NET Core',   category: 'Backend Framework', popularity: 72});
MERGE (aspnet:Skill  {name: 'ASP.NET',     category: 'Backend Framework', popularity: 67});
MERGE (django:Skill  {name: 'Django',      category: 'Backend Framework', popularity: 60});

// Databases
MERGE (postgresql:Skill {name: 'PostgreSQL', category: 'Database', popularity: 86});
MERGE (mysql:Skill      {name: 'MySQL',      category: 'Database', popularity: 82});
MERGE (mongodb:Skill    {name: 'MongoDB',    category: 'Database', popularity: 77});
MERGE (sqlserver:Skill  {name: 'SQL Server', category: 'Database', popularity: 68});
MERGE (redis:Skill      {name: 'Redis',      category: 'Database', popularity: 73});
MERGE (sql:Skill        {name: 'SQL',        category: 'Database', popularity: 91});

// Cloud & DevOps
MERGE (aws:Skill        {name: 'AWS',              category: 'Cloud Platform', popularity: 91});
MERGE (azure:Skill      {name: 'Azure',            category: 'Cloud Platform', popularity: 72});
MERGE (gcp:Skill        {name: 'Google Cloud',     category: 'Cloud Platform', popularity: 63});
MERGE (docker:Skill     {name: 'Docker',           category: 'DevOps',         popularity: 87});
MERGE (kubernetes:Skill {name: 'Kubernetes',       category: 'DevOps',         popularity: 78});
MERGE (terraform:Skill  {name: 'Terraform',        category: 'DevOps',         popularity: 67});
MERGE (jenkins:Skill    {name: 'Jenkins',          category: 'DevOps',         popularity: 63});
MERGE (gitlabci:Skill   {name: 'GitLab CI',        category: 'DevOps',         popularity: 55});
MERGE (argocd:Skill     {name: 'ArgoCD',           category: 'DevOps',         popularity: 48});
MERGE (ansible:Skill    {name: 'Ansible',          category: 'DevOps',         popularity: 57});
MERGE (prometheus:Skill {name: 'Prometheus',       category: 'Monitoring',     popularity: 62});
MERGE (grafana:Skill    {name: 'Grafana',          category: 'Monitoring',     popularity: 59});
MERGE (linux:Skill      {name: 'Linux',            category: 'OS',             popularity: 87});
MERGE (bash:Skill       {name: 'Bash',             category: 'Scripting',      popularity: 82});
MERGE (git:Skill        {name: 'Git',              category: 'Version Control', popularity: 97});

// Mobile Development
MERGE (ios:Skill         {name: 'iOS Development',     category: 'Mobile', popularity: 53});
MERGE (android:Skill     {name: 'Android Development', category: 'Mobile', popularity: 58});
MERGE (reactnative:Skill {name: 'React Native',        category: 'Mobile', popularity: 72});
MERGE (flutter:Skill     {name: 'Flutter',             category: 'Mobile', popularity: 67});
MERGE (firebase:Skill    {name: 'Firebase',            category: 'Mobile Backend', popularity: 72});
MERGE (fastlane:Skill    {name: 'Fastlane',            category: 'Mobile CI/CD',   popularity: 42});

// Data Science & ML
MERGE (pandas:Skill      {name: 'Pandas',        category: 'Data Science',    popularity: 87});
MERGE (numpy:Skill       {name: 'NumPy',         category: 'Data Science',    popularity: 83});
MERGE (sklearn:Skill     {name: 'Scikit-learn',  category: 'Machine Learning', popularity: 78});
MERGE (xgboost:Skill     {name: 'XGBoost',       category: 'Machine Learning', popularity: 65});
MERGE (tensorflow:Skill  {name: 'TensorFlow',    category: 'Machine Learning', popularity: 68});
MERGE (pytorch:Skill     {name: 'PyTorch',       category: 'Machine Learning', popularity: 63});
MERGE (spark:Skill       {name: 'Apache Spark',  category: 'Big Data',         popularity: 57});
MERGE (sagemaker:Skill   {name: 'AWS SageMaker', category: 'MLOps',            popularity: 48});
MERGE (tableau:Skill     {name: 'Tableau',       category: 'Visualization',    popularity: 72});
MERGE (llm:Skill         {name: 'LLM/Transformers', category: 'AI',           popularity: 85});
MERGE (mlops:Skill       {name: 'MLOps',            category: 'AI',           popularity: 60});
MERGE (ml:Skill          {name: 'Machine Learning',  category: 'AI',          popularity: 88});

// Web Technologies
MERGE (html:Skill    {name: 'HTML',      category: 'Web Technology', popularity: 96});
MERGE (css:Skill     {name: 'CSS',       category: 'Web Technology', popularity: 95});
MERGE (restapi:Skill {name: 'REST APIs', category: 'Web Technology', popularity: 92});
MERGE (graphql:Skill {name: 'GraphQL',   category: 'Web Technology', popularity: 58});

// Testing
MERGE (jest:Skill      {name: 'Jest',       category: 'Testing', popularity: 72});
MERGE (selenium:Skill  {name: 'Selenium',   category: 'Testing', popularity: 58});
MERGE (playwright:Skill {name: 'Playwright', category: 'Testing', popularity: 52});
MERGE (ef:Skill         {name: 'Entity Framework', category: 'ORM', popularity: 62});
MERGE (linq:Skill       {name: 'LINQ',       category: 'ORM', popularity: 55});

// ─── SKILL RELATIONSHIPS (for AI recommendation graph) ────────

// Language → Framework relationships
MERGE (js)-[:RELATED_TO {strength: 0.95}]->(ts);
MERGE (ts)-[:RELATED_TO {strength: 0.95}]->(js);
MERGE (js)-[:RELATED_TO {strength: 0.90}]->(react);
MERGE (ts)-[:RELATED_TO {strength: 0.90}]->(react);
MERGE (js)-[:RELATED_TO {strength: 0.85}]->(nodejs);
MERGE (ts)-[:RELATED_TO {strength: 0.85}]->(nodejs);
MERGE (js)-[:RELATED_TO {strength: 0.75}]->(reactnative);
MERGE (js)-[:RELATED_TO {strength: 0.80}]->(express);
MERGE (java)-[:RELATED_TO {strength: 0.90}]->(spring);
MERGE (java)-[:RELATED_TO {strength: 0.75}]->(kotlin);
MERGE (kotlin)-[:RELATED_TO {strength: 0.75}]->(java);
MERGE (csharp)-[:RELATED_TO {strength: 0.92}]->(dotnet);
MERGE (csharp)-[:RELATED_TO {strength: 0.85}]->(aspnet);
MERGE (csharp)-[:RELATED_TO {strength: 0.70}]->(ef);
MERGE (csharp)-[:RELATED_TO {strength: 0.65}]->(linq);
MERGE (python)-[:RELATED_TO {strength: 0.88}]->(pandas);
MERGE (python)-[:RELATED_TO {strength: 0.85}]->(numpy);
MERGE (python)-[:RELATED_TO {strength: 0.80}]->(sklearn);
MERGE (python)-[:RELATED_TO {strength: 0.72}]->(tensorflow);
MERGE (python)-[:RELATED_TO {strength: 0.70}]->(pytorch);
MERGE (python)-[:RELATED_TO {strength: 0.65}]->(spark);
MERGE (python)-[:RELATED_TO {strength: 0.62}]->(django);
MERGE (dart)-[:RELATED_TO {strength: 0.92}]->(flutter);
MERGE (swift)-[:RELATED_TO {strength: 0.88}]->(ios);
MERGE (kotlin)-[:RELATED_TO {strength: 0.88}]->(android);

// DevOps relationships
MERGE (docker)-[:RELATED_TO {strength: 0.85}]->(kubernetes);
MERGE (kubernetes)-[:RELATED_TO {strength: 0.85}]->(docker);
MERGE (aws)-[:RELATED_TO {strength: 0.75}]->(docker);
MERGE (aws)-[:RELATED_TO {strength: 0.72}]->(kubernetes);
MERGE (aws)-[:RELATED_TO {strength: 0.68}]->(terraform);
MERGE (kubernetes)-[:RELATED_TO {strength: 0.70}]->(argocd);
MERGE (prometheus)-[:RELATED_TO {strength: 0.85}]->(grafana);
MERGE (grafana)-[:RELATED_TO {strength: 0.85}]->(prometheus);

// Data relationships
MERGE (ml)-[:RELATED_TO {strength: 0.80}]->(sklearn);
MERGE (ml)-[:RELATED_TO {strength: 0.75}]->(tensorflow);
MERGE (ml)-[:RELATED_TO {strength: 0.75}]->(pytorch);
MERGE (llm)-[:RELATED_TO {strength: 0.85}]->(pytorch);
MERGE (mlops)-[:RELATED_TO {strength: 0.72}]->(sagemaker);
MERGE (mlops)-[:RELATED_TO {strength: 0.70}]->(docker);

// ─── INDUSTRIES ───────────────────────────────────────────────
MERGE (tech:Industry     {name: 'Công nghệ Thông tin',   description: 'Software, IT services, digital'});
MERGE (finance:Industry  {name: 'Tài chính - Ngân hàng', description: 'Banking, fintech, insurance'});
MERGE (retail:Industry   {name: 'Bán lẻ',                description: 'Retail, e-commerce, supply chain'});
MERGE (banking:Industry  {name: 'Ngân hàng',             description: 'Commercial banking, digital banking'});

// ─── COMPANIES ────────────────────────────────────────────────
MERGE (techviet:Company {
  id: '50000000-0000-0000-0000-000000000001',
  name: 'TechViet JSC', industry: 'Công nghệ Thông tin',
  size: '200-500', location: 'TP.HCM', rating: 4.5, isVerified: true
});
MERGE (fintechvn:Company {
  id: '50000000-0000-0000-0000-000000000002',
  name: 'FinTech Solutions Vietnam', industry: 'Tài chính - Ngân hàng',
  size: '50-200', location: 'TP.HCM', rating: 4.2, isVerified: true
});
MERGE (vincommerce:Company {
  id: '50000000-0000-0000-0000-000000000003',
  name: 'VinCommerce', industry: 'Bán lẻ',
  size: '500+', location: 'Hà Nội', rating: 4.0, isVerified: true
});
MERGE (mbbank:Company {
  id: '50000000-0000-0000-0000-000000000004',
  name: 'MB Bank', industry: 'Ngân hàng',
  size: '500+', location: 'Hà Nội', rating: 4.3, isVerified: true
});
MERGE (fptsoftware:Company {
  id: '50000000-0000-0000-0000-000000000005',
  name: 'FPT Software', industry: 'Công nghệ Thông tin',
  size: '500+', location: 'Hà Nội', rating: 4.7, isVerified: true
});

// Company → Industry
MERGE (techviet)-[:BELONGS_TO]->(tech);
MERGE (fintechvn)-[:BELONGS_TO]->(finance);
MERGE (vincommerce)-[:BELONGS_TO]->(retail);
MERGE (mbbank)-[:BELONGS_TO]->(banking);
MERGE (fptsoftware)-[:BELONGS_TO]->(tech);

// ─── CANDIDATES ───────────────────────────────────────────────
MERGE (c1:Candidate {
  id: '40000000-0000-0000-0000-000000000001',
  userId: '10000000-0000-0000-0000-000000000001',
  fullName: 'Nguyễn Văn An', email: 'candidate1@demo.vn',
  location: 'TP.HCM', yearsExperience: 5,
  expectedSalaryMin: 35000000, expectedSalaryMax: 60000000,
  currency: 'VND', isActive: true
});
MERGE (c2:Candidate {
  id: '40000000-0000-0000-0000-000000000002',
  userId: '10000000-0000-0000-0000-000000000002',
  fullName: 'Trần Thị Bích', email: 'candidate2@demo.vn',
  location: 'TP.HCM', yearsExperience: 3,
  expectedSalaryMin: 28000000, expectedSalaryMax: 45000000,
  currency: 'VND', isActive: true
});
MERGE (c3:Candidate {
  id: '40000000-0000-0000-0000-000000000003',
  userId: '10000000-0000-0000-0000-000000000003',
  fullName: 'Lê Hoàng Cường', email: 'candidate3@demo.vn',
  location: 'Đà Nẵng', yearsExperience: 7,
  expectedSalaryMin: 45000000, expectedSalaryMax: 75000000,
  currency: 'VND', isActive: true
});
MERGE (c4:Candidate {
  id: '40000000-0000-0000-0000-000000000004',
  userId: '10000000-0000-0000-0000-000000000004',
  fullName: 'Phạm Minh Đức', email: 'candidate4@demo.vn',
  location: 'Hà Nội', yearsExperience: 4,
  expectedSalaryMin: 30000000, expectedSalaryMax: 50000000,
  currency: 'VND', isActive: true
});
MERGE (c5:Candidate {
  id: '40000000-0000-0000-0000-000000000005',
  userId: '10000000-0000-0000-0000-000000000005',
  fullName: 'Võ Thị Phương', email: 'candidate5@demo.vn',
  location: 'TP.HCM', yearsExperience: 0,
  expectedSalaryMin: 10000000, expectedSalaryMax: 18000000,
  currency: 'VND', isActive: true
});

// ─── CANDIDATE → SKILL RELATIONSHIPS ─────────────────────────

// Candidate 1: Senior Full-stack (JS/TS/React/Node)
MERGE (c1)-[:HAS_SKILL {level: 'Expert',        years: 5}]->(js);
MERGE (c1)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(ts);
MERGE (c1)-[:HAS_SKILL {level: 'Expert',        years: 5}]->(react);
MERGE (c1)-[:HAS_SKILL {level: 'Advanced',      years: 3}]->(nextjs);
MERGE (c1)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(nodejs);
MERGE (c1)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(express);
MERGE (c1)-[:HAS_SKILL {level: 'Intermediate',  years: 3}]->(mongodb);
MERGE (c1)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(postgresql);
MERGE (c1)-[:HAS_SKILL {level: 'Intermediate',  years: 2}]->(redis);
MERGE (c1)-[:HAS_SKILL {level: 'Intermediate',  years: 3}]->(aws);
MERGE (c1)-[:HAS_SKILL {level: 'Intermediate',  years: 3}]->(docker);
MERGE (c1)-[:HAS_SKILL {level: 'Intermediate',  years: 2}]->(graphql);
MERGE (c1)-[:HAS_SKILL {level: 'Intermediate',  years: 3}]->(jest);
MERGE (c1)-[:HAS_SKILL {level: 'Advanced',      years: 5}]->(git);

// Candidate 2: Data Scientist (Python/ML/AI)
MERGE (c2)-[:HAS_SKILL {level: 'Expert',        years: 5}]->(python);
MERGE (c2)-[:HAS_SKILL {level: 'Advanced',      years: 5}]->(sql);
MERGE (c2)-[:HAS_SKILL {level: 'Expert',        years: 4}]->(pandas);
MERGE (c2)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(numpy);
MERGE (c2)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(sklearn);
MERGE (c2)-[:HAS_SKILL {level: 'Advanced',      years: 3}]->(xgboost);
MERGE (c2)-[:HAS_SKILL {level: 'Intermediate',  years: 3}]->(tensorflow);
MERGE (c2)-[:HAS_SKILL {level: 'Intermediate',  years: 2}]->(pytorch);
MERGE (c2)-[:HAS_SKILL {level: 'Intermediate',  years: 2}]->(spark);
MERGE (c2)-[:HAS_SKILL {level: 'Intermediate',  years: 2}]->(sagemaker);
MERGE (c2)-[:HAS_SKILL {level: 'Advanced',      years: 3}]->(tableau);
MERGE (c2)-[:HAS_SKILL {level: 'Intermediate',  years: 3}]->(r);
MERGE (c2)-[:HAS_SKILL {level: 'Beginner',      years: 1}]->(llm);

// Candidate 3: Senior DevOps (AWS/K8s/Terraform)
MERGE (c3)-[:HAS_SKILL {level: 'Expert',        years: 7}]->(aws);
MERGE (c3)-[:HAS_SKILL {level: 'Expert',        years: 5}]->(kubernetes);
MERGE (c3)-[:HAS_SKILL {level: 'Expert',        years: 7}]->(docker);
MERGE (c3)-[:HAS_SKILL {level: 'Advanced',      years: 5}]->(terraform);
MERGE (c3)-[:HAS_SKILL {level: 'Advanced',      years: 6}]->(jenkins);
MERGE (c3)-[:HAS_SKILL {level: 'Advanced',      years: 3}]->(argocd);
MERGE (c3)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(gitlabci);
MERGE (c3)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(prometheus);
MERGE (c3)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(grafana);
MERGE (c3)-[:HAS_SKILL {level: 'Expert',        years: 10}]->(linux);
MERGE (c3)-[:HAS_SKILL {level: 'Expert',        years: 8}]->(bash);
MERGE (c3)-[:HAS_SKILL {level: 'Intermediate',  years: 4}]->(ansible);
MERGE (c3)-[:HAS_SKILL {level: 'Intermediate',  years: 4}]->(python);

// Candidate 4: Senior Mobile (iOS/Android/React Native)
MERGE (c4)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(swift);
MERGE (c4)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(kotlin);
MERGE (c4)-[:HAS_SKILL {level: 'Advanced',      years: 3}]->(reactnative);
MERGE (c4)-[:HAS_SKILL {level: 'Intermediate',  years: 1}]->(flutter);
MERGE (c4)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(ios);
MERGE (c4)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(android);
MERGE (c4)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(firebase);
MERGE (c4)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(restapi);
MERGE (c4)-[:HAS_SKILL {level: 'Intermediate',  years: 2}]->(graphql);
MERGE (c4)-[:HAS_SKILL {level: 'Advanced',      years: 4}]->(git);
MERGE (c4)-[:HAS_SKILL {level: 'Intermediate',  years: 3}]->(fastlane);

// Candidate 5: Fresher .NET
MERGE (c5)-[:HAS_SKILL {level: 'Intermediate',  years: 2}]->(csharp);
MERGE (c5)-[:HAS_SKILL {level: 'Intermediate',  years: 2}]->(dotnet);
MERGE (c5)-[:HAS_SKILL {level: 'Intermediate',  years: 1}]->(aspnet);
MERGE (c5)-[:HAS_SKILL {level: 'Intermediate',  years: 1}]->(ef);
MERGE (c5)-[:HAS_SKILL {level: 'Intermediate',  years: 2}]->(sqlserver);
MERGE (c5)-[:HAS_SKILL {level: 'Intermediate',  years: 1}]->(linq);
MERGE (c5)-[:HAS_SKILL {level: 'Intermediate',  years: 3}]->(html);
MERGE (c5)-[:HAS_SKILL {level: 'Intermediate',  years: 3}]->(css);
MERGE (c5)-[:HAS_SKILL {level: 'Beginner',      years: 1}]->(js);
MERGE (c5)-[:HAS_SKILL {level: 'Beginner',      years: 1}]->(git);

// ─── JOBS ─────────────────────────────────────────────────────
MERGE (j1:Job {
  id: '60000000-0000-0000-0000-000000000001',
  title: 'Senior Full-stack Developer (ReactJS/NodeJS)',
  companyId: '50000000-0000-0000-0000-000000000001',
  level: 'Senior', workMode: 'Hybrid', location: 'TP.HCM',
  salaryMin: 35000000, salaryMax: 60000000, currency: 'VND',
  status: 'active', applicationCount: 18
});
MERGE (j2:Job {
  id: '60000000-0000-0000-0000-000000000002',
  title: 'Data Scientist (Machine Learning)',
  companyId: '50000000-0000-0000-0000-000000000001',
  level: 'Mid-level', workMode: 'Remote', location: 'TP.HCM',
  salaryMin: 25000000, salaryMax: 42000000, currency: 'VND',
  status: 'active', applicationCount: 12
});
MERGE (j3:Job {
  id: '60000000-0000-0000-0000-000000000003',
  title: 'Senior Mobile App Developer (iOS/Android)',
  companyId: '50000000-0000-0000-0000-000000000002',
  level: 'Senior', workMode: 'Onsite', location: 'TP.HCM',
  salaryMin: 32000000, salaryMax: 55000000, currency: 'VND',
  status: 'active', applicationCount: 9
});
MERGE (j4:Job {
  id: '60000000-0000-0000-0000-000000000004',
  title: 'DevOps/Cloud Engineer',
  companyId: '50000000-0000-0000-0000-000000000003',
  level: 'Mid-level', workMode: 'Hybrid', location: 'Hà Nội',
  salaryMin: 28000000, salaryMax: 48000000, currency: 'VND',
  status: 'active', applicationCount: 7
});
MERGE (j5:Job {
  id: '60000000-0000-0000-0000-000000000005',
  title: 'Java Backend Developer',
  companyId: '50000000-0000-0000-0000-000000000004',
  level: 'Junior', workMode: 'Onsite', location: 'Hà Nội',
  salaryMin: 15000000, salaryMax: 25000000, currency: 'VND',
  status: 'active', applicationCount: 16
});
MERGE (j6:Job {
  id: '60000000-0000-0000-0000-000000000006',
  title: '.NET Developer (Fresher/Junior)',
  companyId: '50000000-0000-0000-0000-000000000005',
  level: 'Fresher/Junior', workMode: 'Hybrid', location: 'Hà Nội',
  salaryMin: 10000000, salaryMax: 18000000, currency: 'VND',
  status: 'active', applicationCount: 24
});
MERGE (j7:Job {
  id: '60000000-0000-0000-0000-000000000007',
  title: 'UX/UI Designer',
  companyId: '50000000-0000-0000-0000-000000000001',
  level: 'Mid-level', workMode: 'Remote', location: 'Toàn quốc',
  salaryMin: 18000000, salaryMax: 32000000, currency: 'VND',
  status: 'closed', applicationCount: 11
});
MERGE (j8:Job {
  id: '60000000-0000-0000-0000-000000000008',
  title: 'QA Automation Engineer',
  companyId: '50000000-0000-0000-0000-000000000002',
  level: 'Senior', workMode: 'Onsite', location: 'TP.HCM',
  salaryMin: 30000000, salaryMax: 50000000, currency: 'VND',
  status: 'active', applicationCount: 8
});
MERGE (j9:Job {
  id: '60000000-0000-0000-0000-000000000009',
  title: 'Business Analyst (IT/Digital)',
  companyId: '50000000-0000-0000-0000-000000000003',
  level: 'Mid-level', workMode: 'Hybrid', location: 'Hà Nội',
  salaryMin: 22000000, salaryMax: 38000000, currency: 'VND',
  status: 'active', applicationCount: 13
});
MERGE (j10:Job {
  id: '60000000-0000-0000-0000-00000000000a',
  title: 'AI/ML Engineer (LLM/GenAI)',
  companyId: '50000000-0000-0000-0000-000000000005',
  level: 'Senior', workMode: 'Remote', location: 'Toàn quốc',
  salaryMin: 42000000, salaryMax: 75000000, currency: 'VND',
  status: 'active', applicationCount: 6
});

// Job → Company links
MERGE (j1)-[:POSTED_BY]->(techviet);
MERGE (j2)-[:POSTED_BY]->(techviet);
MERGE (j3)-[:POSTED_BY]->(fintechvn);
MERGE (j4)-[:POSTED_BY]->(vincommerce);
MERGE (j5)-[:POSTED_BY]->(mbbank);
MERGE (j6)-[:POSTED_BY]->(fptsoftware);
MERGE (j7)-[:POSTED_BY]->(techviet);
MERGE (j8)-[:POSTED_BY]->(fintechvn);
MERGE (j9)-[:POSTED_BY]->(vincommerce);
MERGE (j10)-[:POSTED_BY]->(fptsoftware);

// ─── JOB → REQUIRED SKILLS ────────────────────────────────────

// Job 1: Senior Full-stack (React/Node/TS)
MERGE (j1)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(js);
MERGE (j1)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(ts);
MERGE (j1)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(react);
MERGE (j1)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(nodejs);
MERGE (j1)-[:REQUIRES {isRequired: true,  priority: 'medium'}]->(postgresql);
MERGE (j1)-[:REQUIRES {isRequired: false, priority: 'medium'}]->(redis);
MERGE (j1)-[:REQUIRES {isRequired: false, priority: 'low'}]->(aws);
MERGE (j1)-[:REQUIRES {isRequired: false, priority: 'low'}]->(docker);

// Job 2: Data Scientist (Python/ML/SQL)
MERGE (j2)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(python);
MERGE (j2)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(sql);
MERGE (j2)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(sklearn);
MERGE (j2)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(pandas);
MERGE (j2)-[:REQUIRES {isRequired: true,  priority: 'medium'}]->(numpy);
MERGE (j2)-[:REQUIRES {isRequired: false, priority: 'medium'}]->(tensorflow);
MERGE (j2)-[:REQUIRES {isRequired: false, priority: 'low'}]->(spark);
MERGE (j2)-[:REQUIRES {isRequired: false, priority: 'low'}]->(sagemaker);

// Job 3: Mobile Developer (iOS/Android/Swift/Kotlin)
MERGE (j3)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(ios);
MERGE (j3)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(android);
MERGE (j3)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(swift);
MERGE (j3)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(kotlin);
MERGE (j3)-[:REQUIRES {isRequired: false, priority: 'medium'}]->(reactnative);
MERGE (j3)-[:REQUIRES {isRequired: false, priority: 'medium'}]->(firebase);
MERGE (j3)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(restapi);

// Job 4: DevOps (AWS/K8s/Docker/Terraform)
MERGE (j4)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(aws);
MERGE (j4)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(kubernetes);
MERGE (j4)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(docker);
MERGE (j4)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(terraform);
MERGE (j4)-[:REQUIRES {isRequired: true,  priority: 'medium'}]->(linux);
MERGE (j4)-[:REQUIRES {isRequired: true,  priority: 'medium'}]->(bash);
MERGE (j4)-[:REQUIRES {isRequired: false, priority: 'low'}]->(prometheus);
MERGE (j4)-[:REQUIRES {isRequired: false, priority: 'low'}]->(jenkins);

// Job 5: Java Backend (Java/Spring)
MERGE (j5)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(java);
MERGE (j5)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(spring);
MERGE (j5)-[:REQUIRES {isRequired: true,  priority: 'medium'}]->(sql);
MERGE (j5)-[:REQUIRES {isRequired: true,  priority: 'medium'}]->(restapi);
MERGE (j5)-[:REQUIRES {isRequired: false, priority: 'low'}]->(redis);
MERGE (j5)-[:REQUIRES {isRequired: false, priority: 'low'}]->(docker);

// Job 6: .NET Fresher (C#/.NET Core)
MERGE (j6)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(csharp);
MERGE (j6)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(dotnet);
MERGE (j6)-[:REQUIRES {isRequired: false, priority: 'medium'}]->(sql);
MERGE (j6)-[:REQUIRES {isRequired: false, priority: 'low'}]->(html);
MERGE (j6)-[:REQUIRES {isRequired: false, priority: 'low'}]->(css);
MERGE (j6)-[:REQUIRES {isRequired: false, priority: 'low'}]->(git);

// Job 10: AI/ML Engineer (Python/PyTorch/LLM)
MERGE (j10)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(python);
MERGE (j10)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(pytorch);
MERGE (j10)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(llm);
MERGE (j10)-[:REQUIRES {isRequired: true,  priority: 'high'}]->(mlops);
MERGE (j10)-[:REQUIRES {isRequired: false, priority: 'medium'}]->(tensorflow);
MERGE (j10)-[:REQUIRES {isRequired: true,  priority: 'medium'}]->(aws);
MERGE (j10)-[:REQUIRES {isRequired: true,  priority: 'medium'}]->(docker);

// ─── APPLICATIONS (graph overlay for AI analysis) ─────────────

// App 1: c1 → j1 (interview, match 0.92)
MERGE (a1:Application {
  id: '70000000-0000-0000-0000-000000000001',
  candidateId: '40000000-0000-0000-0000-000000000001',
  jobId: '60000000-0000-0000-0000-000000000001',
  status: 'interview', matchScore: 0.92
});
MERGE (c1)-[:APPLIED_TO]->(a1);
MERGE (a1)-[:APPLICATION_FOR]->(j1);

// App 2: c2 → j2 (offered, match 0.89)
MERGE (a2:Application {
  id: '70000000-0000-0000-0000-000000000002',
  candidateId: '40000000-0000-0000-0000-000000000002',
  jobId: '60000000-0000-0000-0000-000000000002',
  status: 'offered', matchScore: 0.89
});
MERGE (c2)-[:APPLIED_TO]->(a2);
MERGE (a2)-[:APPLICATION_FOR]->(j2);

// App 3: c3 → j4 (accepted, match 0.94)
MERGE (a3:Application {
  id: '70000000-0000-0000-0000-000000000003',
  candidateId: '40000000-0000-0000-0000-000000000003',
  jobId: '60000000-0000-0000-0000-000000000004',
  status: 'accepted', matchScore: 0.94
});
MERGE (c3)-[:APPLIED_TO]->(a3);
MERGE (a3)-[:APPLICATION_FOR]->(j4);

// App 5: c2 → j10 (interview, match 0.78)
MERGE (a5:Application {
  id: '70000000-0000-0000-0000-000000000005',
  candidateId: '40000000-0000-0000-0000-000000000002',
  jobId: '60000000-0000-0000-0000-00000000000a',
  status: 'interview', matchScore: 0.78
});
MERGE (c2)-[:APPLIED_TO]->(a5);
MERGE (a5)-[:APPLICATION_FOR]->(j10);

// App 8: c5 → j6 (reviewing, match 0.76)
MERGE (a8:Application {
  id: '70000000-0000-0000-0000-000000000008',
  candidateId: '40000000-0000-0000-0000-000000000005',
  jobId: '60000000-0000-0000-0000-000000000006',
  status: 'reviewing', matchScore: 0.76
});
MERGE (c5)-[:APPLIED_TO]->(a8);
MERGE (a8)-[:APPLICATION_FOR]->(j6);

// ─── MATCH SCORES (pre-calculated for AI recommendations) ─────

// c1 (Full-stack) ↔ jobs
MERGE (c1)-[:MATCHES_JOB {
  matchScore: 0.92,
  scoreBreakdown: {skills: 0.95, experience: 0.90, salary: 0.88, location: 1.0, jobType: 1.0},
  recommended: true, lastCalculated: datetime()
}]->(j1);

MERGE (c1)-[:MATCHES_JOB {
  matchScore: 0.38,
  scoreBreakdown: {skills: 0.20, experience: 0.90, salary: 0.55, location: 1.0, jobType: 1.0},
  recommended: false, lastCalculated: datetime()
}]->(j2);

MERGE (c1)-[:MATCHES_JOB {
  matchScore: 0.72,
  scoreBreakdown: {skills: 0.78, experience: 0.85, salary: 0.75, location: 1.0, jobType: 1.0},
  recommended: true, lastCalculated: datetime()
}]->(j8);

// c2 (Data Scientist) ↔ jobs
MERGE (c2)-[:MATCHES_JOB {
  matchScore: 0.89,
  scoreBreakdown: {skills: 0.93, experience: 0.80, salary: 0.92, location: 0.90, jobType: 1.0},
  recommended: true, lastCalculated: datetime()
}]->(j2);

MERGE (c2)-[:MATCHES_JOB {
  matchScore: 0.78,
  scoreBreakdown: {skills: 0.82, experience: 0.75, salary: 0.88, location: 0.80, jobType: 1.0},
  recommended: true, lastCalculated: datetime()
}]->(j10);

MERGE (c2)-[:MATCHES_JOB {
  matchScore: 0.25,
  scoreBreakdown: {skills: 0.12, experience: 0.80, salary: 0.60, location: 0.70, jobType: 1.0},
  recommended: false, lastCalculated: datetime()
}]->(j1);

// c3 (DevOps) ↔ jobs
MERGE (c3)-[:MATCHES_JOB {
  matchScore: 0.94,
  scoreBreakdown: {skills: 0.97, experience: 0.95, salary: 0.82, location: 0.85, jobType: 1.0},
  recommended: true, lastCalculated: datetime()
}]->(j4);

MERGE (c3)-[:MATCHES_JOB {
  matchScore: 0.55,
  scoreBreakdown: {skills: 0.62, experience: 0.95, salary: 0.45, location: 0.90, jobType: 1.0},
  recommended: false, lastCalculated: datetime()
}]->(j1);

// c4 (Mobile) ↔ jobs
MERGE (c4)-[:MATCHES_JOB {
  matchScore: 0.91,
  scoreBreakdown: {skills: 0.95, experience: 0.90, salary: 0.88, location: 0.90, jobType: 1.0},
  recommended: true, lastCalculated: datetime()
}]->(j3);

MERGE (c4)-[:MATCHES_JOB {
  matchScore: 0.42,
  scoreBreakdown: {skills: 0.35, experience: 0.80, salary: 0.70, location: 0.80, jobType: 1.0},
  recommended: false, lastCalculated: datetime()
}]->(j5);

// c5 (Fresher .NET) ↔ jobs
MERGE (c5)-[:MATCHES_JOB {
  matchScore: 0.76,
  scoreBreakdown: {skills: 0.82, experience: 0.70, salary: 0.88, location: 0.75, jobType: 1.0},
  recommended: true, lastCalculated: datetime()
}]->(j6);

MERGE (c5)-[:MATCHES_JOB {
  matchScore: 0.45,
  scoreBreakdown: {skills: 0.40, experience: 0.55, salary: 0.65, location: 0.75, jobType: 1.0},
  recommended: false, lastCalculated: datetime()
}]->(j5);

// ─── CANDIDATE SIMILARITY (collaborative filtering) ───────────
MERGE (c1)-[:SIMILAR_TO {similarityScore: 0.70}]->(c3);
MERGE (c3)-[:SIMILAR_TO {similarityScore: 0.70}]->(c1);
MERGE (c1)-[:SIMILAR_TO {similarityScore: 0.55}]->(c4);
MERGE (c4)-[:SIMILAR_TO {similarityScore: 0.55}]->(c1);
MERGE (c2)-[:SIMILAR_TO {similarityScore: 0.65}]->(c5);
MERGE (c5)-[:SIMILAR_TO {similarityScore: 0.65}]->(c2);
MERGE (c2)-[:SIMILAR_TO {similarityScore: 0.35}]->(c1);
MERGE (c1)-[:SIMILAR_TO {similarityScore: 0.35}]->(c2);

// ─── CANDIDATE INDUSTRY PREFERENCES ──────────────────────────
MERGE (c1)-[:PREFERS_INDUSTRY]->(tech);
MERGE (c1)-[:PREFERS_INDUSTRY]->(finance);
MERGE (c2)-[:PREFERS_INDUSTRY]->(finance);
MERGE (c2)-[:PREFERS_INDUSTRY]->(tech);
MERGE (c3)-[:PREFERS_INDUSTRY]->(tech);
MERGE (c4)-[:PREFERS_INDUSTRY]->(tech);
MERGE (c5)-[:PREFERS_INDUSTRY]->(tech);

// ─── COMPLETION MESSAGE ────────────────────────────────────────
MATCH (cand:Candidate)
MATCH (job:Job)
MATCH (skill:Skill)
MATCH (comp:Company)
MATCH (app:Application)
RETURN
  COUNT(DISTINCT cand)  AS candidates,
  COUNT(DISTINCT job)   AS jobs,
  COUNT(DISTINCT skill) AS skills,
  COUNT(DISTINCT comp)  AS companies,
  COUNT(DISTINCT app)   AS applications;
