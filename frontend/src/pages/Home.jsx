import { Link } from 'react-router-dom';
import authStore from '../store/authStore';

export default function Home() {
  const { isAuthenticated, user } = authStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-secondary">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-white">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find Your Dream Job
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Connect with top opportunities using AI-powered recommendations
          </p>

          {!isAuthenticated && (
            <div className="flex gap-4 justify-center">
              <Link to="/jobs" className="btn-primary hover:bg-blue-700">
                Browse Jobs
              </Link>
              <Link to="/register" className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-3">AI-Powered Matching</h3>
              <p className="text-muted">
                Our intelligent system matches candidates with the perfect job opportunities based on skills, experience, and preferences.
              </p>
            </div>

            <div className="card">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Quick Hiring</h3>
              <p className="text-muted">
                Streamlined recruitment process helps companies find and hire talent faster than ever before.
              </p>
            </div>

            <div className="card">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3">Secure & Privacy</h3>
              <p className="text-muted">
                Your data is protected with enterprise-grade security. Your privacy is our top priority.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* For Candidates */}
      <div className="bg-light py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">For Job Seekers</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">🎯 Personalized Opportunities</h3>
              <ul className="space-y-3 text-muted">
                <li>✓ Find jobs tailored to your skills</li>
                <li>✓ AI-powered job recommendations</li>
                <li>✓ Track your applications easily</li>
                <li>✓ Get notified about new matches</li>
              </ul>
              <Link to={isAuthenticated ? '/jobs' : '/register'} className="btn-primary mt-6 inline-block">
                Start Searching
              </Link>
            </div>

            <div className="card">
              <p className="text-lg">
                Join thousands of job seekers who found their dream jobs through our platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* For Companies */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">For Employers</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <p className="text-lg">
                Build your dream team with intelligent recruitment technology.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">💼 Smart Recruitment</h3>
              <ul className="space-y-3 text-muted">
                <li>✓ Post jobs and get qualified candidates</li>
                <li>✓ AI-powered candidate screening</li>
                <li>✓ Manage interviews efficiently</li>
                <li>✓ Collaborate with your team</li>
              </ul>
              <Link to="/register" className="btn-secondary mt-6 inline-block">
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary">10K+</p>
              <p>Active Jobs</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-secondary">50K+</p>
              <p>Job Seekers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-accent">500+</p>
              <p>Companies</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-400">95%</p>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
