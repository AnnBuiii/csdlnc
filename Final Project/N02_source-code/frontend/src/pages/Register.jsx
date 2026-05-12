import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authStore from '../store/authStore';
import { authAPI } from '../services/api';

export default function Register() {
  const [role, setRole] = useState('candidate');
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', fullName: '', companyName: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = authStore();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const data = role === 'candidate'
        ? { email: formData.email, password: formData.password, fullName: formData.fullName }
        : { email: formData.email, password: formData.password, companyName: formData.companyName };
      const response = role === 'candidate'
        ? await authAPI.registerCandidate(data)
        : await authAPI.registerRecruiter(data);
      if (response.success) {
        setAuth(response.data.user, response.data.token);
        navigate(role === 'candidate' ? '/jobs' : '/company');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary via-emerald-600 to-primary flex-col justify-center px-16 text-white">
        <div className="mb-8">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black text-xl mb-4">R</div>
          <h1 className="text-4xl font-bold mb-3">Join RecruitHub</h1>
          <p className="text-emerald-100 text-lg">Start your journey today.</p>
        </div>
        <div className="space-y-6">
          <div className="p-4 bg-white/10 rounded-xl">
            <p className="font-semibold mb-1">For Job Seekers</p>
            <p className="text-emerald-100 text-sm">Discover thousands of jobs matched to your skills with AI recommendations.</p>
          </div>
          <div className="p-4 bg-white/10 rounded-xl">
            <p className="font-semibold mb-1">For Recruiters</p>
            <p className="text-emerald-100 text-sm">Post jobs and find the best candidates faster with smart screening.</p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-black text-white text-sm">R</div>
            <span className="text-xl font-bold">Recruit<span className="text-primary">Hub</span></span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-1">Create account</h2>
          <p className="text-gray-500 text-sm mb-6">Choose your role and fill in the details</p>

          {/* Role switcher */}
          <div className="flex gap-3 mb-6 p-1 bg-gray-100 rounded-xl">
            {[
              { value: 'candidate', label: 'Job Seeker', icon: '👤' },
              { value: 'recruiter', label: 'Recruiter',  icon: '🏢' },
            ].map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  role === r.value ? 'bg-white shadow text-primary' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{r.icon}</span> {r.label}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Email address</label>
              <input type="email" name="email" className="form-input" placeholder="you@example.com"
                value={formData.email} onChange={handleChange} autoComplete="email" required />
            </div>

            {role === 'candidate' ? (
              <div>
                <label className="form-label">Full name</label>
                <input type="text" name="fullName" className="form-input" placeholder="John Doe"
                  value={formData.fullName} onChange={handleChange} required />
              </div>
            ) : (
              <div>
                <label className="form-label">Company name</label>
                <input type="text" name="companyName" className="form-input" placeholder="Acme Corp"
                  value={formData.companyName} onChange={handleChange} required />
              </div>
            )}

            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password"
                  className="form-input pr-10" placeholder="Min. 8 characters"
                  value={formData.password} onChange={handleChange} required />
                <button type="button" onClick={() => setShowPassword((v) => !v)} tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="form-label">Confirm password</label>
              <input type={showPassword ? 'text' : 'password'} name="confirmPassword"
                className="form-input" placeholder="Repeat password"
                value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary py-3 text-base mt-2">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating account…</>
              ) : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
