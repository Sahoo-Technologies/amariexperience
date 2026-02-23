import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Heart, Camera, Settings, LogOut, Calendar, MapPin, Mail, Phone, Edit, Upload, Plus, Star, MessageSquare, X } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user, logout, updateProfile, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'inspiration' | 'vendors'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await updateProfile({
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      phone: profileForm.phone,
    });

    setIsEditing(false);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-amari-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-600 mb-4">Please log in to access your dashboard</p>
          <Link 
            to="/login" 
            className="bg-amari-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-amari-700 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amari-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden">
                  <img 
                    src="/amariexperienceslogo.jpeg" 
                    alt="Amari Experience Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-xl font-serif font-bold text-amari-500">AMARI</h1>
              </Link>
              <span className="text-stone-400">/</span>
              <span className="text-stone-700 font-medium">Dashboard</span>
              {user?.userType === 'vendor' && (
                <>
                  <span className="text-stone-400">/</span>
                  <Link to="/dashboard/vendor/profile/edit" className="text-amari-600 hover:underline flex items-center gap-1">
                    <Edit size={16} /> Edit Vendor Profile
                  </Link>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-stone-600">
                Welcome, {user.firstName}!
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-stone-500 hover:text-stone-700 transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-amari-100 flex items-center justify-center">
                  {user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.firstName} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={24} className="text-amari-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-stone-500 capitalize">{user.userType}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: <Calendar size={18} /> },
                  { id: 'profile', label: 'Profile', icon: <Settings size={18} /> },
                  { id: 'inspiration', label: 'My Inspiration', icon: <Heart size={18} /> },
                  { id: 'vendors', label: 'My Vendors', icon: <Star size={18} /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-amari-50 text-amari-600 font-medium'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
                  <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Welcome back, {user.firstName}!</h2>
                  <p className="text-stone-600 mb-8">
                    Here's what's happening with your wedding planning journey.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-amari-50 rounded-xl p-6 text-center">
                      <Calendar size={32} className="text-amari-600 mx-auto mb-3" />
                      <h3 className="font-bold text-stone-900 mb-1">Planning Tools</h3>
                      <p className="text-sm text-stone-600">Track your wedding progress</p>
                    </div>
                    <div className="bg-stone-50 rounded-xl p-6 text-center">
                      <Heart size={32} className="text-stone-600 mx-auto mb-3" />
                      <h3 className="font-bold text-stone-900 mb-1">Inspiration</h3>
                      <p className="text-sm text-stone-600">Save your favorite ideas</p>
                    </div>
                    <div className="bg-stone-50 rounded-xl p-6 text-center">
                      <Star size={32} className="text-stone-600 mx-auto mb-3" />
                      <h3 className="font-bold text-stone-900 mb-1">Vendors</h3>
                      <p className="text-sm text-stone-600">Manage your vendor contacts</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
                  <h3 className="text-lg font-bold text-stone-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link 
                      to="/tools"
                      className="flex items-center gap-3 p-4 bg-amari-50 rounded-xl hover:bg-amari-100 transition-colors"
                    >
                      <Calendar size={20} className="text-amari-600" />
                      <span className="font-medium text-stone-900">Open Planning Tools</span>
                    </Link>
                    <Link 
                      to="/gallery"
                      className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors"
                    >
                      <Camera size={20} className="text-stone-600" />
                      <span className="font-medium text-stone-900">Browse Inspiration</span>
                    </Link>
                    <Link 
                      to="/vendors"
                      className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors"
                    >
                      <Star size={20} className="text-stone-600" />
                      <span className="font-medium text-stone-900">Find Vendors</span>
                    </Link>
                    {user.userType === 'vendor' && (
                      <Link 
                        to="/partner"
                        className="flex items-center gap-3 p-4 bg-amari-50 rounded-xl hover:bg-amari-100 transition-colors"
                      >
                        <Plus size={20} className="text-amari-600" />
                        <span className="font-medium text-stone-900">Update Profile</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-stone-900">Profile Settings</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 text-amari-600 hover:text-amari-500 transition-colors"
                  >
                    {isEditing ? <X size={18} /> : <Edit size={18} />}
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={profileForm.firstName}
                          onChange={handleProfileChange}
                          required
                          className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amari-500 focus:border-amari-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={profileForm.lastName}
                          onChange={handleProfileChange}
                          required
                          className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amari-500 focus:border-amari-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-stone-50 text-stone-500"
                      />
                      <p className="text-xs text-stone-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amari-500 focus:border-amari-500"
                        placeholder="+254 712 345 678"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-amari-600 text-white py-3 rounded-xl font-bold hover:bg-amari-700 transition-all disabled:opacity-50"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-stone-500 mb-1">First Name</p>
                        <p className="font-medium text-stone-900">{user.firstName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-stone-500 mb-1">Last Name</p>
                        <p className="font-medium text-stone-900">{user.lastName}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-stone-500 mb-1">Email</p>
                      <p className="font-medium text-stone-900">{user.email}</p>
                    </div>

                    {user.phone && (
                      <div>
                        <p className="text-sm text-stone-500 mb-1">Phone</p>
                        <p className="font-medium text-stone-900">{user.phone}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-stone-500 mb-1">Account Type</p>
                      <p className="font-medium text-stone-900 capitalize">{user.userType}</p>
                    </div>

                    <div>
                      <p className="text-sm text-stone-500 mb-1">Member Since</p>
                      <p className="font-medium text-stone-900">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Inspiration Tab */}
            {activeTab === 'inspiration' && (
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-stone-900">My Inspiration</h2>
                  <Link 
                    to="/gallery"
                    className="flex items-center gap-2 bg-amari-600 text-white px-4 py-2 rounded-xl hover:bg-amari-700 transition-colors"
                  >
                    <Plus size={18} />
                    Add Post
                  </Link>
                </div>
                
                <div className="text-center py-12">
                  <Camera size={48} className="text-stone-300 mx-auto mb-4" />
                  <p className="text-stone-500 mb-4">No inspiration posts yet</p>
                  <Link 
                    to="/gallery"
                    className="inline-flex items-center gap-2 bg-amari-600 text-white px-6 py-3 rounded-xl hover:bg-amari-700 transition-colors"
                  >
                    <Upload size={18} />
                    Share Your Inspiration
                  </Link>
                </div>
              </div>
            )}

            {/* Vendors Tab */}
            {activeTab === 'vendors' && (
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-stone-900">My Vendors</h2>
                  <Link 
                    to="/vendors"
                    className="flex items-center gap-2 bg-amari-600 text-white px-4 py-2 rounded-xl hover:bg-amari-700 transition-colors"
                  >
                    <Plus size={18} />
                    Find Vendors
                  </Link>
                </div>
                
                <div className="text-center py-12">
                  <Star size={48} className="text-stone-300 mx-auto mb-4" />
                  <p className="text-stone-500 mb-4">No saved vendors yet</p>
                  <Link 
                    to="/vendors"
                    className="inline-flex items-center gap-2 bg-amari-600 text-white px-6 py-3 rounded-xl hover:bg-amari-700 transition-colors"
                  >
                    <Star size={18} />
                    Browse Vendor Directory
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
