import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authStore from '../store/authStore';
import { authAPI } from '../services/api';

export default function Register() {
  const [role, setRole] = useState('candidate');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = authStore();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
        ? {
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName,
          }
        : {
            email: formData.email,
            password: formData.password,
            companyName: formData.companyName,
          };

      const response = role === 'candidate'
        ? await authAPI.registerCandidate(data)
        : await authAPI.registerRecruiter(data);

      if (response.success) {
        setAuth(response.data.user, response.data.token);
        navigate(role === 'candidate' ? '/jobs' : '/company');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light py-12">
      <div className="card w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-dark">Register</h1>

        {error && (
          <div className="mb-4 p-4 bg-danger text-white rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-6 flex gap-4">
          <button
            type="button"
            onClick={() => setRole('candidate')}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              role === 'candidate'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-dark'
            }`}
          >
            Candidate
          </button>
          <button
            type="button"
            onClick={() => setRole('recruiter')}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              role === 'recruiter'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-dark'
            }`}
          >
            Recruiter
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {role === 'candidate' ? (
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-input"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          ) : (
            <div>
              <label className="form-label">Company Name</label>
              <input
                type="text"
                name="companyName"
                className="form-input"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
