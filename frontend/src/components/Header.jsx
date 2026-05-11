import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authStore from '../store/authStore';
import { authAPI } from '../services/api';

const NAV_LINKS = [
  { to: '/jobs',         label: 'Jobs',         roles: ['candidate', 'recruiter', 'admin'] },
  { to: '/profile',      label: 'My Profile',   roles: ['candidate'] },
  { to: '/applications', label: 'Applications', roles: ['candidate'] },
  { to: '/company',      label: 'Company',      roles: ['recruiter'] },
  { to: '/my-jobs',      label: 'My Jobs',      roles: ['recruiter'] },
  { to: '/candidates',   label: 'Candidates',   roles: ['recruiter'] },
  { to: '/admin',        label: 'Admin',        roles: ['admin'] },
];

export default function Header() {
  const { user, isAuthenticated, logout } = authStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authAPI.logout({ refreshToken: localStorage.getItem('refreshToken') });
    } catch (err) {
      console.error('Logout error:', err);
    }
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const closeDropdown = () => setDropdownOpen(false);

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const visibleLinks = NAV_LINKS.filter((l) => l.roles.includes(user?.role));
  const initials = user?.email?.charAt(0).toUpperCase() || '?';

  return (
    <header className="bg-dark text-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center font-black text-white text-xs">
            R
          </div>
          <span className="text-base font-bold tracking-tight">
            Recruit<span className="text-primary">Hub</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-1 flex-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3 ml-auto">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/10 transition focus:outline-none"
              >
                {/* Avatar */}
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {initials}
                </div>
                <span className="hidden sm:block text-sm text-gray-300 max-w-[160px] truncate">
                  {user?.email}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-10" onClick={closeDropdown} />

                  {/* Dropdown panel */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl z-20 overflow-hidden text-gray-800 ring-1 ring-black/5">
                    {/* User info */}
                    <div className="px-4 py-3 bg-gray-50 border-b">
                      <p className="text-xs text-gray-400 mb-0.5">Signed in as</p>
                      <p className="text-sm font-semibold truncate">{user?.email}</p>
                      <span className="mt-1.5 inline-block text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize">
                        {user?.role}
                      </span>
                    </div>

                    {/* Mobile-only nav links */}
                    {visibleLinks.length > 0 && (
                      <div className="md:hidden border-b py-1">
                        {visibleLinks.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={closeDropdown}
                            className={`flex items-center px-4 py-2 text-sm transition-colors ${
                              isActive(link.to)
                                ? 'bg-primary/5 text-primary font-medium'
                                : 'hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Sign out */}
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-primary text-sm py-1.5">
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium px-4 py-1.5 rounded-lg border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
