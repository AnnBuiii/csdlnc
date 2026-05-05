// =============================================================
// MongoDB Seed Data – Smart Recruitment System
// Vietnamese market data for development/testing
// =============================================================

// Use the correct database
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE || 'srs_mongo');

// Clear existing data
db.candidate_profiles.deleteMany({});
db.job_postings.deleteMany({});
db.company_reviews.deleteMany({});

print('[MongoDB] Starting seed data insertion...');

// ─── CANDIDATE PROFILES ──────────────────────────────────────
const candidateProfiles = [
  {
    candidateId: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
    userId: '11111111-1111-1111-1111-111111111111',
    personalInfo: {
      fullName: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0987123456',
      location: 'Hà Nội',
      dateOfBirth: new Date('1995-05-15'),
      avatarUrl: 'https://example.com/avatars/nguyen-a.jpg'
    },
    summary: 'Senior Full-stack Developer với 5 năm kinh nghiệm. Chuyên về JavaScript/TypeScript, React, Node.js. Đã xây dựng nhiều ứng dụng web quy mô lớn cho các startup và doanh nghiệp.',
    professionalSummary: 'Từng làm Technical Lead tại TechStartup (2 năm), Senior Developer tại VNCorp (3 năm). Chịu trách nhiệm cho kiến trúc hệ thống và mentoring junior developers.',
    education: [
      {
        school: 'Đại học Bách Khoa Hà Nội',
        degree: 'Kỹ sư Công nghệ Thông tin',
        major: 'Công nghệ Thông tin',
        gpa: 3.5,
        startYear: 2013,
        endYear: 2017
      }
    ],
    experience: [
      {
        role: 'Technical Lead',
        company: 'TechStartup Vietnam',
        startDate: '2021-03',
        endDate: '2023-12',
        isCurrent: false,
        description: 'Dẫn dắt team 5 developers, thiết kế kiến trúc microservices, triển khai CI/CD pipeline.'
      },
      {
        role: 'Senior Full-stack Developer',
        company: 'VNCorp',
        startDate: '2018-01',
        endDate: '2021-02',
        isCurrent: false,
        description: 'Phát triển các ứng dụng enterprise sử dụng React, Node.js, PostgreSQL.'
      }
    ],
    skills: [
      { name: 'JavaScript', level: 'Expert', yearsOfExp: 5 },
      { name: 'TypeScript', level: 'Advanced', yearsOfExp: 4 },
      { name: 'React', level: 'Expert', yearsOfExp: 5 },
      { name: 'Node.js', level: 'Advanced', yearsOfExp: 4 },
      { name: 'Express.js', level: 'Advanced', yearsOfExp: 4 },
      { name: 'MongoDB', level: 'Intermediate', yearsOfExp: 3 },
      { name: 'PostgreSQL', level: 'Advanced', yearsOfExp: 4 },
      { name: 'AWS', level: 'Intermediate', yearsOfExp: 3 },
      { name: 'Docker', level: 'Intermediate', yearsOfExp: 3 },
      { name: 'Git', level: 'Advanced', yearsOfExp: 5 }
    ],
    certifications: [
      { name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', issueDate: '2022-06' },
      { name: 'Scrum Master Certified', issuer: 'SCRUMstudy', issueDate: '2021-03' }
    ],
    preferences: {
      jobTypes: ['Full-time', 'Contract'],
      preferredLocations: ['Hà Nội', 'Remote'],
      industries: ['Công nghệ Thông tin', 'Tài chính - Ngân hàng'],
      expectedSalary: { min: 35000000, max: 60000000, currency: 'VND' }
    },
    portfolio: [
      { title: 'GitHub', url: 'https://github.com/nguyenvana', description: 'Open source projects' },
      { title: 'LinkedIn', url: 'https://linkedin.com/in/nguyenvana', description: 'Professional profile' },
      { title: 'Personal Website', url: 'https://nguyenvana.dev', description: 'Portfolio & blog' }
    ],
    isPublic: true,
    lastViewedAt: new Date('2026-04-22T15:30:00Z'),
    viewedCount: 42,
    createdAt: new Date('2026-04-01T09:00:00Z'),
    updatedAt: new Date('2026-04-22T15:30:00Z')
  },
  {
    candidateId: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
    userId: '22222222-2222-2222-2222-222222222222',
    personalInfo: {
      fullName: 'Trần Thị B',
      email: 'tranthib@example.com',
      phone: '0978234567',
      location: 'TP.HCM',
      dateOfBirth: new Date('1998-08-22'),
      avatarUrl: 'https://example.com/avatars/tran-b.jpg'
    },
    summary: 'Data Scientist với 3 năm kinh nghiệm trong lĩnh vực Fintech. Thành thạo Python, machine learning algorithms, và data pipeline. Tốt nghiệp Thạc sĩ tại ĐH Bách Khoa Hà Nội.',
    professionalSummary: 'Chuyên về predictive modeling, customer segmentation, và fraud detection trong ngân hàng.',
    education: [
      {
        school: 'Đại học Bách Khoa Hà Nội',
        degree: 'Thạc sĩ Khoa học Dữ liệu',
        major: 'Khoa học Dữ liệu',
        gpa: 3.8,
        startYear: 2018,
        endYear: 2020
      },
      {
        school: 'Đại học Khoa học Tự nhiên',
        degree: 'Cử nhân Toán Tin',
        major: 'Toán Tin học',
        gpa: 3.6,
        startYear: 2014,
        endYear: 2018
      }
    ],
    experience: [
      {
        role: 'Data Scientist',
        company: 'FinTech Vietnam',
        startDate: '2021-06',
        endDate: null,
        isCurrent: true,
        description: 'Xây dựng ML models cho credit scoring và churn prediction. Tối ưu hóa data pipeline với Apache Spark.'
      },
      {
        role: 'Data Analyst',
        company: 'BankTech Solutions',
        startDate: '2020-01',
        endDate: '2021-05',
        isCurrent: false,
        description: 'Phân tích dữ liệu khách hàng, xây dựng dashboard với Tableau.'
      }
    ],
    skills: [
      { name: 'Python', level: 'Expert', yearsOfExp: 4 },
      { name: 'SQL', level: 'Advanced', yearsOfExp: 4 },
      { name: 'Pandas', level: 'Expert', yearsOfExp: 4 },
      { name: 'NumPy', level: 'Advanced', yearsOfExp: 4 },
      { name: 'Scikit-learn', level: 'Advanced', yearsOfExp: 3 },
      { name: 'TensorFlow', level: 'Intermediate', yearsOfExp: 2 },
      { name: 'PyTorch', level: 'Intermediate', yearsOfExp: 2 },
      { name: 'Apache Spark', level: 'Intermediate', yearsOfExp: 2 },
      { name: 'Tableau', level: 'Advanced', yearsOfExp: 3 },
      { name: 'AWS SageMaker', level: 'Intermediate', yearsOfExp: 2 }
    ],
    certifications: [
      { name: 'TensorFlow Developer Certificate', issuer: 'Google', issueDate: '2022-05' },
      { name: 'AWS Certified Machine Learning – Specialty', issuer: 'Amazon Web Services', issueDate: '2023-02' }
    ],
    preferences: {
      jobTypes: ['Full-time'],
      preferredLocations: ['TP.HCM', 'Remote'],
      industries: ['Tài chính - Ngân hàng', 'Công nghệ Thông tin'],
      expectedSalary: { min: 25000000, max: 40000000, currency: 'VND' }
    },
    portfolio: [
      { title: 'GitHub', url: 'https://github.com/tranthib', description: 'Data science projects' },
      { title: 'Kaggle', url: 'https://kaggle.com/tranthib', description: 'Competition notebooks' },
      { title: 'Medium', url: 'https://medium.com/@tranthib', description: 'Technical articles' }
    ],
    isPublic: true,
    lastViewedAt: new Date('2026-04-20T11:45:00Z'),
    viewedCount: 38,
    createdAt: new Date('2026-03-15T10:30:00Z'),
    updatedAt: new Date('2026-04-20T11:45:00Z')
  },
  {
    candidateId: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    userId: '33333333-3333-3333-3333-333333333333',
    personalInfo: {
      fullName: 'Lê Thị C',
      email: 'lethic@example.com',
      phone: '0918345678',
      location: 'Đà Nẵng',
      dateOfBirth: new Date('1992-11-10'),
      avatarUrl: 'https://example.com/avatars/le-c.jpg'
    },
    summary: 'Senior DevOps Engineer với 7 năm kinh nghiệm. Chuyên về cloud infrastructure, container orchestration, và CI/CD automation. Có chứng chỉ AWS Solutions Architect.',
    professionalSummary: 'Expertise trong thiết kế và vận hành hệ thống high-availability trên AWS và Kubernetes.',
    education: [
      {
        school: 'Đại học Công nghệ Thông tin',
        degree: 'Kỹ sư Mạng máy tính',
        major: 'Mạng máy tính',
        gpa: 3.4,
        startYear: 2010,
        endYear: 2014
      }
    ],
    experience: [
      {
        role: 'Senior DevOps Engineer',
        company: 'CloudTech Vietnam',
        startDate: '2019-08',
        endDate: null,
        isCurrent: true,
        description: 'Thiết kế và vận hành multi-region Kubernetes clusters cho ứng dụng global. Triển khai GitOps với ArgoCD.'
      },
      {
        role: 'DevOps Engineer',
        company: 'VN Hosting Solutions',
        startDate: '2016-03',
        endDate: '2019-07',
        isCurrent: false,
        description: 'Xây dựng CI/CD pipeline với Jenkins, quản lý infrastructure với Terraform.'
      },
      {
        role: 'System Administrator',
        company: 'IT Services Company',
        startDate: '2014-07',
        endDate: '2016-02',
        isCurrent: false,
        description: 'Quản trị hệ thống Linux, cấu hình network, backup solutions.'
      }
    ],
    skills: [
      { name: 'AWS', level: 'Expert', yearsOfExp: 6 },
      { name: 'Kubernetes', level: 'Expert', yearsOfExp: 5 },
      { name: 'Docker', level: 'Expert', yearsOfExp: 6 },
      { name: 'Terraform', level: 'Advanced', yearsOfExp: 4 },
      { name: 'Jenkins', level: 'Advanced', yearsOfExp: 5 },
      { name: 'GitLab CI', level: 'Intermediate', yearsOfExp: 3 },
      { name: 'Prometheus', level: 'Advanced', yearsOfExp: 4 },
      { name: 'Grafana', level: 'Advanced', yearsOfExp: 4 },
      { name: 'Linux', level: 'Expert', yearsOfExp: 8 },
      { name: 'Bash', level: 'Expert', yearsOfExp: 8 },
      { name: 'Ansible', level: 'Intermediate', yearsOfExp: 3 }
    ],
    certifications: [
      { name: 'AWS Certified Solutions Architect – Professional', issuer: 'Amazon Web Services', issueDate: '2023-01' },
      { name: 'Certified Kubernetes Administrator', issuer: 'CNCF', issueDate: '2022-08' },
      { name: 'Red Hat Certified Engineer', issuer: 'Red Hat', issueDate: '2020-05' }
    ],
    preferences: {
      jobTypes: ['Full-time', 'Contract'],
      preferredLocations: ['Đà Nẵng', 'Remote', 'Hà Nội'],
      industries: ['Công nghệ Thông tin'],
      expectedSalary: { min: 45000000, max: 70000000, currency: 'VND' }
    },
    portfolio: [
      { title: 'GitHub', url: 'https://github.com/lethic-devops', description: 'Infrastructure as code projects' },
      { title: 'LinkedIn', url: 'https://linkedin.com/in/lethic', description: 'Professional profile' },
      { title: 'DevOps Blog', url: 'https://devopsvietnam.com', description: 'Vietnamese DevOps community blog' }
    ],
    isPublic: true,
    lastViewedAt: new Date('2026-04-18T14:20:00Z'),
    viewedCount: 56,
    createdAt: new Date('2026-02-20T08:15:00Z'),
    updatedAt: new Date('2026-04-18T14:20:00Z')
  },
  {
    candidateId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
    userId: '44444444-4444-4444-4444-444444444444',
    personalInfo: {
      fullName: 'Phạm Văn D',
      email: 'phamd@example.com',
      phone: '0969456789',
      location: 'Hà Nội',
      dateOfBirth: new Date('1996-03-28'),
      avatarUrl: 'https://example.com/avatars/pham-d.jpg'
    },
    summary: 'Mobile Developer với 4 năm kinh nghiệm phát triển ứng dụng iOS và Android. Đã phát hành 10+ ứng dụng trên App Store và Google Play.',
    professionalSummary: 'Thành thạo native development với Swift/Kotlin và cross-platform với React Native.',
    education: [
      {
        school: 'Đại học FPT',
        degree: 'Cử nhân Kỹ thuật Phần mềm',
        major: 'Kỹ thuật Phần mềm',
        gpa: 3.7,
        startYear: 2014,
        endYear: 2018
      }
    ],
    experience: [
      {
        role: 'Senior Mobile Developer',
        company: 'AppStudio Vietnam',
        startDate: '2020-11',
        endDate: null,
        isCurrent: true,
        description: 'Phát triển ứng dụng mobile cho khách hàng enterprise. Tech lead cho team 3 mobile developers.'
      },
      {
        role: 'Mobile Developer',
        company: 'Startup Mobile',
        startDate: '2018-07',
        endDate: '2020-10',
        isCurrent: false,
        description: 'Phát triển ứng dụng e-commerce và social networking từ ý tưởng đến launch.'
      }
    ],
    skills: [
      { name: 'Swift', level: 'Advanced', yearsOfExp: 4 },
      { name: 'Kotlin', level: 'Advanced', yearsOfExp: 3 },
      { name: 'React Native', level: 'Intermediate', yearsOfExp: 2 },
      { name: 'Flutter', level: 'Beginner', yearsOfExp: 1 },
      { name: 'iOS Development', level: 'Advanced', yearsOfExp: 4 },
      { name: 'Android Development', level: 'Advanced', yearsOfExp: 3 },
      { name: 'Firebase', level: 'Intermediate', yearsOfExp: 3 },
      { name: 'REST APIs', level: 'Advanced', yearsOfExp: 4 },
      { name: 'Git', level: 'Advanced', yearsOfExp: 4 },
      { name: 'CI/CD (Mobile)', level: 'Intermediate', yearsOfExp: 2 }
    ],
    certifications: [
      { name: 'Apple Certified iOS Developer', issuer: 'Apple', issueDate: '2021-09' },
      { name: 'Google Associate Android Developer', issuer: 'Google', issueDate: '2020-11' }
    ],
    preferences: {
      jobTypes: ['Full-time'],
      preferredLocations: ['Hà Nội'],
      industries: ['Công nghệ Thông tin'],
      expectedSalary: { min: 30000000, max: 45000000, currency: 'VND' }
    },
    portfolio: [
      { title: 'GitHub', url: 'https://github.com/phamd-mobile', description: 'Mobile development projects' },
      { title: 'App Store', url: 'https://apps.apple.com/developer/phamd', description: 'Published iOS apps' },
      { title: 'Google Play', url: 'https://play.google.com/store/apps/developer?id=PhamD', description: 'Published Android apps' }
    ],
    isPublic: true,
    lastViewedAt: new Date('2026-04-19T16:10:00Z'),
    viewedCount: 29,
    createdAt: new Date('2026-03-10T13:45:00Z'),
    updatedAt: new Date('2026-04-19T16:10:00Z')
  },
  {
    candidateId: '11111111-1111-1111-1111-111111111112',
    userId: '55555555-5555-5555-5555-555555555555',
    personalInfo: {
      fullName: 'Văn Thị E',
      email: 'vane@example.com',
      phone: '0941567890',
      location: 'Cần Thơ',
      dateOfBirth: new Date('2000-07-05'),
      avatarUrl: 'https://example.com/avatars/van-e.jpg'
    },
    summary: 'Fresher .NET Developer mới tốt nghiệp ĐH Công nghệ TP.HCM. Nhiệt huyết, ham học hỏi, có kiến thức nền tảng vững về C#, .NET Core, và web development.',
    professionalSummary: 'Đã hoàn thành 2 internship trong quá trình học, có kinh nghiệm thực tế với ASP.NET và Entity Framework.',
    education: [
      {
        school: 'Đại học Công nghệ TP.HCM',
        degree: 'Cử nhân Công nghệ Thông tin',
        major: 'Công nghệ Thông tin',
        gpa: 3.2,
        startYear: 2021,
        endYear: 2025
      }
    ],
    experience: [
      {
        role: 'Intern .NET Developer',
        company: 'Software House Vietnam',
        startDate: '2024-06',
        endDate: '2024-08',
        isCurrent: false,
        description: 'Phát triển tính năng CRUD cho hệ thống quản lý nội bộ sử dụng ASP.NET Core và SQL Server.'
      },
      {
        role: 'Intern Web Developer',
        company: 'Local Tech Company',
        startDate: '2023-12',
        endDate: '2024-02',
        isCurrent: false,
        description: 'Xây dựng website cho khách hàng sử dụng HTML/CSS/JavaScript và PHP.'
      }
    ],
    skills: [
      { name: 'C#', level: 'Intermediate', yearsOfExp: 2 },
      { name: '.NET Core', level: 'Intermediate', yearsOfExp: 2 },
      { name: 'ASP.NET', level: 'Intermediate', yearsOfExp: 1 },
      { name: 'Entity Framework', level: 'Intermediate', yearsOfExp: 1 },
      { name: 'SQL Server', level: 'Intermediate', yearsOfExp: 2 },
      { name: 'HTML/CSS', level: 'Intermediate', yearsOfExp: 3 },
      { name: 'JavaScript', level: 'Beginner', yearsOfExp: 1 },
      { name: 'Git', level: 'Beginner', yearsOfExp: 1 },
      { name: 'Visual Studio', level: 'Intermediate', yearsOfExp: 2 }
    ],
    certifications: [
      { name: 'Microsoft Certified: .NET Fundamentals', issuer: 'Microsoft', issueDate: '2024-03' }
    ],
    preferences: {
      jobTypes: ['Full-time', 'Internship'],
      preferredLocations: ['Cần Thơ', 'TP.HCM', 'Remote'],
      industries: ['Công nghệ Thông tin'],
      expectedSalary: { min: 10000000, max: 18000000, currency: 'VND' }
    },
    portfolio: [
      { title: 'GitHub', url: 'https://github.com/vane-dotnet', description: '.NET learning projects' },
      { title: 'LinkedIn', url: 'https://linkedin.com/in/vane-fresher', description: 'Professional profile' }
    ],
    isPublic: true,
    lastViewedAt: new Date('2026-04-21T09:30:00Z'),
    viewedCount: 15,
    createdAt: new Date('2026-04-05T14:20:00Z'),
    updatedAt: new Date('2026-04-21T09:30:00Z')
  }
];

const candidateResult = db.candidate_profiles.insertMany(candidateProfiles);
print(`[MongoDB] Inserted ${candidateResult.insertedCount} candidate profiles`);

// ─── JOB POSTINGS ──────────────────────────────────────────────
const jobPostings = [
  {
    jobId: '33333333-3333-3333-3333-333333333331',
    companyId: '22222222-2222-2222-2222-222222222221',
    title: 'Senior Full-stack Developer (ReactJS/NodeJS)',
    description: 'Chúng tôi đang tìm kiếm Senior Full-stack Developer để tham gia xây dựng nền tảng Fintech hàng đầu Việt Nam. Bạn sẽ làm việc với team agile để phát triển các tính năng phức tạp, tối ưu hiệu năng hệ thống, và mentoring junior developers.\n\nTrách nhiệm:\n- Phát triển và duy trì ứng dụng web sử dụng React và Node.js\n- Thiết kế và triển khai RESTful APIs\n- Tối ưu hiệu năng ứng dụng frontend và backend\n- Tham gia code review và mentoring\n- Triển khai CI/CD pipeline',
    level: 'Senior',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    location: {
      city: 'Hà Nội',
      district: 'Cầu Giấy',
      address: 'Tòa nhà TechViet, 123 Lê Lợi'
    },
    salary: {
      min: 35000000,
      max: 60000000,
      currency: 'VND',
      isNegotiable: true,
      isPublic: true
    },
    requirements: {
      experience: '5+ năm kinh nghiệm Full-stack development',
      education: 'Cử nhân CNTT hoặc tương đương',
      skills: [
        { name: 'JavaScript', required: true, priority: 'high' },
        { name: 'TypeScript', required: true, priority: 'high' },
        { name: 'React', required: true, priority: 'high' },
        { name: 'Node.js', required: true, priority: 'high' },
        { name: 'PostgreSQL', required: true, priority: 'medium' },
        { name: 'AWS', required: false, priority: 'medium' },
        { name: 'Docker', required: false, priority: 'low' }
      ],
      languages: [
        { language: 'Tiếng Việt', level: 'Native' },
        { language: 'Tiếng Anh', level: 'Intermediate' }
      ]
    },
    benefits: [
      'Lương tháng 13 + thưởng performance',
      'Bảo hiểm sức khỏe cao cấp',
      'Đào tạo và conference budget',
      'Flexible working hours',
      'MacBook Pro M3',
      '20 ngày phép/năm'
    ],
    applicationProcess: '2 vòng phỏng vấn (technical + cultural fit)',
    deadline: new Date('2026-05-30'),
    status: 'active',
    isRemoteFriendly: true,
    viewCount: 245,
    applicationCount: 18,
    postedBy: '66666666-6666-6666-6666-666666666666',
    keywords: ['react', 'nodejs', 'fullstack', 'senior', 'fintech', 'hanoi'],
    createdAt: new Date('2026-03-15T09:00:00Z'),
    updatedAt: new Date('2026-04-22T16:30:00Z')
  },
  {
    jobId: '33333333-3333-3333-3333-333333333332',
    companyId: '22222222-2222-2222-2222-222222222221',
    title: 'Data Scientist',
    description: 'Tuyển dụng Data Scientist cho team AI/ML. Tham gia xây dựng các ML models cho credit scoring, fraud detection, và customer segmentation.\n\nTrách nhiệm:\n- Phân tích dữ liệu và xây dựng predictive models\n- Triển khai ML models vào production\n- Tối ưu data pipeline với Apache Spark\n- Hợp tác với product team để định nghĩa business requirements\n- Thực hiện A/B testing và model evaluation',
    level: 'Mid-level',
    jobType: 'Full-time',
    workMode: 'Remote',
    location: {
      city: 'TP.HCM',
      district: 'Quận 1',
      address: 'Vincom Center, 72 Lê Thánh Tôn'
    },
    salary: {
      min: 25000000,
      max: 40000000,
      currency: 'VND',
      isNegotiable: true,
      isPublic: true
    },
    requirements: {
      experience: '3+ năm kinh nghiệm Data Science/ML',
      education: 'Thạc sĩ Khoa học Dữ liệu hoặc tương đương',
      skills: [
        { name: 'Python', required: true, priority: 'high' },
        { name: 'SQL', required: true, priority: 'high' },
        { name: 'Machine Learning', required: true, priority: 'high' },
        { name: 'Pandas', required: true, priority: 'medium' },
        { name: 'Scikit-learn', required: true, priority: 'medium' },
        { name: 'TensorFlow/PyTorch', required: false, priority: 'low' }
      ]
    },
    benefits: [
      'Remote work hoàn toàn',
      'Thưởng theo dự án',
      'AWS credits cho nghiên cứu',
      'Tham gia conference quốc tế',
      'Stock options'
    ],
    deadline: new Date('2026-06-15'),
    status: 'active',
    isRemoteFriendly: true,
    viewCount: 189,
    applicationCount: 12,
    postedBy: '66666666-6666-6666-6666-666666666666',
    keywords: ['datascience', 'machinelearning', 'python', 'remote', 'fintech'],
    createdAt: new Date('2026-03-20T10:30:00Z'),
    updatedAt: new Date('2026-04-21T14:15:00Z')
  },
  {
    jobId: '33333333-3333-3333-3333-333333333336',
    companyId: '22222222-2222-2222-2222-222222222225',
    title: '.NET Developer (Fresher/Junior)',
    description: 'FPT Software tuyển dụng Fresher/Junior .NET Developer cho dự án outsourcing với khách hàng châu Âu. Đào tạo trong 3 tháng, mentorship 1-1 với senior developer.\n\nTrách nhiệm:\n- Phát triển ứng dụng web sử dụng .NET Core\n- Viết unit tests và integration tests\n- Tham gia code review\n- Học và áp dụng best practices\n- Document technical specifications',
    level: 'Fresher/Junior',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    location: {
      city: 'Hà Nội',
      district: 'Cầu Giấy',
      address: 'FPT Tower, 10 Phạm Văn Bạch'
    },
    salary: {
      min: 10000000,
      max: 18000000,
      currency: 'VND',
      isNegotiable: false,
      isPublic: true
    },
    requirements: {
      experience: '0-1 năm (fresher welcome)',
      education: 'Cử nhân CNTT mới tốt nghiệp',
      skills: [
        { name: 'C#', required: true, priority: 'high' },
        { name: '.NET Core', required: true, priority: 'high' },
        { name: 'SQL', required: false, priority: 'medium' },
        { name: 'HTML/CSS', required: false, priority: 'low' }
      ],
      languages: [
        { language: 'Tiếng Anh', level: 'Intermediate', required: true }
      ]
    },
    benefits: [
      'Đào tạo 3 tháng có lương',
      'Mentorship 1-1',
      'Cơ hội onsite tại châu Âu',
      'Lộ trình thăng tiến rõ ràng',
      'Club activities và team building'
    ],
    applicationProcess: 'Online test + 1 vòng phỏng vấn',
    deadline: new Date('2026-06-05'),
    status: 'active',
    isRemoteFriendly: false,
    viewCount: 76,
    applicationCount: 20,
    postedBy: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    keywords: ['dotnet', 'csharp', 'fresher', 'junior', 'training', 'hanoi'],
    createdAt: new Date('2026-04-01T08:00:00Z'),
    updatedAt: new Date('2026-04-23T11:20:00Z')
  }
];

const jobResult = db.job_postings.insertMany(jobPostings);
print(`[MongoDB] Inserted ${jobResult.insertedCount} job postings`);

// ─── COMPANY REVIEWS ──────────────────────────────────────────
const companyReviews = [
  {
    companyId: '22222222-2222-2222-2222-222222222221',
    candidateId: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
    isAnonymous: false,
    ratings: {
      overall: 4,
      culture: 5,
      management: 3,
      workLifeBalance: 4,
      salary: 4,
      careerGrowth: 4
    },
    title: 'Môi trường startup năng động, nhiều cơ hội học hỏi',
    content: 'Tôi làm việc tại TechViet được 2 năm. Văn hóa công ty rất trẻ trung, năng động. Có nhiều cơ hội học hỏi công nghệ mới. Lương competitive với thị trường.\n\nƯu điểm:\n- Được làm việc với công nghệ mới nhất\n- Team trẻ, nhiệt huyết\n- Lương và bonus tốt\n- Flexible working hours\n\nNhược điểm:\n- Đôi khi workload cao\n- Process chưa được chuẩn hóa hoàn toàn',
    pros: 'Công nghệ mới, team trẻ, lương tốt, flexible hours',
    cons: 'Workload cao tại thời điểm peak, process chưa chuẩn',
    jobTitle: 'Senior Full-stack Developer',
    employmentStatus: 'former',
    employmentPeriod: {
      startDate: new Date('2021-03-01'),
      endDate: new Date('2023-12-31')
    },
    isApproved: true,
    helpfulCount: 24,
    notHelpfulCount: 2,
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    companyId: '22222222-2222-2222-2222-222222222222',
    candidateId: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
    isAnonymous: true,
    ratings: {
      overall: 5,
      culture: 5,
      management: 5,
      workLifeBalance: 4,
      salary: 5,
      careerGrowth: 5
    },
    title: 'Công ty Fintech hàng đầu, đãi ngộ xuất sắc',
    content: 'FinTech Solutions là nơi làm việc tuyệt vời cho những ai đam mê công nghệ tài chính. Lương cao, bonus hấp dẫn, nhiều cơ hội thăng tiến.\n\nĐiểm nổi bật:\n- Lương cao nhất thị trường\n- Stock options giá trị\n- Được làm việc với blockchain và AI\n- Chế độ phúc lợi đỉnh cao\n- Cơ hội thăng tiến nhanh',
    pros: 'Lương cao, stock options, công nghệ cutting-edge, phúc lợi tốt',
    cons: 'Áp lực cao, đòi hỏi performance liên tục',
    jobTitle: 'Data Scientist',
    employmentStatus: 'current',
    employmentPeriod: {
      startDate: new Date('2021-06-01'),
      endDate: null
    },
    isApproved: true,
    helpfulCount: 42,
    notHelpfulCount: 1,
    createdAt: new Date('2024-02-20T14:15:00Z'),
    updatedAt: new Date('2024-02-20T14:15:00Z')
  },
  {
    companyId: '22222222-2222-2222-2222-222222222223',
    candidateId: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    isAnonymous: false,
    ratings: {
      overall: 3,
      culture: 2,
      management: 3,
      workLifeBalance: 4,
      salary: 3,
      careerGrowth: 2
    },
    title: 'Môi trường corporate, nhiều bureaucracy',
    content: 'VinCommerce là tập đoàn lớn với nhiều quy trình và bureaucracy. Phù hợp với những ai thích ổn định.\n\nƯu điểm:\n- Ổn định, ít risk\n- Work-life balance tốt\n- Phúc lợi đầy đủ theo luật\n\nNhược điểm:\n- Quy trình cồng kềnh\n- Thăng tiến chậm\n- Lương không competitive với tech companies\n- Ít cơ hội học công nghệ mới',
    pros: 'Ổn định, work-life balance, phúc lợi đầy đủ',
    cons: 'Bureaucracy, thăng tiến chậm, lương thấp',
    jobTitle: 'Senior DevOps Engineer',
    employmentStatus: 'current',
    employmentPeriod: {
      startDate: new Date('2019-08-01'),
      endDate: null
    },
    isApproved: true,
    helpfulCount: 18,
    notHelpfulCount: 5,
    createdAt: new Date('2024-03-10T09:45:00Z'),
    updatedAt: new Date('2024-03-10T09:45:00Z')
  },
  {
    companyId: '22222222-2222-2222-2222-222222222225',
    candidateId: '11111111-1111-1111-1111-111111111112',
    isAnonymous: false,
    ratings: {
      overall: 5,
      culture: 5,
      management: 5,
      workLifeBalance: 4,
      salary: 4,
      careerGrowth: 5
    },
    title: 'Tuyệt vời cho fresher và junior developers',
    content: 'FPT Software có chương trình đào tạo fresher tốt nhất Việt Nam. Mentorship 1-1, training bài bản, cơ hội onsite.\n\nTôi mới vào làm được 6 tháng nhưng đã học được rất nhiều. Được làm việc với khách hàng nước ngoài, improve English skills.\n\nRất recommend cho các bạn mới ra trường!',
    pros: 'Đào tạo bài bản, mentorship, cơ hội onsite, cải thiện tiếng Anh',
    cons: 'Lương khởi điểm thấp, nhiều overtime khi gần deadline',
    jobTitle: 'Junior .NET Developer',
    employmentStatus: 'former',
    employmentPeriod: {
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31')
    },
    isApproved: true,
    helpfulCount: 35,
    notHelpfulCount: 0,
    createdAt: new Date('2024-09-05T11:20:00Z'),
    updatedAt: new Date('2024-09-05T11:20:00Z')
  }
];

const reviewResult = db.company_reviews.insertMany(companyReviews);
print(`[MongoDB] Inserted ${reviewResult.insertedCount} company reviews`);

// ─── CREATE TEXT INDEXES FOR SEARCH ────────────────────────────
print('[MongoDB] Creating text indexes for search...');

// Update existing text indexes
try {
  db.candidate_profiles.dropIndex('idx_candidate_fulltext');
  db.job_postings.dropIndex('idx_job_fulltext');
} catch (e) {
  // Indexes might not exist yet
}

db.candidate_profiles.createIndex(
  { 
    'personalInfo.fullName': 'text',
    'summary': 'text',
    'professionalSummary': 'text',
    'skills.name': 'text'
  },
  { 
    name: 'idx_candidate_fulltext',
    default_language: 'none',
    weights: {
      'personalInfo.fullName': 10,
      'summary': 5,
      'professionalSummary': 3,
      'skills.name': 2
    }
  }
);

db.job_postings.createIndex(
  { 
    title: 'text',
    description: 'text',
    'requirements.skills.name': 'text',
    keywords: 'text'
  },
  { 
    name: 'idx_job_fulltext',
    default_language: 'none',
    weights: {
      title: 10,
      description: 5,
      'requirements.skills.name': 3,
      keywords: 2
    }
  }
);

print('[MongoDB] Text indexes created successfully!');

// ─── FINAL STATISTICS ──────────────────────────────────────────
print('[MongoDB] Seed data insertion completed!');
print(`   - Candidate Profiles: ${db.candidate_profiles.countDocuments()}`);
print(`   - Job Postings: ${db.job_postings.countDocuments()}`);
print(`   - Company Reviews: ${db.company_reviews.countDocuments()}`);

// Create a simple test query to verify
const testCandidate = db.candidate_profiles.findOne({ candidateId: 'cccccccc-cccc-cccc-cccc-cccccccccccc' });
if (testCandidate) {
  print(`✅ Test query successful: Found candidate ${testCandidate.personalInfo.fullName}`);
} else {
  print('⚠️  Test query failed: Could not find test candidate');
}

const testJob = db.job_postings.findOne({ jobId: '33333333-3333-3333-3333-333333333331' });
if (testJob) {
  print(`✅ Test query successful: Found job "${testJob.title}"`);
} else {
  print('⚠️  Test query failed: Could not find test job');
}