# Frontend for Smart Recruitment System

This is a Vite + React frontend for the Smart Recruitment System backend API.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Footer
│   └── ProtectedRoute.jsx  # Route protection
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Jobs.jsx
│   ├── JobDetail.jsx
│   ├── CandidateProfile.jsx
│   ├── Applications.jsx
│   ├── Company.jsx
│   ├── CreateJob.jsx
│   ├── Interviews.jsx
│   └── Candidates.jsx
├── services/           # API services
│   └── api.js         # Axios instance and API calls
├── store/             # State management
│   └── authStore.js   # Zustand auth store
├── App.jsx            # Main app component with routing
├── main.jsx           # Entry point
└── index.css          # Global styles

```

## Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update the `VITE_API_URL` in `.env` if your backend runs on a different port:
```
VITE_API_URL=http://localhost:3000/api
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Build for production:
```bash
npm run build
```

## Technologies Used

- **Vite** - Fast build tool
- **React 18** - UI library
- **React Router v7** - Client-side routing
- **Axios** - HTTP client
- **Zustand** - State management
- **Tailwind CSS** - Utility-first CSS framework

## Features

### For Job Seekers
- Browse and search for jobs
- View detailed job information
- Manage profile and experience
- Track applications
- View interview schedules

### For Recruiters
- Post and manage job listings
- Browse candidate profiles
- Manage applications
- Schedule and track interviews
- Company profile management

### General
- User authentication (login/register)
- Protected routes based on user role
- Responsive design
- Dark-themed header with colorful accents

## API Integration

All API calls go through the centralized API client in `src/services/api.js`:

```javascript
import { jobAPI, candidateAPI, applicationAPI } from './services/api';

// Usage example
const jobs = await jobAPI.searchJobs({ keyword: 'React' });
const profile = await candidateAPI.getProfile();
```

### Available API Services:
- `authAPI` - Authentication endpoints
- `jobAPI` - Job listings and details
- `candidateAPI` - Candidate profiles
- `companyAPI` - Company information
- `applicationAPI` - Job applications
- `interviewAPI` - Interview scheduling
- `recommendationAPI` - Job recommendations
- `reviewAPI` - Company/Candidate reviews
- `analyticsAPI` - System analytics
- `notificationAPI` - Notifications

## State Management

Uses Zustand for auth state:

```javascript
import authStore from './store/authStore';

const { user, token, isAuthenticated, setAuth, logout } = authStore();
```

## Styling

- Tailwind CSS with custom utility classes
- Color theme from backend (primary, secondary, accent, danger, dark, light, muted)
- Responsive grid layouts
- Card-based design system

## Environment Variables

```
VITE_API_URL    - Backend API base URL (default: http://localhost:3000/api)
VITE_APP_NAME   - Application name
```

## Future Enhancements

- [ ] Advanced search and filtering
- [ ] Real-time notifications with WebSocket
- [ ] File uploads (resume, company logo)
- [ ] Analytics dashboard
- [ ] Video interview integration
- [ ] AI-powered job matching
- [ ] Payment integration
- [ ] Mobile app (React Native)
