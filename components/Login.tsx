import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Phone, Heart, Shield, Star, CheckCircle, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    userType: 'couple'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [didSubmit, setDidSubmit] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const { login, register, isLoading, error, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!didSubmit) return;
    if (!isAuthenticated || !user) return;

    setSuccessMessage(isLogin ? 'Welcome back! Redirecting...' : 'Account created! Redirecting...');

    const timer = setTimeout(() => {
      if (user.userType === 'vendor') {
        navigate('/partner');
      } else if (user.userType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [didSubmit, isAuthenticated, navigate, user, isLogin]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errs.password = 'Password must be at least 8 characters';
    }

    if (!isLogin) {
      if (!formData.firstName.trim()) errs.firstName = 'First name is required';
      if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
      if (formData.confirmPassword !== formData.password) {
        errs.confirmPassword = 'Passwords do not match';
      }
    }

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validate()) return;

    if (isLogin) {
      await login({
        email: formData.email,
        password: formData.password,
      });
    } else {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        userType: formData.userType,
      });
    }

    setDidSubmit(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setValidationErrors({});
    setSuccessMessage('');
    setDidSubmit(false);
  };

  const inputClass = (field: string) =>
    `w-full pl-11 pr-4 py-3.5 border rounded-xl text-sm transition-all outline-none ${
      validationErrors[field]
        ? 'border-red-300 bg-red-50/50 focus:ring-2 focus:ring-red-400 focus:border-red-400'
        : 'border-stone-200 bg-white focus:ring-2 focus:ring-amari-400 focus:border-amari-400'
    }`;

  const selectClass = (field: string) =>
    `w-full px-4 py-3.5 border rounded-xl text-sm transition-all outline-none appearance-none bg-white ${
      validationErrors[field]
        ? 'border-red-300 bg-red-50/50 focus:ring-2 focus:ring-red-400 focus:border-red-400'
        : 'border-stone-200 focus:ring-2 focus:ring-amari-400 focus:border-amari-400'
    }`;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <img
          src="https://parkside.pewa.ke/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-29-at-8.44.09-PM.jpeg"
          alt="Diani Beach"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amari-900/85 via-amari-800/70 to-amari-600/60" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-white/20 transition-transform group-hover:rotate-3">
              <img src="/amariexperienceslogo.jpeg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-white tracking-wide">AMARI</h1>
              <p className="text-[10px] text-amari-200 uppercase tracking-[0.25em] -mt-0.5 font-medium">Experience</p>
            </div>
          </Link>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl xl:text-5xl font-serif font-bold text-white leading-tight mb-4">
                Your Dream <span className="italic text-amari-200">Coastal</span> Wedding Starts Here
              </h2>
              <p className="text-amari-100/80 text-lg leading-relaxed max-w-md">
                Join thousands of couples who found their perfect Diani wedding vendors through Amari Experience.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Star, text: 'Access verified coastal vendors' },
                { icon: Heart, text: 'Save and plan with smart tools' },
                { icon: Shield, text: 'Secure, trusted platform' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 text-white/90">
                  <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-amari-200" />
                  </div>
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Amari Experience. Made with love in Diani.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-amari-50 via-white to-stone-50 p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-[460px]">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl overflow-hidden transition-transform group-hover:rotate-3">
                <img src="/amariexperienceslogo.jpeg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-amari-500 tracking-wide">AMARI</h1>
                <p className="text-[9px] text-amari-400 uppercase tracking-[0.2em] -mt-0.5 font-medium">Experience</p>
              </div>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-amari-900 mb-2">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-stone-500">
              {isLogin
                ? 'Sign in to continue planning your perfect day'
                : 'Get started with Amari Experience in seconds'}
            </p>
          </div>

          {/* Success message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
              <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
              <p className="text-green-700 text-sm font-medium">{successMessage}</p>
            </div>
          )}

          {/* Error message */}
          {error && !successMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">First Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-[14px] text-stone-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={inputClass('firstName')}
                      placeholder="John"
                    />
                  </div>
                  {validationErrors.firstName && <p className="text-xs text-red-500 mt-1">{validationErrors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">Last Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-[14px] text-stone-400" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={inputClass('lastName')}
                      placeholder="Doe"
                    />
                  </div>
                  {validationErrors.lastName && <p className="text-xs text-red-500 mt-1">{validationErrors.lastName}</p>}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-[14px] text-stone-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass('email')}
                  placeholder="hello@example.com"
                  autoComplete="email"
                />
              </div>
              {validationErrors.email && <p className="text-xs text-red-500 mt-1">{validationErrors.email}</p>}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">Phone <span className="text-stone-400 normal-case">(optional)</span></label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-[14px] text-stone-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass('phone')}
                    placeholder="+254 712 345 678"
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">I am a...</label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className={selectClass('userType')}
                >
                  <option value="couple">Couple planning a wedding</option>
                  <option value="vendor">Vendor / Service provider</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-[14px] text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${inputClass('password')} pr-11`}
                  placeholder="Min. 8 characters"
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
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
              {validationErrors.password && <p className="text-xs text-red-500 mt-1">{validationErrors.password}</p>}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-[14px] text-stone-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={inputClass('confirmPassword')}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                  />
                </div>
                {validationErrors.confirmPassword && <p className="text-xs text-red-500 mt-1">{validationErrors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !!successMessage}
              className="w-full bg-amari-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-amari-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-amari-600/20 hover:shadow-xl hover:shadow-amari-600/30"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : successMessage ? (
                <>
                  <CheckCircle size={18} />
                  Success!
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400 uppercase tracking-wider font-medium">or</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Toggle */}
          <div className="text-center">
            <p className="text-stone-500 text-sm">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={toggleMode}
                className="text-amari-600 font-bold hover:text-amari-500 transition-colors underline underline-offset-2"
              >
                {isLogin ? 'Sign up free' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Back link */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-stone-400 text-xs hover:text-stone-600 transition-colors inline-flex items-center gap-1"
            >
              &larr; Back to Amari Experience
            </Link>
          </div>

          {/* Security */}
          <div className="mt-8 flex items-center justify-center gap-2 text-stone-400">
            <Shield size={14} />
            <p className="text-[11px]">
              256-bit SSL encrypted. Your data is safe with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
