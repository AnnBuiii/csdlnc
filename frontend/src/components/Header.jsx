import { Link, useNavigate } from 'react-router-dom';
import authStore from '../store/authStore';
import { authAPI } from '../services/api';

export default function Header() {
  const { user, isAuthenticated, logout } = authStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authAPI.logout({ refreshToken: localStorage.getItem('refreshToken') });
    } catch (err) {
      console.error('Logout error:', err);
    }
    logout();
    navigate('/');
  };

  return (
    <header className="bg-dark text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          🚀 Recruitment
        </Link>

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/jobs" className="hover:text-primary transition">Jobs</Link>
              {user?.role === 'candidate' && (
                <>
                  <Link to="/profile" className="hover:text-primary transition">My Profile</Link>
                  <Link to="/applications" className="hover:text-primary transition">Applications</Link>
                </>
              )}
              {user?.role === 'recruiter' && (
                <>
                  <Link to="/company" className="hover:text-primary transition">Company</Link>
                  <Link to="/my-jobs" className="hover:text-primary transition">My Jobs</Link>
                  <Link to="/candidates" className="hover:text-primary transition">Candidates</Link>
                </>
              )}
              {user?.role === 'admin' && (
                <Link to="/admin" className="hover:text-primary transition">Admin</Link>
              )}

              <div className="flex items-center gap-3">
                <span className="text-sm">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="btn-primary bg-danger hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn-outline">
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
