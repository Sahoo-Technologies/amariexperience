import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, LogIn } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { isAuthenticated, user, login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  // Already authenticated as admin — render children
  if (isAuthenticated && user?.userType === 'admin') {
    return <>{children}</>;
  }

  // Authenticated but NOT admin — show access denied
  if (isAuthenticated && user && user.userType !== 'admin') {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield size={32} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">Access Denied</h2>
            <p className="text-stone-500 mb-6">
              This area is restricted to administrators only. Your account ({user.email}) does not have admin privileges.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/dashboard"
                className="bg-amari-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-amari-700 transition text-sm"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/"
                className="bg-white border border-stone-200 text-stone-700 px-6 py-3 rounded-xl font-bold hover:bg-stone-50 transition text-sm"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated — show admin login form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!email.trim() || !password) {
      setLocalError('Email and password are required');
      return;
    }

    await login({ email, password });

    // After login attempt, check if the user is admin.
    // The auth state will update via useEffect in the parent,
    // and re-render will either show children or access denied.
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-6">
            <div className="w-11 h-11 rounded-xl overflow-hidden transition-transform group-hover:rotate-3">
              <img src="/amariexperienceslogo.jpeg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-amari-500 tracking-wide">AMARI</h1>
              <p className="text-[9px] text-amari-400 uppercase tracking-[0.2em] -mt-0.5 font-medium">Experience</p>
            </div>
          </Link>
        </div>

        {/* Admin Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-stone-900 px-8 py-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Shield size={20} className="text-amari-300" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-white">Admin Portal</h2>
                <p className="text-stone-400 text-xs">Restricted access</p>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-8">
            <p className="text-stone-500 text-sm mb-6">
              Sign in with your administrator credentials to access this area.
            </p>

            {displayError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm font-medium">{displayError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-[14px] text-stone-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 border border-stone-200 bg-white rounded-xl text-sm transition-all outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400"
                    placeholder="admin@amariexperience.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-[14px] text-stone-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3.5 border border-stone-200 bg-white rounded-xl text-sm transition-all outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400"
                    placeholder="Enter admin password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-[14px] text-stone-400 hover:text-stone-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-stone-900 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-stone-800 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <LogIn size={16} />
                    Sign in as Admin
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-stone-400 text-xs hover:text-stone-600 transition-colors inline-flex items-center gap-1"
          >
            &larr; Back to Amari Experience
          </Link>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-stone-400">
          <Lock size={12} />
          <p className="text-[11px]">
            This area is monitored and access is logged.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminGuard;
