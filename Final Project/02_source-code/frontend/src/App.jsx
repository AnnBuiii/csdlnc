import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import CandidateProfile from './pages/CandidateProfile';
import Applications from './pages/Applications';
import Company from './pages/Company';
import CreateJob from './pages/CreateJob';
import EditJob from './pages/EditJob';
import Interviews from './pages/Interviews';
import Candidates from './pages/Candidates';
import JobApplications from './pages/JobApplications';

import './index.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />

            {/* Candidate Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <CandidateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/applications"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <Applications />
                </ProtectedRoute>
              }
            />

            {/* Recruiter Protected Routes */}
            <Route
              path="/company"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <Company />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-jobs"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <Company />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-job"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <CreateJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-job/:id"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <EditJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs/:id/applications"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <JobApplications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interviews"
              element={
                <ProtectedRoute>
                  <Interviews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/candidates"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <Candidates />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="text-center py-20">
                  <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
