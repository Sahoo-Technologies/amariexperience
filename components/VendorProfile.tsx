import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_VENDORS } from '../constants';
import { MapPin, Star, MessageSquare, ArrowLeft, Heart, Mail, Phone, Globe } from 'lucide-react';

const VendorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const vendor = MOCK_VENDORS.find(v => v.id === id);
  
  if (!vendor) {
    return (
      <div className="min-h-screen bg-amari-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amari-900 mb-4">Vendor Not Found</h1>
          <Link to="/vendors" className="text-amari-600 hover:text-amari-500 font-bold">
            ← Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amari-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-amari-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link 
            to="/vendors" 
            className="inline-flex items-center text-amari-600 hover:text-amari-500 font-bold transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Directory
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={vendor.imageUrl} 
          alt={vendor.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-amari-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {vendor.category}
              </span>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Star size={14} className="text-yellow-300 fill-yellow-300 mr-1" />
                <span className="text-sm font-bold">{vendor.rating}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">{vendor.name}</h1>
            <div className="flex items-center text-white/90">
              <MapPin size={18} className="mr-2" />
              <span className="text-lg">{vendor.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-amari-100 p-8">
              <h2 className="text-2xl font-serif font-bold text-amari-900 mb-4">About</h2>
              <p className="text-stone-600 leading-relaxed text-lg">{vendor.description}</p>
            </div>

            {/* Gallery Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-amari-100 p-8">
              <h2 className="text-2xl font-serif font-bold text-amari-900 mb-6">Portfolio</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-amari-50">
                    <img 
                      src={vendor.imageUrl} 
                      alt={`${vendor.name} portfolio ${i}`}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-amari-100 p-8">
              <h2 className="text-2xl font-serif font-bold text-amari-900 mb-6">Services</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amari-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-bold text-amari-900 mb-1">Full Wedding Planning</h3>
                    <p className="text-stone-600 text-sm">Comprehensive planning from start to finish</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amari-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-bold text-amari-900 mb-1">Day Coordination</h3>
                    <p className="text-stone-600 text-sm">Professional day-of wedding management</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amari-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-bold text-amari-900 mb-1">Vendor Management</h3>
                    <p className="text-stone-600 text-sm">Coordination with all wedding vendors</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amari-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-bold text-amari-900 mb-1">Timeline Creation</h3>
                    <p className="text-stone-600 text-sm">Detailed wedding day timeline</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-amari-100 p-6">
              <h3 className="text-lg font-bold text-amari-900 mb-4">Contact</h3>
              <div className="space-y-3">
                <button className="w-full bg-amari-900 text-white py-3 rounded-xl font-bold hover:bg-amari-600 transition shadow-lg flex items-center justify-center gap-2">
                  <MessageSquare size={18} />
                  Send Message
                </button>
                <button className="w-full bg-amari-50 text-amari-900 py-3 rounded-xl font-bold hover:bg-amari-100 border border-amari-100 transition flex items-center justify-center gap-2">
                  <Heart size={18} />
                  Save to Favorites
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-amari-100 p-6">
              <h3 className="text-lg font-bold text-amari-900 mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-amari-400" />
                  <span className="text-stone-600 text-sm">{vendor.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star size={16} className="text-amari-400" />
                  <span className="text-stone-600 text-sm">{vendor.rating} Rating</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-amari-400" />
                  <span className="text-stone-600 text-sm">Available Worldwide</span>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-amari-50 rounded-2xl border border-amari-100 p-6">
              <h3 className="text-lg font-bold text-amari-900 mb-3">Availability</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600 text-sm">2025</span>
                  <span className="text-amari-600 text-sm font-bold">Limited Dates</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600 text-sm">2026</span>
                  <span className="text-green-600 text-sm font-bold">Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
