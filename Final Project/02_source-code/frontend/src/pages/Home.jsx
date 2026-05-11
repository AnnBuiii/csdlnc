import { Link } from 'react-router-dom';
import authStore from '../store/authStore';

const FEATURES = [
  { icon: '⚡', title: 'Quick Hiring', desc: 'Streamlined process helps companies find and hire talent faster than ever.' },
  { icon: '🤖', title: 'AI Recommendations', desc: 'Smart matching connects candidates with jobs that fit their skills.' },
  { icon: '🔒', title: 'Secure & Private', desc: 'Enterprise-grade security keeps your data safe at all times.' },
];

const STATS = [
  { value: '10K+', label: 'Active Jobs' },
  { value: '5K+', label: 'Companies' },
  { value: '50K+', label: 'Candidates' },
  { value: '95%', label: 'Success Rate' },
];

export default function Home() {
  const { isAuthenticated } = authStore();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-blue-700 to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <span className="inline-block mb-4 px-4 py-1.5 bg-white/15 rounded-full text-sm font-medium">
            AI-Powered Recruitment Platform
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight">
            Find Your <span className="text-yellow-300">Dream Job</span>
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Connect with top opportunities and talented candidates using intelligent recommendations.
          </p>
          {!isAuthenticated ? (
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/register" className="px-8 py-3.5 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 transition text-base shadow-lg">
                Get Started Free
              </Link>
              <Link to="/jobs" className="px-8 py-3.5 bg-white/15 border border-white/30 text-white font-bold rounded-xl hover:bg-white/25 transition text-base">
                Browse Jobs
              </Link>
            </div>
          ) : (
            <Link to="/jobs" className="px-8 py-3.5 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 transition text-base shadow-lg inline-block">
              Browse Jobs
            </Link>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-gray-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why Choose RecruitHub?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Everything you need to hire smarter or land your next role.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="card hover:shadow-md transition-shadow text-center p-8">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Job Seekers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-primary mb-4 inline-block">For Job Seekers</span>
              <h2 className="text-3xl font-bold mb-4">Find Opportunities Tailored to You</h2>
              <ul className="space-y-3 mb-8">
                {['AI-powered job matching based on your skills', 'Track all your applications in one place', 'Get interview invites and status updates'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-600">
                    <span className="w-5 h-5 bg-secondary/10 text-secondary rounded-full flex items-center justify-center text-xs flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to={isAuthenticated ? '/jobs' : '/register'} className="btn-primary">
                Start Job Search
              </Link>
            </div>
            <div className="card border-2 border-primary/10 p-8 bg-blue-50/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">JD</div>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-xs text-gray-500">Software Engineer</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic">"Found my dream job in just 2 weeks. The AI recommendations were spot-on!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Employers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="card border-2 border-secondary/10 p-8 bg-emerald-50/50">
              <div className="text-4xl mb-4">💼</div>
              <p className="font-bold text-xl mb-2">Smart Recruitment</p>
              <p className="text-sm text-gray-600">Post jobs, screen candidates automatically, and schedule interviews — all from one dashboard.</p>
            </div>
            <div>
              <span className="badge-secondary mb-4 inline-block">For Employers</span>
              <h2 className="text-3xl font-bold mb-4">Build Your Dream Team Faster</h2>
              <ul className="space-y-3 mb-8">
                {['Post jobs and reach thousands of candidates', 'AI-powered candidate screening and ranking', 'Manage your entire pipeline in one place'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-600">
                    <span className="w-5 h-5 bg-secondary/10 text-secondary rounded-full flex items-center justify-center text-xs flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-secondary">
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      {!isAuthenticated && (
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-white text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-blue-100 mb-8">Join thousands of job seekers and recruiters already using RecruitHub.</p>
            <Link to="/register" className="px-8 py-3.5 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 transition text-base shadow-lg inline-block">
              Create Free Account
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
