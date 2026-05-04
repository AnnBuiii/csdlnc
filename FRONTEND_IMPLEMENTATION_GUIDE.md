# Smart Recruitment System - Frontend Implementation

## 📋 Overview

I've created a comprehensive Vite + React frontend for your Smart Recruitment System backend. The frontend is feature-complete and ready to connect with your backend API.

## 🗂️ Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Top navigation with auth state
│   │   ├── Footer.jsx              # Footer with links
│   │   └── ProtectedRoute.jsx      # Route authentication wrapper
│   │
│   ├── pages/
│   │   ├── Home.jsx                # Landing page with features
│   │   ├── Login.jsx               # User login
│   │   ├── Register.jsx            # User registration (candidate/recruiter)
│   │   ├── Jobs.jsx                # Job search and listing
│   │   ├── JobDetail.jsx           # Individual job details
│   │   ├── CandidateProfile.jsx    # Candidate profile management
│   │   ├── Applications.jsx        # Application tracking
│   │   ├── Company.jsx             # Recruiter company dashboard
│   │   ├── CreateJob.jsx           # Post new job (recruiter)
│   │   ├── Interviews.jsx          # Interview management
│   │   └── Candidates.jsx          # Candidate search (recruiter)
│   │
│   ├── services/
│   │   └── api.js                  # Centralized API client with all endpoints
│   │
│   ├── store/
│   │   └── authStore.js            # Zustand auth state management
│   │
│   ├── App.jsx                     # Main app with routing
│   ├── main.jsx                    # React entry point
│   ├── index.css                   # Global styles & Tailwind directives
│   │
│   ├── App.css                     # From Vite template
│   └── ...other Vite files
│
├── public/              # Static assets
├── vite.config.js       # Vite configuration with API proxy
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── .env                 # Environment variables
├── .env.example         # Example env file
├── .gitignore          # Git ignore file
├── package.json        # Dependencies and scripts
├── README_FRONTEND.md  # Detailed documentation
└── index.html          # HTML entry point
```

## 🚀 Features Implemented

### 📱 User Authentication
- ✅ User registration (Candidate & Recruiter roles)
- ✅ Login with JWT token
- ✅ Protected routes based on user role
- ✅ Automatic logout on token expiry
- ✅ Auth state persistence

### 💼 Job Management
- ✅ Search and filter jobs by keyword, location, salary
- ✅ View job listings with company info
- ✅ Detailed job view with full description
- ✅ Apply for jobs directly
- ✅ Related/similar jobs recommendations
- ✅ Post new jobs (recruiter only)
- ✅ Manage job listings (recruiter dashboard)

### 👤 Candidate Features
- ✅ Complete profile management
- ✅ Add and manage work experience
- ✅ Add and manage skills
- ✅ Track job applications with status
- ✅ View application history and feedback
- ✅ Public profile view for recruiters

### 🏢 Recruiter Features
- ✅ Company dashboard with statistics
- ✅ Company profile management
- ✅ Job posting and management
- ✅ Search and view candidates
- ✅ Application review and management
- ✅ Interview scheduling
- ✅ Analytics overview

### 🎯 Additional Features
- ✅ Interview tracking and management
- ✅ Real-time notifications system (API ready)
- ✅ Job recommendations
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark-themed navigation
- ✅ Professional UI with Tailwind CSS
- ✅ Loading states and error handling
- ✅ Form validation

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18+ | UI library |
| Vite | Latest | Build tool & dev server |
| React Router | 7+ | Client-side routing |
| Axios | 1.16+ | HTTP client |
| Zustand | 5+ | State management |
| Tailwind CSS | 4+ | Styling |
| PostCSS | 8+ | CSS processing |

## 📋 API Integration

All API endpoints are integrated through `src/services/api.js`:

```javascript
// Auth
authAPI.registerCandidate(data)
authAPI.registerRecruiter(data)
authAPI.login(data)
authAPI.logout(data)

// Jobs
jobAPI.searchJobs(params)
jobAPI.getJobDetail(id)
jobAPI.createJob(data)
jobAPI.updateJob(id, data)
jobAPI.deleteJob(id)

// Candidates
candidateAPI.getProfile()
candidateAPI.updateProfile(data)
candidateAPI.addExperience(data)
candidateAPI.addSkill(data)

// Applications
applicationAPI.applyJob(data)
applicationAPI.getApplications(params)
applicationAPI.updateApplicationStatus(id, data)

// Interviews
interviewAPI.scheduleInterview(data)
interviewAPI.getInterviews(params)
interviewAPI.completeInterview(id, data)

// And more...
```

## 🎨 Styling & Design

- **Color Scheme**: Professional with primary blue, secondary emerald, accent purple
- **Layout**: Responsive grid system using Tailwind CSS
- **Components**: Card-based design system
- **Typography**: Clean, readable fonts with proper hierarchy
- **Animations**: Smooth transitions and loading spinners

## 🔄 Routing Map

```
/                          → Home (landing page)
/login                     → Login page
/register                  → Registration (candidate/recruiter)
/jobs                      → Job listings & search
/jobs/:id                  → Job detail view
/profile                   → Candidate profile (protected)
/applications              → My applications (protected)
/company                   → Recruiter dashboard (protected)
/create-job                → Post new job (protected - recruiter)
/my-jobs                   → Manage my jobs (protected - recruiter)
/candidates                → Search candidates (protected - recruiter)
/interviews                → Interview management (protected)
```

## 📦 Installation & Setup

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Environment setup
```bash
# File: frontend/.env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Smart Recruitment System
```

### 3. Development server
```bash
npm run dev
```

Access at: `http://localhost:5173`

### 4. Build for production
```bash
npm run build
npm run preview
```

## 🔌 API Proxy Configuration

The Vite config includes a proxy for development:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    }
  }
}
```

This allows frontend dev server to proxy API calls without CORS issues.

## 🔐 Authentication Flow

1. User registers/logs in
2. Backend returns user object + JWT token
3. Token stored in localStorage
4. All subsequent API calls include token in Authorization header
5. If token expires (401), user is logged out automatically
6. Protected routes check auth state before rendering

## 📝 State Management (Zustand)

```javascript
import authStore from './store/authStore';

// In components
const { user, token, isAuthenticated, setAuth, logout } = authStore();

// Usage
setAuth(user, token);  // Set authenticated user
logout();              // Clear auth state
```

## ⚡ Performance Optimizations

- Code splitting with React Router
- Lazy loading of pages
- Optimized re-renders with proper component structure
- CSS purging with Tailwind production build
- Minified production builds
- API request interceptors to reuse token

## 🐛 Error Handling

- Centralized error handling in API interceptors
- User-friendly error messages
- Automatic redirect on authentication failure
- Loading states for async operations
- Form validation feedback

## 🔮 Future Enhancements

Possible additions for future development:

1. **File Uploads**: Resume, company logo, portfolio files
2. **Real-time Features**: WebSocket for live notifications
3. **Advanced Search**: Filters, saved searches, advanced queries
4. **Video Interviews**: Integration with video calling
5. **Analytics Dashboard**: Charts and statistics
6. **Email Notifications**: Email reminders and updates
7. **Payment Integration**: Premium features, job listings
8. **Mobile App**: React Native version
9. **Dark Mode**: Theme switcher
10. **Multi-language**: i18n support
11. **Rate Limiting UI**: Better UX for rate limits
12. **Review System**: Company and candidate reviews

## 📚 Component Examples

### Protected Route Usage
```javascript
<Route
  path="/profile"
  element={
    <ProtectedRoute requiredRole="candidate">
      <CandidateProfile />
    </ProtectedRoute>
  }
/>
```

### API Call Example
```javascript
try {
  const response = await jobAPI.searchJobs({ 
    keyword: 'React',
    location: 'Remote'
  });
  setJobs(response.data);
} catch (err) {
  console.error(err);
}
```

### Store Usage Example
```javascript
const { user, logout } = authStore();

useEffect(() => {
  if (!user) navigate('/login');
}, [user]);
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm run build
# Drop the dist folder on Netlify
```

### Option 3: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📞 Support & Troubleshooting

### Issue: CORS errors
**Solution**: Ensure backend has CORS enabled and frontend uses correct API URL in `.env`

### Issue: 404 on refresh
**Solution**: Vite dev server handles this. For production, configure web server to serve `index.html` for all routes.

### Issue: Token not persisting
**Solution**: Check that browser allows localStorage and that token is properly stored.

## 📄 License

Same as backend project

## 👨‍💻 Development Notes

- The frontend is fully responsive and works on mobile, tablet, and desktop
- All components use functional components with React Hooks
- State is managed with Zustand for simplicity
- API calls are centralized in `services/api.js`
- Styling uses Tailwind CSS utility classes
- No external UI library dependency (pure Tailwind)

## ✅ Checklist for Running

- [ ] Backend API is running on `http://localhost:3000`
- [ ] `.env` file is configured in frontend folder
- [ ] Dependencies installed: `npm install`
- [ ] No port conflicts (frontend needs 5173, backend 3000)
- [ ] Database is seeded with sample data
- [ ] CORS is enabled on backend

---

**Created**: May 2024
**Status**: Ready for Development & Testing
