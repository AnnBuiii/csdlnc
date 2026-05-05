# 🚀 Quick Start Guide - Smart Recruitment System

## Prerequisites
- Node.js 14.16+ and npm 6.14+ (or compatible package manager)
- PostgreSQL, MongoDB, Neo4j, Redis, Cassandra databases (for backend)
- Git

## 📦 Project Layout

```
csdlnc/
├── backend/           # Express.js API server
├── frontend/          # Vite + React UI
├── db/               # Database initialization scripts
├── docker-compose.yml # Multi-database setup
└── README files...
```

## 🎯 Running the Full Stack

### Option 1: Manual Setup (Recommended for Development)

#### Step 1: Start Backend

```bash
cd backend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Backend runs on http://localhost:3000
```

The backend includes:
- Express API on port 3000
- API docs at http://localhost:3000/api-docs
- Swagger UI for testing endpoints

#### Step 2: Start Frontend (in another terminal)

```bash
cd frontend

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev

# Frontend runs on http://localhost:5173
```

#### Step 3: Open in Browser

Open http://localhost:5173 and you're ready to go!

### Option 2: Docker Compose (All-in-one)

```bash
# Build and start all services
docker-compose up

# This starts:
# - Backend API (port 3000)
# - Frontend (port 5173)
# - PostgreSQL (port 5432)
# - MongoDB (port 27017)
# - Neo4j (port 7687/7474)
# - Redis (port 6379)
# - Cassandra (port 9042)
# - Nginx (port 80)

# Access at http://localhost
```

## 🔑 Test Accounts

After seeding database, you can use these accounts:

### Candidate Account
```
Email: candidate1@email.com
Password: password123
Role: Candidate
```

### Recruiter Account
```
Email: recruiter1@company.com
Password: password123
Role: Recruiter
Company: Tech Company Inc.
```

### Admin Account
```
Email: admin@system.com
Password: admin123
Role: Admin
```

## 📋 Important Configuration

### Backend (.env)
Create `backend/.env`:
```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Database URLs
POSTGRES_URL=postgresql://user:password@localhost:5432/recruitment
MONGODB_URL=mongodb://localhost:27017/recruitment
REDIS_URL=redis://localhost:6379
NEO4J_URL=neo4j://localhost:7687
CASSANDRA_URL=cassandra://localhost:9042

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRY=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Frontend (.env)
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Smart Recruitment System
```

## 📊 Database Seeding

Populate with sample data:

```bash
cd backend

# Seed all databases
npm run seed:all

# Or seed specific database
npm run seed:pg      # PostgreSQL
npm run seed:mongo   # MongoDB
npm run seed:neo4j   # Neo4j
npm run seed:cassandra # Cassandra
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Development
Frontend runs with hot module replacement (HMR) enabled. Changes reflect instantly.

## 📚 API Documentation

- **Swagger UI**: http://localhost:3000/api-docs
- **OpenAPI Spec**: http://localhost:3000/api-docs/openapi.yaml

## 🛠️ Useful Commands

### Backend
```bash
# Development with auto-reload
npm run dev

# Production build and start
npm run start

# Linting
npm run lint

# Run tests
npm test

# Database migrations (if applicable)
npm run migrate
```

### Frontend
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting (if configured)
npm run lint
```

## 🐛 Troubleshooting

### Issue: Port 3000 already in use
```bash
# Find process using port 3000
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000

# Kill the process or change PORT in .env
```

### Issue: Module not found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Database connection errors
- Check if PostgreSQL/MongoDB/Redis are running
- Verify connection strings in `.env`
- Check database credentials and permissions

### Issue: CORS errors
- Ensure `CORS_ORIGIN` in backend `.env` matches frontend URL
- Check that backend is running before starting frontend

### Issue: Port 5173 already in use (Frontend)
```bash
# Frontend will auto-increment port, or specify in vite.config.js
# Or check for conflicting process

# Windows
netstat -ano | findstr :5173

# Kill and restart
```

## 📈 Project Structure Overview

### Backend API Routes
- `GET /api/jobs` - Search jobs
- `GET /api/jobs/:id` - Job details
- `POST /jobs` - Create job (recruiter)
- `GET /api/candidates/profile` - Get my profile
- `PUT /api/candidates/profile` - Update profile
- `GET /api/applications` - My applications
- `POST /api/applications` - Apply for job
- And more... (see API docs)

### Frontend Pages
- `/` - Home/Landing
- `/jobs` - Job listings
- `/jobs/:id` - Job detail
- `/login`, `/register` - Auth
- `/profile` - Candidate profile (protected)
- `/applications` - My applications (protected)
- `/company` - Recruiter dashboard (protected)

## 🔐 Security Notes

1. **JWT Tokens**: Automatically included in API requests
2. **Protected Routes**: Role-based access control
3. **HTTPS**: Use HTTPS in production
4. **Rate Limiting**: Enabled (100 requests/minute)
5. **Input Validation**: All inputs validated

## 📱 Responsive Design

Frontend is fully responsive:
- Desktop (1920px+)
- Tablet (768px - 1920px)
- Mobile (320px - 768px)

## 🚀 Performance Tips

### Backend
- Database indexes configured
- Caching with Redis
- Request compression enabled
- Rate limiting to prevent abuse

### Frontend
- Code splitting with React Router
- Lazy loaded pages
- Optimized assets
- Minified production build

## 📖 Additional Resources

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README_FRONTEND.md)
- [Frontend Implementation Guide](./FRONTEND_IMPLEMENTATION_GUIDE.md)
- [Project Overview](./HeThongTuyenDungThongMinh.md)
- [API Documentation](./backend/openapi.yaml)

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js](https://expressjs.com)
- [TLA+ for system design verification](./yeu_cau_do_an.md)

## 💡 Next Steps

1. ✅ Clone/Pull the repository
2. ✅ Install dependencies: `npm install` (both backend & frontend)
3. ✅ Configure `.env` files
4. ✅ Start backend: `npm run dev` (backend folder)
5. ✅ Start frontend: `npm run dev` (frontend folder)
6. ✅ Open http://localhost:5173
7. ✅ Login with test account
8. ✅ Explore the application!

## 🤝 Contributing

- Create feature branches
- Follow code style conventions
- Write tests for new features
- Update documentation

## 📞 Support

For issues or questions:
1. Check this Quick Start guide
2. Review project README files
3. Check the troubleshooting section
4. Review API documentation

---

**Happy Coding! 🎉**

Last Updated: May 2024
