import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle, Shield, User as UserIcon } from 'lucide-react';

const LoginEnhanced: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    userType: 'couple'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  // Enhanced validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!isLogin && !formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!isLogin && !formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!isLogin && !formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!isLogin && !formData.userType) {
      newErrors.userType = 'Account type is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          userType: formData.userType
        });
      }
      
      // Show success message briefly before redirect
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amari-50 via-amari-100 to-amari-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 -left-10 -right-10 w-40 h-40 bg-amari-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute inset-0 -right-10 -bottom-10 w-40 h-40 bg-amari-700 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute inset-0 -left-10 -top-10 w-40 h-40 bg-amari-800 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="flex items-center min-h-screen">
          <div className="w-full max-w-md">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl overflow-hidden transition-transform group-hover:rotate-3">
                  <img 
                    src="/amariexperienceslogo.jpeg" 
                    alt="Amari Experience Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-serif font-bold text-white tracking-wide">AMARI</h1>
                  <p className="text-amari-100 text-lg">Experience</p>
                </div>
              </Link>
            </div>

            {/* Authentication Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-amari-900">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="text-stone-400 text-sm">
                      {isLogin ? 'Already have an account?' : 'New to Amari?'}
                    </div>
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-stone-400 hover:text-stone-600 text-sm font-medium transition-colors"
                    >
                      <span>{isLogin ? 'Switch to Register' : 'Switch to Login'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-3 top-3 text-stone-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amari-500 focus:border-amari-500 transition-all"
                      placeholder="your@email.com"
                      aria-describedby="email-error"
                    />
                    {errors.email && (
                      <div className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User size={20} className="absolute left-3 top-3 text-stone-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border-stone-200 rounded-xl focus:ring-2 focus:ring-amari-500 focus:border-amari-500 transition-all"
                        placeholder="John"
                        aria-describedby="firstName-error"
                        />
                      {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User size={20} className="absolute left-3 top-3 text-stone-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border-stone-200 rounded-xl focus:ring-2 focus:ring-amari-500 focus:border-amari-500 transition-all"
                        placeholder="Doe"
                        aria-describedby="lastName-error"
                        />
                      {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                        )}
                      </div>
                  </div>
                </div>

                {/* Phone (for registration) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Phone (Optional)
                    </label>
                    <div className="relative">
                      <Phone size={20} className="absolute left-3 top-3 text-stone-400" />
                      <input
                        type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border-stone-200 rounded-xl focus:ring-2 focus:ring-amari-500 focus:border-amari-500 transition-all"
                          placeholder="+254 712 345 678"
                          aria-describedby="phone-error"
                        />
                      {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>
                  </div>
                </div>

                {/* User Type */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Account Type
                    </label>
                    <div className="relative">
                      <User size={20} className="absolute left-3 top-3 text-stone-400" />
                      <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-stone-200 rounded-xl focus:ring-2 focus:ring-amari-500 focus:border-amari-500 transition-all appearance-none cursor-pointer"
                        aria-describedby="userType-error"
                      >
                        <option value="">Select account type</option>
                        <option value="couple">Couple</option>
                        <option value="vendor">Vendor</option>
                      </select>
                      {errors.userType && (
                          <p className="text-red-500 text-xs mt-1">{errors.userType}</p>
                        )}
                      </div>
                  </div>
                </div>
              </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={20} className="absolute left-3 top-3 text-stone-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={8}
                        className="w-full pl-10 pr-10 py-3 border-stone-200 rounded-xl focus:ring-2 focus:ring-amari-500 focus:border-amari-500 transition-all"
                        placeholder="••••••••••"
                        aria-describedby="password-error"
                      />
                    <button
                      type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                      </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                    disabled={isLoading || !validateForm()}
                    className="w-full bg-amari-600 text-white py-3 rounded-xl font-bold hover:bg-amari-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="sr-only">Creating account...</span>
                      </>
                    ) : (
                      <>
                        {isLogin ? (
                          <span className="text-white">Sign In</span>
                        ) : (
                          <span className="text-white">Create Account</span>
                        )}
                        <ArrowRight size={18} />
                        </>
                      )}
                    )}
                  </button>
                </form>

                {/* Toggle Link */}
                <div className="text-center mt-6">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-stone-400 hover:text-stone-600 text-sm font-medium transition-colors"
                  >
                    {isLogin ? (
                      <>
                        <span className="text-stone-600">Don't have an account? <span className="text-amari-600 font-medium">Register here</span></span>
                      </>
                    ) : (
                      <>
                        <span className="text-stone-600">Already have an account? <span className="text-amari-600 font-medium">Sign in here</span></span>
                      </>
                    )}
                  </button>
                </div>

                {/* Success Message */}
                {error && (
                  <div className="bg-red-50 border-red-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertCircle size={20} className="text-red-700" />
                      <span className="font-medium">Authentication Failed</span>
                    </div>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginEnhanced;
