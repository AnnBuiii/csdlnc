// =============================================================
// MongoDB Seed Data – Smart Recruitment System (SRS)
// Demo data for presentation – matches PostgreSQL UUIDs
// =============================================================
//
// All UUIDs here match the PostgreSQL seed (02_seed.sql)
// Job postings include embedded companyInfo (denormalized)
// Requirements use the correct Mongoose schema structure:
//   requirements.skills[].{ name, level, isRequired }
//   requirements.yearsOfExperience.{ min, max }
//   requirements.education
//   requirements.languageRequirements (array of strings)
// =============================================================

db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE || 'srs_mongo');

// Clear existing data
db.candidate_profiles.deleteMany({});
db.job_postings.deleteMany({});
db.company_reviews.deleteMany({});

print('[MongoDB] Starting seed data insertion...');

// ─── CANDIDATE PROFILES ──────────────────────────────────────
const candidateProfiles = [
  {
    candidateId: '40000000-0000-0000-0000-000000000001',
    userId:      '10000000-0000-0000-0000-000000000001',
    personalInfo: {
      fullName:   'Nguyễn Văn An',
      email:      'candidate1@demo.vn',
      phone:      '0912111001',
      location:   'TP.HCM',
      dateOfBirth: new Date('1995-03-15'),
    },
    summary: 'Senior Full-stack Developer với 5 năm kinh nghiệm xây dựng ứng dụng web quy mô lớn. Chuyên về React, Node.js, TypeScript. Từng dẫn dắt team 5 developers tại startup fintech và chịu trách nhiệm kiến trúc hệ thống xử lý 1M+ requests/ngày.',
    education: [
      {
        school: 'Đại học Bách Khoa TP.HCM',
        degree: 'Kỹ sư Công nghệ Thông tin',
        major:  'Công nghệ Thông tin',
        gpa:    3.5,
        startYear: 2013,
        endYear:   2017,
      }
    ],
    experience: [
      {
        role:        'Technical Lead',
        company:     'PayTech Vietnam',
        startDate:   '2022-01',
        endDate:     null,
        isCurrent:   true,
        description: 'Dẫn team 5 developers xây dựng payment gateway xử lý 1M+ giao dịch/ngày. Thiết kế kiến trúc microservices, triển khai CI/CD với GitHub Actions và Docker/K8s.'
      },
      {
        role:        'Senior Full-stack Developer',
        company:     'DigitalFirst JSC',
        startDate:   '2019-06',
        endDate:     '2021-12',
        isCurrent:   false,
        description: 'Phát triển nền tảng e-commerce với React và Node.js, tối ưu hiệu năng giúp giảm 40% load time. Mentoring 3 junior developers.'
      },
      {
        role:        'Frontend Developer',
        company:     'WebAgency Vietnam',
        startDate:   '2017-07',
        endDate:     '2019-05',
        isCurrent:   false,
        description: 'Xây dựng giao diện web cho 20+ dự án khách hàng doanh nghiệp sử dụng React và Vue.js.'
      }
    ],
    skills: [
      { name: 'JavaScript',  level: 'Expert',        yearsOfExp: 5 },
      { name: 'TypeScript',  level: 'Advanced',      yearsOfExp: 4 },
      { name: 'React',       level: 'Expert',        yearsOfExp: 5 },
      { name: 'Next.js',     level: 'Advanced',      yearsOfExp: 3 },
      { name: 'Node.js',     level: 'Advanced',      yearsOfExp: 4 },
      { name: 'Express.js',  level: 'Advanced',      yearsOfExp: 4 },
      { name: 'MongoDB',     level: 'Intermediate',  yearsOfExp: 3 },
      { name: 'PostgreSQL',  level: 'Advanced',      yearsOfExp: 4 },
      { name: 'Redis',       level: 'Intermediate',  yearsOfExp: 2 },
      { name: 'AWS',         level: 'Intermediate',  yearsOfExp: 3 },
      { name: 'Docker',      level: 'Intermediate',  yearsOfExp: 3 },
      { name: 'GraphQL',     level: 'Intermediate',  yearsOfExp: 2 },
      { name: 'Jest',        level: 'Intermediate',  yearsOfExp: 3 },
      { name: 'Git',         level: 'Advanced',      yearsOfExp: 5 },
    ],
    certifications: [
      { name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', issueDate: '2023-04' },
      { name: 'Certified Scrum Master', issuer: 'Scrum Alliance', issueDate: '2022-08' },
    ],
    preferences: {
      jobTypes: ['Full-time'],
      preferredLocations: ['TP.HCM', 'Remote'],
      industries: ['Công nghệ Thông tin', 'Tài chính - Ngân hàng'],
      expectedSalary: { min: 35000000, max: 60000000, currency: 'VND' },
    },
    portfolio: [
      { title: 'GitHub',   url: 'https://github.com/nguyenvanan',   description: 'Open source projects & contributions' },
      { title: 'LinkedIn', url: 'https://linkedin.com/in/nvanan',   description: 'Professional profile' },
    ],
    isPublic:     true,
    viewedCount:  58,
    createdAt:    new Date('2026-03-01T09:00:00Z'),
    updatedAt:    new Date('2026-05-10T10:30:00Z'),
  },

  {
    candidateId: '40000000-0000-0000-0000-000000000002',
    userId:      '10000000-0000-0000-0000-000000000002',
    personalInfo: {
      fullName:   'Trần Thị Bích',
      email:      'candidate2@demo.vn',
      phone:      '0978222002',
      location:   'TP.HCM',
      dateOfBirth: new Date('1998-07-22'),
    },
    summary: 'Data Scientist với 3 năm kinh nghiệm trong lĩnh vực Fintech. Thạc sĩ KHMT Đại học Bách Khoa HN. Chuyên xây dựng ML models cho credit scoring, fraud detection và customer churn prediction. Đang nghiên cứu ứng dụng LLM trong phân tích tài chính.',
    education: [
      {
        school:    'Đại học Bách Khoa Hà Nội',
        degree:    'Thạc sĩ Khoa học Máy tính',
        major:     'Khoa học Dữ liệu',
        gpa:       3.8,
        startYear: 2018,
        endYear:   2020,
      },
      {
        school:    'Đại học Khoa học Tự nhiên TP.HCM',
        degree:    'Cử nhân Toán – Tin học',
        major:     'Toán Tin học',
        gpa:       3.6,
        startYear: 2014,
        endYear:   2018,
      }
    ],
    experience: [
      {
        role:        'Data Scientist',
        company:     'VietCredit Finance',
        startDate:   '2021-08',
        endDate:     null,
        isCurrent:   true,
        description: 'Xây dựng credit scoring model (XGBoost + SHAP) giúp giảm 22% tỷ lệ nợ xấu. Phát triển real-time fraud detection pipeline với Apache Kafka và Spark Streaming. Dẫn dắt team 3 data analysts.'
      },
      {
        role:        'Data Analyst',
        company:     'BankAI Solutions',
        startDate:   '2020-03',
        endDate:     '2021-07',
        isCurrent:   false,
        description: 'Phân tích hành vi khách hàng để tối ưu chiến lược tiếp thị, xây dựng dashboard BI với Tableau và Power BI.'
      }
    ],
    skills: [
      { name: 'Python',        level: 'Expert',       yearsOfExp: 5 },
      { name: 'SQL',           level: 'Advanced',     yearsOfExp: 5 },
      { name: 'Pandas',        level: 'Expert',       yearsOfExp: 4 },
      { name: 'NumPy',         level: 'Advanced',     yearsOfExp: 4 },
      { name: 'Scikit-learn',  level: 'Advanced',     yearsOfExp: 4 },
      { name: 'XGBoost',       level: 'Advanced',     yearsOfExp: 3 },
      { name: 'TensorFlow',    level: 'Intermediate', yearsOfExp: 3 },
      { name: 'PyTorch',       level: 'Intermediate', yearsOfExp: 2 },
      { name: 'Apache Spark',  level: 'Intermediate', yearsOfExp: 2 },
      { name: 'Tableau',       level: 'Advanced',     yearsOfExp: 3 },
      { name: 'AWS SageMaker', level: 'Intermediate', yearsOfExp: 2 },
      { name: 'R',             level: 'Intermediate', yearsOfExp: 3 },
    ],
    certifications: [
      { name: 'AWS Certified Machine Learning – Specialty', issuer: 'Amazon Web Services', issueDate: '2023-06' },
      { name: 'TensorFlow Developer Certificate', issuer: 'Google', issueDate: '2022-09' },
    ],
    preferences: {
      jobTypes: ['Full-time'],
      preferredLocations: ['TP.HCM', 'Remote'],
      industries: ['Tài chính - Ngân hàng', 'Công nghệ Thông tin'],
      expectedSalary: { min: 28000000, max: 45000000, currency: 'VND' },
    },
    portfolio: [
      { title: 'GitHub',   url: 'https://github.com/tranthib-ds',   description: 'Data science projects & notebooks' },
      { title: 'Kaggle',   url: 'https://kaggle.com/tranthibich',   description: 'Competition solutions' },
      { title: 'Medium',   url: 'https://medium.com/@tranthibich',  description: 'Technical articles on ML' },
    ],
    isPublic:     true,
    viewedCount:  73,
    createdAt:    new Date('2026-03-10T10:30:00Z'),
    updatedAt:    new Date('2026-05-12T14:00:00Z'),
  },

  {
    candidateId: '40000000-0000-0000-0000-000000000003',
    userId:      '10000000-0000-0000-0000-000000000003',
    personalInfo: {
      fullName:   'Lê Hoàng Cường',
      email:      'candidate3@demo.vn',
      phone:      '0918333003',
      location:   'Đà Nẵng',
      dateOfBirth: new Date('1992-11-10'),
    },
    summary: 'Senior DevOps/Cloud Engineer với 7 năm kinh nghiệm thiết kế và vận hành hệ thống cloud quy mô lớn. AWS Solutions Architect Professional và CKA certified. Chuyên Kubernetes, GitOps, Infrastructure as Code. Đã xây dựng multi-region K8s cluster cho 50+ microservices với uptime 99.99%.',
    education: [
      {
        school:    'Đại học Đà Nẵng',
        degree:    'Kỹ sư Mạng Máy tính',
        major:     'Mạng và Truyền thông',
        gpa:       3.4,
        startYear: 2010,
        endYear:   2014,
      }
    ],
    experience: [
      {
        role:        'Senior DevOps/Cloud Engineer',
        company:     'CloudOps Vietnam',
        startDate:   '2020-02',
        endDate:     null,
        isCurrent:   true,
        description: 'Thiết kế và vận hành multi-region Kubernetes clusters (AWS EKS) cho 50+ microservices. Triển khai GitOps với ArgoCD, Infrastructure as Code với Terraform. Giảm deployment time từ 2h xuống 8 phút.'
      },
      {
        role:        'DevOps Engineer',
        company:     'VN Cloud Solutions',
        startDate:   '2016-06',
        endDate:     '2020-01',
        isCurrent:   false,
        description: 'Xây dựng và quản lý CI/CD pipeline với Jenkins, quản lý infrastructure với Terraform, migrate on-premise lên AWS.'
      },
      {
        role:        'System Administrator',
        company:     'ISP Vietnam',
        startDate:   '2014-08',
        endDate:     '2016-05',
        isCurrent:   false,
        description: 'Quản trị hệ thống Linux servers, cấu hình network, backup và disaster recovery.'
      }
    ],
    skills: [
      { name: 'AWS',          level: 'Expert',       yearsOfExp: 7 },
      { name: 'Kubernetes',   level: 'Expert',       yearsOfExp: 5 },
      { name: 'Docker',       level: 'Expert',       yearsOfExp: 7 },
      { name: 'Terraform',    level: 'Advanced',     yearsOfExp: 5 },
      { name: 'Jenkins',      level: 'Advanced',     yearsOfExp: 6 },
      { name: 'ArgoCD',       level: 'Advanced',     yearsOfExp: 3 },
      { name: 'GitLab CI',    level: 'Advanced',     yearsOfExp: 4 },
      { name: 'Prometheus',   level: 'Advanced',     yearsOfExp: 4 },
      { name: 'Grafana',      level: 'Advanced',     yearsOfExp: 4 },
      { name: 'Linux',        level: 'Expert',       yearsOfExp: 10 },
      { name: 'Bash',         level: 'Expert',       yearsOfExp: 8 },
      { name: 'Ansible',      level: 'Intermediate', yearsOfExp: 4 },
      { name: 'Python',       level: 'Intermediate', yearsOfExp: 4 },
    ],
    certifications: [
      { name: 'AWS Certified Solutions Architect – Professional', issuer: 'Amazon Web Services',   issueDate: '2023-03' },
      { name: 'Certified Kubernetes Administrator (CKA)',         issuer: 'CNCF',                  issueDate: '2022-10' },
      { name: 'HashiCorp Certified: Terraform Associate',         issuer: 'HashiCorp',             issueDate: '2023-07' },
    ],
    preferences: {
      jobTypes: ['Full-time'],
      preferredLocations: ['Đà Nẵng', 'Remote', 'Hà Nội'],
      industries: ['Công nghệ Thông tin'],
      expectedSalary: { min: 45000000, max: 75000000, currency: 'VND' },
    },
    portfolio: [
      { title: 'GitHub',  url: 'https://github.com/lehcuong-devops', description: 'IaC projects & K8s configs' },
      { title: 'Blog',    url: 'https://devopsvn.tech/lehcuong',     description: 'DevOps articles & tutorials' },
    ],
    isPublic:     true,
    viewedCount:  92,
    createdAt:    new Date('2026-02-15T08:00:00Z'),
    updatedAt:    new Date('2026-05-08T16:30:00Z'),
  },

  {
    candidateId: '40000000-0000-0000-0000-000000000004',
    userId:      '10000000-0000-0000-0000-000000000004',
    personalInfo: {
      fullName:   'Phạm Minh Đức',
      email:      'candidate4@demo.vn',
      phone:      '0969444004',
      location:   'Hà Nội',
      dateOfBirth: new Date('1996-05-28'),
    },
    summary: 'Senior Mobile Developer với 4 năm kinh nghiệm phát triển ứng dụng iOS (Swift) và Android (Kotlin) native, cùng cross-platform với React Native. Đã phát hành 12+ ứng dụng trên App Store và Google Play với tổng lượt tải 2M+. Hiện tại đang nghiên cứu Flutter và SwiftUI.',
    education: [
      {
        school:    'Đại học FPT',
        degree:    'Cử nhân Kỹ thuật Phần mềm',
        major:     'Kỹ thuật Phần mềm',
        gpa:       3.7,
        startYear: 2014,
        endYear:   2018,
      }
    ],
    experience: [
      {
        role:        'Senior Mobile Developer',
        company:     'AppStudio Vietnam',
        startDate:   '2021-03',
        endDate:     null,
        isCurrent:   true,
        description: 'Phát triển iOS/Android apps cho khách hàng enterprise USA và Singapore. Tech lead cho team 3 mobile developers, phụ trách code review và architectural decisions.'
      },
      {
        role:        'Mobile Developer',
        company:     'StartupMobile JSC',
        startDate:   '2018-08',
        endDate:     '2021-02',
        isCurrent:   false,
        description: 'Phát triển 8 ứng dụng e-commerce và social networking từ ý tưởng đến launch. Tích hợp payment gateway (VNPay, MoMo) và push notification.'
      }
    ],
    skills: [
      { name: 'Swift',              level: 'Advanced',     yearsOfExp: 4 },
      { name: 'Kotlin',             level: 'Advanced',     yearsOfExp: 4 },
      { name: 'React Native',       level: 'Advanced',     yearsOfExp: 3 },
      { name: 'Flutter',            level: 'Intermediate', yearsOfExp: 1 },
      { name: 'iOS Development',    level: 'Advanced',     yearsOfExp: 4 },
      { name: 'Android Development',level: 'Advanced',     yearsOfExp: 4 },
      { name: 'Firebase',           level: 'Advanced',     yearsOfExp: 4 },
      { name: 'REST APIs',          level: 'Advanced',     yearsOfExp: 4 },
      { name: 'GraphQL',            level: 'Intermediate', yearsOfExp: 2 },
      { name: 'Git',                level: 'Advanced',     yearsOfExp: 4 },
      { name: 'Fastlane',           level: 'Intermediate', yearsOfExp: 3 },
    ],
    certifications: [
      { name: 'Apple Certified iOS Developer',    issuer: 'Apple',  issueDate: '2022-05' },
      { name: 'Google Associate Android Developer',issuer: 'Google', issueDate: '2021-09' },
    ],
    preferences: {
      jobTypes: ['Full-time'],
      preferredLocations: ['Hà Nội', 'Remote'],
      industries: ['Công nghệ Thông tin'],
      expectedSalary: { min: 30000000, max: 50000000, currency: 'VND' },
    },
    portfolio: [
      { title: 'GitHub',      url: 'https://github.com/phamminhduc',      description: 'Mobile development projects' },
      { title: 'App Store',   url: 'https://apps.apple.com/developer/pmd', description: 'Published iOS apps' },
      { title: 'Google Play', url: 'https://play.google.com/store/apps/developer?id=PhamMinhDuc', description: 'Published Android apps' },
    ],
    isPublic:     true,
    viewedCount:  41,
    createdAt:    new Date('2026-03-20T13:00:00Z'),
    updatedAt:    new Date('2026-05-14T09:30:00Z'),
  },

  {
    candidateId: '40000000-0000-0000-0000-000000000005',
    userId:      '10000000-0000-0000-0000-000000000005',
    personalInfo: {
      fullName:   'Võ Thị Phương',
      email:      'candidate5@demo.vn',
      phone:      '0941555005',
      location:   'TP.HCM',
      dateOfBirth: new Date('2001-09-15'),
    },
    summary: 'Fresher .NET Developer mới tốt nghiệp ngành CNTT với GPA 3.2. Đã hoàn thành 2 internship với ASP.NET Core và SQL Server. Ham học hỏi, có khả năng tự nghiên cứu tốt. Mục tiêu trở thành Backend Developer chuyên nghiệp trong 2 năm tới.',
    education: [
      {
        school:    'Đại học CNTT TP.HCM',
        degree:    'Cử nhân Công nghệ Thông tin',
        major:     'Công nghệ Thông tin',
        gpa:       3.2,
        startYear: 2021,
        endYear:   2025,
      }
    ],
    experience: [
      {
        role:        'Intern .NET Developer',
        company:     'Software House Vietnam',
        startDate:   '2024-06',
        endDate:     '2024-08',
        isCurrent:   false,
        description: 'Phát triển tính năng CRUD cho hệ thống quản lý nhân sự nội bộ sử dụng ASP.NET Core 7, Entity Framework, và SQL Server. Viết unit tests với xUnit.'
      },
      {
        role:        'Intern Web Developer',
        company:     'Local Tech Company',
        startDate:   '2023-12',
        endDate:     '2024-02',
        isCurrent:   false,
        description: 'Xây dựng website đặt hàng cho nhà hàng sử dụng ASP.NET MVC, Bootstrap, JavaScript. Deploy lên IIS.'
      }
    ],
    skills: [
      { name: 'C#',               level: 'Intermediate', yearsOfExp: 2 },
      { name: '.NET Core',        level: 'Intermediate', yearsOfExp: 2 },
      { name: 'ASP.NET',         level: 'Intermediate', yearsOfExp: 1 },
      { name: 'Entity Framework', level: 'Intermediate', yearsOfExp: 1 },
      { name: 'SQL Server',       level: 'Intermediate', yearsOfExp: 2 },
      { name: 'HTML',             level: 'Intermediate', yearsOfExp: 3 },
      { name: 'CSS',              level: 'Intermediate', yearsOfExp: 3 },
      { name: 'JavaScript',       level: 'Beginner',     yearsOfExp: 1 },
      { name: 'Git',              level: 'Beginner',     yearsOfExp: 1 },
      { name: 'LINQ',             level: 'Intermediate', yearsOfExp: 1 },
    ],
    certifications: [
      { name: 'Microsoft Certified: .NET Fundamentals', issuer: 'Microsoft', issueDate: '2024-05' },
    ],
    preferences: {
      jobTypes: ['Full-time'],
      preferredLocations: ['TP.HCM', 'Remote'],
      industries: ['Công nghệ Thông tin'],
      expectedSalary: { min: 10000000, max: 18000000, currency: 'VND' },
    },
    portfolio: [
      { title: 'GitHub',   url: 'https://github.com/vothiphuong-net',  description: '.NET learning & internship projects' },
      { title: 'LinkedIn', url: 'https://linkedin.com/in/vothiphuong', description: 'Professional profile' },
    ],
    isPublic:     true,
    viewedCount:  22,
    createdAt:    new Date('2026-04-05T14:00:00Z'),
    updatedAt:    new Date('2026-05-15T11:00:00Z'),
  },
];

const candidateResult = db.candidate_profiles.insertMany(candidateProfiles);
print(`[MongoDB] Inserted ${candidateResult.insertedCount} candidate profiles`);

// ─── JOB POSTINGS (10 jobs, matching PostgreSQL job UUIDs) ─────
const jobPostings = [
  // ── JOB 1: TechViet – Senior Full-stack Developer ─────────────
  {
    jobId:     '60000000-0000-0000-0000-000000000001',
    companyId: '50000000-0000-0000-0000-000000000001',
    companyInfo: {
      name:     'TechViet JSC',
      logoUrl:  null,
      industry: 'Công nghệ Thông tin',
      size:     '200-500',
    },
    title:    'Senior Full-stack Developer (ReactJS/NodeJS)',
    level:    'Senior',
    jobType:  ['Full-time'],
    workMode: 'Hybrid',
    location: { city: 'TP.HCM', district: 'Quận 1', address: 'Tầng 8, 123 Lê Lợi', isRemoteAllowed: true },
    salary:   { min: 35000000, max: 60000000, currency: 'VND', isNegotiable: true, isPublic: true },
    description: 'TechViet đang tìm kiếm Senior Full-stack Developer tài năng để tham gia xây dựng nền tảng payment Fintech phục vụ 2 triệu người dùng. Bạn sẽ làm việc trong môi trường agile, trực tiếp ảnh hưởng đến sản phẩm và có cơ hội phát triển lên Tech Lead.\n\n**Trách nhiệm:**\n- Phát triển tính năng mới cho payment platform sử dụng React và Node.js\n- Tối ưu hiệu năng backend, đảm bảo latency < 100ms\n- Thiết kế và triển khai RESTful/GraphQL APIs\n- Tham gia code review, mentoring junior developers\n- Cải thiện test coverage lên 80%+',
    requirements: {
      skills: [
        { name: 'JavaScript',  level: 'Advanced',     isRequired: true  },
        { name: 'TypeScript',  level: 'Intermediate', isRequired: true  },
        { name: 'React',       level: 'Advanced',     isRequired: true  },
        { name: 'Node.js',     level: 'Advanced',     isRequired: true  },
        { name: 'PostgreSQL',  level: 'Intermediate', isRequired: true  },
        { name: 'Redis',       level: 'Beginner',     isRequired: false },
        { name: 'AWS',         level: 'Beginner',     isRequired: false },
        { name: 'Docker',      level: 'Beginner',     isRequired: false },
      ],
      yearsOfExperience:    { min: 4, max: null },
      education:            'Cử nhân CNTT hoặc tương đương',
      languageRequirements: ['Tiếng Anh (đọc hiểu tài liệu kỹ thuật)'],
    },
    benefits: [
      'Lương tháng 13 + bonus performance lên tới 3 tháng lương',
      'Bảo hiểm sức khỏe cao cấp (Bảo Việt Gold)',
      'MacBook Pro M3 và màn hình 4K',
      'Budget đào tạo 10 triệu/năm (sách, khóa học, conference)',
      'Flexible working hours (core hours 10:00 – 16:00)',
      '20 ngày phép/năm + birthday leave',
      'Team building hàng quý, du lịch công ty hàng năm',
    ],
    applicationProcess: [
      'Vòng 1: Technical interview online (60 phút – coding + Q&A)',
      'Vòng 2: System design + culture fit với CTO (90 phút)',
      'Offer trong 3 ngày làm việc',
    ],
    tags:             ['react', 'nodejs', 'typescript', 'fullstack', 'senior', 'fintech', 'hcmc'],
    status:           'active',
    deadline:         new Date('2026-06-30'),
    viewCount:        312,
    applicationCount: 18,
  },

  // ── JOB 2: TechViet – Data Scientist ──────────────────────────
  {
    jobId:     '60000000-0000-0000-0000-000000000002',
    companyId: '50000000-0000-0000-0000-000000000001',
    companyInfo: {
      name:     'TechViet JSC',
      logoUrl:  null,
      industry: 'Công nghệ Thông tin',
      size:     '200-500',
    },
    title:    'Data Scientist (Machine Learning)',
    level:    'Mid-level',
    jobType:  ['Full-time'],
    workMode: 'Remote',
    location: { city: 'TP.HCM', district: 'Quận 1', address: 'Tầng 8, 123 Lê Lợi', isRemoteAllowed: true },
    salary:   { min: 25000000, max: 42000000, currency: 'VND', isNegotiable: true, isPublic: true },
    description: 'Tham gia đội AI/ML của TechViet để xây dựng các models thông minh cho credit scoring, fraud detection và personalization. Bạn sẽ làm việc trực tiếp với data engineers và product managers để biến dữ liệu thành giá trị kinh doanh thực sự.\n\n**Trách nhiệm:**\n- Xây dựng và deploy ML models cho credit scoring và fraud detection\n- Phân tích dữ liệu hàng triệu giao dịch/ngày để tìm insight\n- Tối ưu data pipeline với Apache Spark và Kafka\n- Thực hiện A/B testing và model evaluation\n- Trình bày kết quả cho stakeholders',
    requirements: {
      skills: [
        { name: 'Python',         level: 'Advanced',     isRequired: true  },
        { name: 'SQL',            level: 'Advanced',     isRequired: true  },
        { name: 'Scikit-learn',   level: 'Intermediate', isRequired: true  },
        { name: 'Pandas',         level: 'Advanced',     isRequired: true  },
        { name: 'NumPy',          level: 'Intermediate', isRequired: true  },
        { name: 'TensorFlow',     level: 'Beginner',     isRequired: false },
        { name: 'Apache Spark',   level: 'Beginner',     isRequired: false },
        { name: 'AWS SageMaker',  level: 'Beginner',     isRequired: false },
      ],
      yearsOfExperience:    { min: 2, max: 5 },
      education:            'Thạc sĩ KHMT, Thống kê, Toán học hoặc tương đương',
      languageRequirements: ['Tiếng Anh (đọc viết tài liệu kỹ thuật)'],
    },
    benefits: [
      'Remote 100% hoặc hybrid tùy chọn',
      'Stock options sau 1 năm',
      'AWS credits cho nghiên cứu và thử nghiệm',
      'Tham gia hội nghị quốc tế (NeurIPS, ICML) hàng năm',
      'Thưởng theo dự án (project bonus)',
      'Subscription academic papers (Springer, IEEE)',
    ],
    applicationProcess: [
      'Vòng 1: Phone/video screening về ML fundamentals (45 phút)',
      'Vòng 2: Take-home case study (48 giờ)',
      'Vòng 3: Case study presentation + Q&A với CTO (90 phút)',
    ],
    tags:             ['python', 'machinelearning', 'datascience', 'remote', 'fintech', 'ai'],
    status:           'active',
    deadline:         new Date('2026-07-15'),
    viewCount:        241,
    applicationCount: 12,
  },

  // ── JOB 3: FinTech – Senior Mobile App Developer ───────────────
  {
    jobId:     '60000000-0000-0000-0000-000000000003',
    companyId: '50000000-0000-0000-0000-000000000002',
    companyInfo: {
      name:     'FinTech Solutions Vietnam',
      logoUrl:  null,
      industry: 'Tài chính - Ngân hàng',
      size:     '50-200',
    },
    title:    'Senior Mobile App Developer (iOS/Android)',
    level:    'Senior',
    jobType:  ['Full-time'],
    workMode: 'Onsite',
    location: { city: 'TP.HCM', district: 'Quận 1', address: 'Tầng 12, Vincom Center, 72 Lê Thánh Tôn', isRemoteAllowed: false },
    salary:   { min: 32000000, max: 55000000, currency: 'VND', isNegotiable: true, isPublic: true },
    description: 'FinTech tuyển Senior Mobile Developer để dẫn dắt phát triển ứng dụng thanh toán di động (iOS + Android) phục vụ 500K+ người dùng. Bạn sẽ là mobile tech lead, phụ trách cả native development lẫn kiến trúc.',
    requirements: {
      skills: [
        { name: 'iOS Development',     level: 'Advanced', isRequired: true  },
        { name: 'Android Development', level: 'Advanced', isRequired: true  },
        { name: 'Swift',               level: 'Advanced', isRequired: true  },
        { name: 'Kotlin',              level: 'Advanced', isRequired: true  },
        { name: 'React Native',        level: 'Intermediate', isRequired: false },
        { name: 'Firebase',            level: 'Intermediate', isRequired: false },
        { name: 'REST APIs',           level: 'Advanced', isRequired: true  },
      ],
      yearsOfExperience:    { min: 4, max: null },
      education:            'Cử nhân CNTT hoặc Kỹ thuật phần mềm',
      languageRequirements: ['Tiếng Anh (giao tiếp kỹ thuật)'],
    },
    benefits: [
      'Cơ hội làm mobile tech lead cho product 500K+ users',
      'MacBook Pro M3 + iPhone 15 Pro (thiết bị test)',
      'Bảo hiểm sức khỏe VBI Premium',
      'Lương tháng 13 + performance bonus',
      'Budget học tập 8 triệu/năm',
      'Happy hour hàng tuần, team building hàng quý',
    ],
    applicationProcess: [
      'Vòng 1: Portfolio review + technical Q&A (online, 45 phút)',
      'Vòng 2: Onsite coding challenge + architecture discussion',
    ],
    tags:             ['ios', 'android', 'swift', 'kotlin', 'mobile', 'senior', 'fintech', 'hcmc'],
    status:           'active',
    deadline:         new Date('2026-06-20'),
    viewCount:        178,
    applicationCount: 9,
  },

  // ── JOB 4: VinCommerce – DevOps/Cloud Engineer ────────────────
  {
    jobId:     '60000000-0000-0000-0000-000000000004',
    companyId: '50000000-0000-0000-0000-000000000003',
    companyInfo: {
      name:     'VinCommerce',
      logoUrl:  null,
      industry: 'Bán lẻ',
      size:     '500+',
    },
    title:    'DevOps/Cloud Engineer',
    level:    'Mid-level',
    jobType:  ['Full-time'],
    workMode: 'Hybrid',
    location: { city: 'Hà Nội', district: 'Hai Bà Trưng', address: 'Tòa nhà Vincom, 191 Bà Triệu', isRemoteAllowed: true },
    salary:   { min: 28000000, max: 48000000, currency: 'VND', isNegotiable: false, isPublic: true },
    description: 'VinCommerce đang số hóa toàn bộ chuỗi cung ứng và vận hành 3,500+ cửa hàng. Chúng tôi cần DevOps Engineer để xây dựng và vận hành hạ tầng cloud hiện đại, đảm bảo hệ thống luôn sẵn sàng phục vụ hàng triệu giao dịch mỗi ngày.',
    requirements: {
      skills: [
        { name: 'AWS',         level: 'Advanced',     isRequired: true  },
        { name: 'Kubernetes',  level: 'Intermediate', isRequired: true  },
        { name: 'Docker',      level: 'Advanced',     isRequired: true  },
        { name: 'Terraform',   level: 'Intermediate', isRequired: true  },
        { name: 'Jenkins',     level: 'Intermediate', isRequired: false },
        { name: 'Prometheus',  level: 'Beginner',     isRequired: false },
        { name: 'Linux',       level: 'Advanced',     isRequired: true  },
        { name: 'Bash',        level: 'Intermediate', isRequired: true  },
      ],
      yearsOfExperience:    { min: 3, max: 7 },
      education:            'Cử nhân CNTT hoặc Mạng máy tính',
      languageRequirements: ['Tiếng Anh (đọc tài liệu kỹ thuật)'],
    },
    benefits: [
      'Làm việc với infrastructure quy mô top-5 Vietnam',
      'Bảo hiểm sức khỏe Bảo Việt + PVI',
      'Lương tháng 13 đảm bảo',
      'Hybrid 3 ngày onsite/2 ngày WFH',
      'Canteen nội bộ miễn phí',
      'Học phí con em nhân viên (chính sách tập đoàn VinGroup)',
    ],
    applicationProcess: [
      'Vòng 1: Online technical test (AWS, K8s, Linux – 60 phút)',
      'Vòng 2: Onsite interview với Head of Infrastructure',
    ],
    tags:             ['devops', 'aws', 'kubernetes', 'terraform', 'cloud', 'hanoi'],
    status:           'active',
    deadline:         new Date('2026-05-31'),
    viewCount:        143,
    applicationCount: 7,
  },

  // ── JOB 5: MB Bank – Java Backend Developer ───────────────────
  {
    jobId:     '60000000-0000-0000-0000-000000000005',
    companyId: '50000000-0000-0000-0000-000000000004',
    companyInfo: {
      name:     'MB Bank',
      logoUrl:  null,
      industry: 'Ngân hàng',
      size:     '500+',
    },
    title:    'Java Backend Developer',
    level:    'Junior',
    jobType:  ['Full-time'],
    workMode: 'Onsite',
    location: { city: 'Hà Nội', district: 'Đống Đa', address: 'Số 21 Cát Linh', isRemoteAllowed: false },
    salary:   { min: 15000000, max: 25000000, currency: 'VND', isNegotiable: true, isPublic: true },
    description: 'MB Bank tuyển Java Backend Developer để tham gia phát triển App MBBank – ứng dụng ngân hàng số top 3 Việt Nam với 15 triệu người dùng. Đây là cơ hội tuyệt vời để làm việc với hệ thống tài chính quy mô lớn và học hỏi về banking technology.',
    requirements: {
      skills: [
        { name: 'Java',         level: 'Intermediate', isRequired: true  },
        { name: 'Spring Boot',  level: 'Intermediate', isRequired: true  },
        { name: 'SQL',          level: 'Intermediate', isRequired: true  },
        { name: 'REST APIs',    level: 'Intermediate', isRequired: true  },
        { name: 'Git',          level: 'Beginner',     isRequired: true  },
        { name: 'MySQL',        level: 'Beginner',     isRequired: false },
        { name: 'Redis',        level: 'Beginner',     isRequired: false },
      ],
      yearsOfExperience:    { min: 0, max: 2 },
      education:            'Cử nhân CNTT hoặc Kỹ thuật phần mềm',
      languageRequirements: ['Tiếng Anh (đọc hiểu tài liệu kỹ thuật)'],
    },
    benefits: [
      'Làm việc với hệ thống banking quy mô 15 triệu users',
      'Bảo hiểm sức khỏe toàn diện (BHYT + BHXH + sức khỏe bổ sung)',
      'Lương tháng 13 + thưởng tết',
      'Đào tạo bài bản về banking technology và security',
      'Vay vốn ưu đãi dành cho nhân viên MB Bank',
      'Canteen nội bộ, gym, parking miễn phí',
    ],
    applicationProcess: [
      'Vòng 1: Online test Java & OOP (45 phút)',
      'Vòng 2: Interview kỹ thuật với Tech Lead',
      'Vòng 3: HR interview',
    ],
    tags:             ['java', 'spring', 'backend', 'junior', 'banking', 'hanoi'],
    status:           'active',
    deadline:         new Date('2026-06-05'),
    viewCount:        267,
    applicationCount: 16,
  },

  // ── JOB 6: FPT Software – .NET Developer Fresher ─────────────
  {
    jobId:     '60000000-0000-0000-0000-000000000006',
    companyId: '50000000-0000-0000-0000-000000000005',
    companyInfo: {
      name:     'FPT Software',
      logoUrl:  null,
      industry: 'Công nghệ Thông tin',
      size:     '500+',
    },
    title:    '.NET Developer (Fresher/Junior)',
    level:    'Fresher/Junior',
    jobType:  ['Full-time'],
    workMode: 'Hybrid',
    location: { city: 'Hà Nội', district: 'Cầu Giấy', address: 'FPT Tower, 10 Phạm Văn Bạch', isRemoteAllowed: true },
    salary:   { min: 10000000, max: 18000000, currency: 'VND', isNegotiable: false, isPublic: true },
    description: 'FPT Software tuyển Fresher/Junior .NET Developer cho dự án outsourcing với khách hàng châu Âu và Bắc Mỹ. Bạn sẽ được đào tạo bài bản trong 3 tháng, có mentor 1-1 là Senior Developer với 5+ năm kinh nghiệm.',
    requirements: {
      skills: [
        { name: 'C#',               level: 'Beginner',     isRequired: true  },
        { name: '.NET Core',        level: 'Beginner',     isRequired: true  },
        { name: 'SQL',              level: 'Beginner',     isRequired: false },
        { name: 'HTML',             level: 'Beginner',     isRequired: false },
        { name: 'CSS',              level: 'Beginner',     isRequired: false },
        { name: 'Git',              level: 'Beginner',     isRequired: false },
      ],
      yearsOfExperience:    { min: 0, max: 1 },
      education:            'Cử nhân CNTT mới tốt nghiệp (2024-2025)',
      languageRequirements: ['Tiếng Anh (giao tiếp cơ bản với khách hàng nước ngoài) – BẮT BUỘC'],
    },
    benefits: [
      'Đào tạo 3 tháng có lương (không bị trừ sau đó)',
      'Mentor 1-1 với Senior Developer',
      'Cơ hội onsite tại Nhật Bản, châu Âu sau 1 năm',
      'Lộ trình thăng tiến rõ ràng: Fresher → Junior → Mid trong 18 tháng',
      'English class và TOEIC preparation miễn phí',
      'Bảo hiểm sức khỏe từ ngày đầu làm việc',
    ],
    applicationProcess: [
      'Vòng 1: Online test (IQ + English + C# basics – 60 phút)',
      'Vòng 2: Interview kỹ thuật cơ bản + English test speaking',
    ],
    tags:             ['dotnet', 'csharp', 'fresher', 'junior', 'training', 'outsourcing', 'hanoi'],
    status:           'active',
    deadline:         new Date('2026-06-25'),
    viewCount:        389,
    applicationCount: 24,
  },

  // ── JOB 7: TechViet – UX/UI Designer (CLOSED) ────────────────
  {
    jobId:     '60000000-0000-0000-0000-000000000007',
    companyId: '50000000-0000-0000-0000-000000000001',
    companyInfo: {
      name:     'TechViet JSC',
      logoUrl:  null,
      industry: 'Công nghệ Thông tin',
      size:     '200-500',
    },
    title:    'UX/UI Designer',
    level:    'Mid-level',
    jobType:  ['Part-time'],
    workMode: 'Remote',
    location: { city: 'Toàn quốc', isRemoteAllowed: true },
    salary:   { min: 18000000, max: 32000000, currency: 'VND', isNegotiable: true, isPublic: true },
    description: 'TechViet cần UX/UI Designer cho vị trí part-time để thiết kế giao diện ứng dụng Fintech. Vị trí đã được lấp đầy và job listing đã đóng.',
    requirements: {
      skills: [
        { name: 'Figma',         level: 'Advanced', isRequired: true  },
        { name: 'Adobe XD',      level: 'Intermediate', isRequired: false },
        { name: 'UX Research',   level: 'Intermediate', isRequired: true  },
        { name: 'Prototyping',   level: 'Advanced', isRequired: true  },
      ],
      yearsOfExperience:    { min: 2, max: 5 },
      education:            'Cử nhân Thiết kế hoặc tương đương',
      languageRequirements: [],
    },
    benefits: [
      'Remote 100%',
      'Flexible hours',
      'Portfolio đa dạng dự án Fintech',
    ],
    applicationProcess: ['Portfolio review', 'Video interview'],
    tags:    ['uxui', 'design', 'figma', 'remote', 'parttime'],
    status:  'closed',
    deadline: new Date('2026-04-30'),
    viewCount:        156,
    applicationCount: 11,
  },

  // ── JOB 8: FinTech – QA Automation Engineer ───────────────────
  {
    jobId:     '60000000-0000-0000-0000-000000000008',
    companyId: '50000000-0000-0000-0000-000000000002',
    companyInfo: {
      name:     'FinTech Solutions Vietnam',
      logoUrl:  null,
      industry: 'Tài chính - Ngân hàng',
      size:     '50-200',
    },
    title:    'QA Automation Engineer',
    level:    'Senior',
    jobType:  ['Full-time'],
    workMode: 'Onsite',
    location: { city: 'TP.HCM', district: 'Quận 1', address: 'Tầng 12, Vincom Center, 72 Lê Thánh Tôn', isRemoteAllowed: false },
    salary:   { min: 30000000, max: 50000000, currency: 'VND', isNegotiable: true, isPublic: true },
    description: 'Tham gia đội QA Engineering của FinTech để xây dựng automation testing framework đảm bảo chất lượng cho ứng dụng thanh toán. Vị trí Senior với nhiều cơ hội ảnh hưởng đến engineering culture.',
    requirements: {
      skills: [
        { name: 'Selenium',    level: 'Advanced',     isRequired: true  },
        { name: 'Playwright',  level: 'Intermediate', isRequired: false },
        { name: 'Python',      level: 'Intermediate', isRequired: true  },
        { name: 'Java',        level: 'Intermediate', isRequired: false },
        { name: 'SQL',         level: 'Intermediate', isRequired: true  },
        { name: 'CI/CD',       level: 'Intermediate', isRequired: true  },
        { name: 'API Testing', level: 'Advanced',     isRequired: true  },
        { name: 'Performance Testing', level: 'Intermediate', isRequired: false },
      ],
      yearsOfExperience:    { min: 4, max: null },
      education:            'Cử nhân CNTT',
      languageRequirements: ['Tiếng Anh (đọc tài liệu kỹ thuật)'],
    },
    benefits: [
      'Ownership của toàn bộ testing strategy',
      'Budget tooling và automation không giới hạn',
      'Conference budget (STPCon, Agile Testing Days)',
      'Bảo hiểm sức khỏe VBI Premium',
      'Stock options',
    ],
    applicationProcess: [
      'Vòng 1: Technical screening (automation testing concepts)',
      'Vòng 2: Practical test – viết test script thực tế',
      'Vòng 3: Culture fit với CTO',
    ],
    tags:             ['qa', 'automation', 'selenium', 'testing', 'senior', 'hcmc', 'fintech'],
    status:           'active',
    deadline:         new Date('2026-07-01'),
    viewCount:        112,
    applicationCount: 8,
  },

  // ── JOB 9: VinCommerce – Business Analyst ─────────────────────
  {
    jobId:     '60000000-0000-0000-0000-000000000009',
    companyId: '50000000-0000-0000-0000-000000000003',
    companyInfo: {
      name:     'VinCommerce',
      logoUrl:  null,
      industry: 'Bán lẻ',
      size:     '500+',
    },
    title:    'Business Analyst (IT/Digital)',
    level:    'Mid-level',
    jobType:  ['Full-time'],
    workMode: 'Hybrid',
    location: { city: 'Hà Nội', district: 'Hai Bà Trưng', address: 'Tòa nhà Vincom, 191 Bà Triệu', isRemoteAllowed: true },
    salary:   { min: 22000000, max: 38000000, currency: 'VND', isNegotiable: true, isPublic: true },
    description: 'VinCommerce tuyển Business Analyst để hỗ trợ số hóa quy trình bán lẻ và supply chain. Bạn sẽ là cầu nối giữa đội kinh doanh và IT, đảm bảo các dự án công nghệ đáp ứng đúng nhu cầu business.',
    requirements: {
      skills: [
        { name: 'Requirements Analysis', level: 'Advanced', isRequired: true },
        { name: 'SQL',                   level: 'Intermediate', isRequired: true },
        { name: 'Excel/Power BI',        level: 'Advanced', isRequired: true },
        { name: 'UML/BPMN',              level: 'Intermediate', isRequired: true },
        { name: 'Agile/Scrum',           level: 'Intermediate', isRequired: false },
        { name: 'Jira',                  level: 'Intermediate', isRequired: false },
      ],
      yearsOfExperience:    { min: 2, max: 5 },
      education:            'Cử nhân CNTT, Quản trị kinh doanh hoặc tương đương',
      languageRequirements: ['Tiếng Anh (đọc viết tài liệu)'],
    },
    benefits: [
      'Môi trường tập đoàn lớn, dự án quy mô cả nước',
      'Bảo hiểm sức khỏe Bảo Việt + PVI',
      'Hybrid 3 ngày office / 2 ngày WFH',
      'Lương tháng 13 đảm bảo',
      'Đào tạo chứng chỉ BA (CBAP, PMI-PBA) theo lộ trình',
    ],
    applicationProcess: [
      'Vòng 1: CV screening + phone call với HR',
      'Vòng 2: Case study interview với IT Manager',
    ],
    tags:             ['businessanalyst', 'ba', 'sql', 'retail', 'digital', 'hanoi'],
    status:           'active',
    deadline:         new Date('2026-06-15'),
    viewCount:        198,
    applicationCount: 13,
  },

  // ── JOB 10: FPT – AI/ML Engineer ─────────────────────────────
  {
    jobId:     '60000000-0000-0000-0000-00000000000a',
    companyId: '50000000-0000-0000-0000-000000000005',
    companyInfo: {
      name:     'FPT Software',
      logoUrl:  null,
      industry: 'Công nghệ Thông tin',
      size:     '500+',
    },
    title:    'AI/ML Engineer (LLM/GenAI)',
    level:    'Senior',
    jobType:  ['Full-time'],
    workMode: 'Remote',
    location: { city: 'Toàn quốc', isRemoteAllowed: true },
    salary:   { min: 42000000, max: 75000000, currency: 'VND', isNegotiable: true, isPublic: true },
    description: 'FPT Software AI Lab đang tìm kiếm AI/ML Engineer xuất sắc để xây dựng các sản phẩm AI thế hệ mới ứng dụng LLM và GenAI. Bạn sẽ nghiên cứu và triển khai các solution AI cho khách hàng Fortune 500.\n\n**Trách nhiệm:**\n- Xây dựng và fine-tune LLM models cho các use case doanh nghiệp\n- Thiết kế RAG (Retrieval Augmented Generation) pipelines\n- Deploy AI models lên production với MLOps practices\n- Nghiên cứu và áp dụng state-of-the-art AI techniques\n- Trình bày technical solutions cho khách hàng quốc tế',
    requirements: {
      skills: [
        { name: 'Python',        level: 'Expert',       isRequired: true  },
        { name: 'PyTorch',       level: 'Advanced',     isRequired: true  },
        { name: 'TensorFlow',    level: 'Intermediate', isRequired: false },
        { name: 'LLM/Transformers', level: 'Advanced',  isRequired: true  },
        { name: 'MLOps',         level: 'Intermediate', isRequired: true  },
        { name: 'AWS/GCP',       level: 'Intermediate', isRequired: true  },
        { name: 'Docker',        level: 'Intermediate', isRequired: true  },
        { name: 'SQL',           level: 'Intermediate', isRequired: false },
      ],
      yearsOfExperience:    { min: 4, max: null },
      education:            'Thạc sĩ hoặc Tiến sĩ KHMT, AI, Toán học',
      languageRequirements: ['Tiếng Anh (giao tiếp với khách hàng nước ngoài) – BẮT BUỘC'],
    },
    benefits: [
      'Remote 100%, làm việc với AI Research team đẳng cấp thế giới',
      'Top-tier GPU cluster cho training và experimentation',
      'Đăng ký tham gia NeurIPS, ICML, ACL hàng năm',
      'Publication budget cho nghiên cứu',
      'Stock options và performance bonus hàng quý',
      'Visa support nếu muốn relocate sang Mỹ/Nhật',
    ],
    applicationProcess: [
      'Vòng 1: Technical screening (ML/DL fundamentals, 60 phút)',
      'Vòng 2: AI project demo hoặc published paper review',
      'Vòng 3: System design + culture fit với AI Lab Director',
    ],
    tags:             ['ai', 'ml', 'llm', 'genai', 'python', 'pytorch', 'senior', 'remote'],
    status:           'active',
    deadline:         new Date('2026-07-30'),
    viewCount:        456,
    applicationCount: 6,
  },
];

const jobResult = db.job_postings.insertMany(jobPostings);
print(`[MongoDB] Inserted ${jobResult.insertedCount} job postings`);

// ─── COMPANY REVIEWS ──────────────────────────────────────────
const companyReviews = [
  {
    companyId:   '50000000-0000-0000-0000-000000000001',
    candidateId: '40000000-0000-0000-0000-000000000001',
    isAnonymous: false,
    ratings: { overall: 4, culture: 5, management: 4, workLifeBalance: 3, salary: 4, careerGrowth: 5 },
    title:   'Startup năng động, nhiều cơ hội phát triển kỹ thuật',
    content: 'Làm việc tại TechViet 1.5 năm trong vai trò Tech Lead. Văn hóa công ty rất trẻ trung, mọi người đều đam mê công nghệ. Được làm việc với stack hiện đại (K8s, microservices, event-driven architecture). Engineering culture tốt – code review nghiêm túc, có design doc cho feature lớn.\n\nWorkload khá cao đặc biệt khi gần deadline sprint, nhưng management support hợp lý. Lương competitive với thị trường startup.',
    pros:  'Công nghệ mới, team chất lượng, growth nhanh, engineering culture tốt',
    cons:  'Workload cao vào sprint cuối, work-life balance cần cải thiện',
    jobTitle:         'Technical Lead',
    employmentStatus: 'current',
    employmentPeriod: { startDate: new Date('2022-01-01'), endDate: null },
    isApproved:    true,
    helpfulCount:  31,
    notHelpfulCount: 2,
    createdAt: new Date('2026-03-15T10:00:00Z'),
    updatedAt: new Date('2026-03-15T10:00:00Z'),
  },
  {
    companyId:   '50000000-0000-0000-0000-000000000001',
    candidateId: '40000000-0000-0000-0000-000000000002',
    isAnonymous: true,
    ratings: { overall: 5, culture: 5, management: 5, workLifeBalance: 4, salary: 5, careerGrowth: 5 },
    title:   'Môi trường tốt nhất cho Data Scientist ở Việt Nam',
    content: 'Sau 3 vòng phỏng vấn và nhận được offer rất tốt, tôi rất ấn tượng với cách TechViet đối xử với Data Scientists. Data team có đủ tool (AWS SageMaker, Databricks), data quality tốt, và management hiểu giá trị của data-driven decisions.\n\nĐây là nơi tôi thực sự có thể làm impactful ML work, không chỉ làm "data janitor".',
    pros:  'Data infrastructure tốt, management hiểu ML, career growth nhanh, lương top market',
    cons:  'Deadline khá tight, đôi khi yêu cầu thay đổi requirements giữa sprint',
    jobTitle:         'Data Scientist',
    employmentStatus: 'current',
    employmentPeriod: { startDate: new Date('2026-05-01'), endDate: null },
    isApproved:    true,
    helpfulCount:  47,
    notHelpfulCount: 1,
    createdAt: new Date('2026-05-10T14:00:00Z'),
    updatedAt: new Date('2026-05-10T14:00:00Z'),
  },
  {
    companyId:   '50000000-0000-0000-0000-000000000002',
    candidateId: '40000000-0000-0000-0000-000000000004',
    isAnonymous: false,
    ratings: { overall: 4, culture: 4, management: 4, workLifeBalance: 3, salary: 4, careerGrowth: 4 },
    title:   'Startup fintech nhanh nhẹn, sản phẩm thực sự impact',
    content: 'FinTech Solutions là môi trường làm việc tốt cho engineer muốn làm việc với sản phẩm thực sự ảnh hưởng đến cuộc sống người dùng. App có 500K users thực sự sử dụng hàng ngày, rất motivating.\n\nTeam mobile nhỏ (4 người) nên mỗi người có ownership lớn. Code quality được chú trọng – có code review, unit testing requirement. Đôi khi on-call duty vào cuối tuần.',
    pros:  'Ownership cao, sản phẩm impact thực sự, team chất lượng, lương tốt',
    cons:  'On-call cuối tuần, team nhỏ nên khối lượng công việc lớn',
    jobTitle:         'Senior Mobile Developer',
    employmentStatus: 'former',
    employmentPeriod: { startDate: new Date('2022-03-01'), endDate: new Date('2024-12-31') },
    isApproved:    true,
    helpfulCount:  22,
    notHelpfulCount: 3,
    createdAt: new Date('2025-01-10T09:00:00Z'),
    updatedAt: new Date('2025-01-10T09:00:00Z'),
  },
  {
    companyId:   '50000000-0000-0000-0000-000000000003',
    candidateId: '40000000-0000-0000-0000-000000000003',
    isAnonymous: false,
    ratings: { overall: 3, culture: 2, management: 3, workLifeBalance: 4, salary: 3, careerGrowth: 2 },
    title:   'Tập đoàn lớn – ổn định nhưng chuyển đổi số còn chậm',
    content: 'VinCommerce là tập đoàn bán lẻ lớn nhất Việt Nam nhưng infrastructure IT còn đang trong quá trình chuyển đổi. Tech stack đa dạng (một số hệ thống cũ), nhiều quy trình cần follow.\n\nƯu điểm: Ổn định, phúc lợi theo tập đoàn VinGroup rất tốt, cân bằng công việc-cuộc sống tốt hơn startup.\n\nNhược điểm: Tốc độ ra quyết định chậm, cơ hội học công nghệ mới hạn chế, lương thấp hơn tech company thuần túy.',
    pros:  'Ổn định, phúc lợi tốt (VinGroup), work-life balance',
    cons:  'Bureaucracy, legacy systems, lương thấp hơn, thăng tiến chậm',
    jobTitle:         'Senior DevOps Engineer',
    employmentStatus: 'current',
    employmentPeriod: { startDate: new Date('2026-05-01'), endDate: null },
    isApproved:    true,
    helpfulCount:  18,
    notHelpfulCount: 4,
    createdAt: new Date('2026-05-12T11:00:00Z'),
    updatedAt: new Date('2026-05-12T11:00:00Z'),
  },
  {
    companyId:   '50000000-0000-0000-0000-000000000005',
    candidateId: '40000000-0000-0000-0000-000000000005',
    isAnonymous: false,
    ratings: { overall: 5, culture: 5, management: 5, workLifeBalance: 4, salary: 4, careerGrowth: 5 },
    title:   'Chương trình đào tạo fresher tốt nhất Việt Nam',
    content: 'Tôi intern tại FPT Software được 3 tháng trong chương trình fresher .NET. Môi trường học tập cực kỳ tốt – có mentor 1-1 chuyên tâm, tài liệu training bài bản, code review nghiêm túc giúp improve nhanh chóng.\n\nĐược làm dự án thực tế với khách hàng nước ngoài (Nhật Bản), improve English rõ rệt. Văn hóa công ty trẻ, friendly. Lương intern thấp nhưng sau khi convert full-time tăng đáng kể.\n\nHighly recommend cho các bạn fresher!',
    pros:  'Đào tạo bài bản, mentor 1-1, dự án thực tế, cơ hội onsite, improve English',
    cons:  'Lương khởi điểm thấp, nhiều overtime gần deadline, một số quy trình hơi bureaucratic',
    jobTitle:         'Intern .NET Developer',
    employmentStatus: 'former',
    employmentPeriod: { startDate: new Date('2024-06-01'), endDate: new Date('2024-08-31') },
    isApproved:    true,
    helpfulCount:  56,
    notHelpfulCount: 0,
    createdAt: new Date('2024-09-05T11:00:00Z'),
    updatedAt: new Date('2024-09-05T11:00:00Z'),
  },
  {
    companyId:   '50000000-0000-0000-0000-000000000004',
    candidateId: '40000000-0000-0000-0000-000000000004',
    isAnonymous: true,
    ratings: { overall: 4, culture: 4, management: 3, workLifeBalance: 4, salary: 3, careerGrowth: 3 },
    title:   'Ngân hàng số đang phát triển mạnh – cơ hội tốt cho Java dev',
    content: 'MB Bank đang đầu tư rất lớn vào công nghệ – App MBBank nổi tiếng là ứng dụng ngân hàng tốt nhất Việt Nam. Môi trường làm việc chuyên nghiệp, quy trình rõ ràng, đồng nghiệp có chuyên môn.\n\nHệ thống core banking phức tạp, học được nhiều về banking technology và security. Tuy nhiên lương thấp hơn tech startup khoảng 20-30%. Cân bằng công việc-cuộc sống tốt, ít overtime.',
    pros:  'Môi trường chuyên nghiệp, hệ thống phức tạp để học, work-life balance tốt, ổn định',
    cons:  'Lương thấp hơn tech startup, thăng tiến theo seniority hơn là merit',
    jobTitle:         'Java Backend Developer',
    employmentStatus: 'former',
    employmentPeriod: { startDate: new Date('2021-06-01'), endDate: new Date('2024-03-31') },
    isApproved:    true,
    helpfulCount:  29,
    notHelpfulCount: 3,
    createdAt: new Date('2024-04-20T10:00:00Z'),
    updatedAt: new Date('2024-04-20T10:00:00Z'),
  },
];

const reviewResult = db.company_reviews.insertMany(companyReviews);
print(`[MongoDB] Inserted ${reviewResult.insertedCount} company reviews`);

// ─── RECREATE INDEXES ──────────────────────────────────────────
print('[MongoDB] Recreating text search indexes...');

try { db.candidate_profiles.dropIndex('idx_candidate_fulltext'); } catch (e) {}
try { db.job_postings.dropIndex('idx_job_fulltext'); } catch (e) {}
try { db.job_postings.dropIndex('job_fulltext'); } catch (e) {}

db.candidate_profiles.createIndex(
  { 'personalInfo.fullName': 'text', 'summary': 'text', 'skills.name': 'text' },
  { name: 'idx_candidate_fulltext', default_language: 'none',
    weights: { 'personalInfo.fullName': 10, 'summary': 5, 'skills.name': 3 } }
);

db.job_postings.createIndex(
  { title: 'text', description: 'text', 'requirements.skills.name': 'text', tags: 'text' },
  { name: 'idx_job_fulltext', default_language: 'none',
    weights: { title: 10, 'requirements.skills.name': 5, description: 3, tags: 2 } }
);

print('[MongoDB] Indexes created successfully!');

// ─── FINAL STATS ───────────────────────────────────────────────
print('==============================================');
print('  SRS MongoDB Seed – Demo Data Loaded!');
print(`  Candidate Profiles: ${db.candidate_profiles.countDocuments()}`);
print(`  Job Postings:       ${db.job_postings.countDocuments()}`);
print(`  Company Reviews:    ${db.company_reviews.countDocuments()}`);
print('==============================================');

// Quick sanity check
const c1 = db.candidate_profiles.findOne({ candidateId: '40000000-0000-0000-0000-000000000001' });
print(c1 ? `✅ candidate1: ${c1.personalInfo.fullName}` : '❌ candidate1 not found');
const j1 = db.job_postings.findOne({ jobId: '60000000-0000-0000-0000-000000000001' });
print(j1 ? `✅ job1: ${j1.title}` : '❌ job1 not found');
