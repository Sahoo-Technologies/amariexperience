import React, { useState } from 'react';
import { VendorCategory } from '../types';
import { submitApplication } from '../services/vendorService';
import { CheckCircle, Store, MapPin, Phone, Mail, FileText, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const VendorOnboarding: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    category: VendorCategory.Venue,
    description: '',
    priceRange: '$$' as '$$' | '$$$' | '$$$$',
    location: '',
    contactEmail: '',
    contactPhone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplication(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="text-green-600" size={40} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4">Application Received!</h2>
        <p className="text-stone-600 max-w-md mb-8">
          Thank you for listing <strong>{formData.businessName}</strong> with Amari Experience. 
          Our team will review your details and contact you shortly.
        </p>
        <Link to="/" className="bg-stone-900 text-white px-8 py-3 rounded-full font-medium hover:bg-stone-700 transition">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif font-bold text-stone-800">Join the Amari Directory</h2>
        <p className="text-stone-600 mt-2">Grow your wedding business by connecting with couples planning their Diani destination wedding.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-stone-100 p-8 space-y-6">
        
        {/* Business Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2 border-b pb-2">
            <Store size={20} className="text-amari-500" /> Business Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Business Name</label>
              <input 
                required
                type="text" 
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amari-500 outline-none"
                placeholder="e.g. Diani Beach Resort"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Service Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amari-500 outline-none bg-white"
              >
                {Object.values(VendorCategory).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Description of Services</label>
            <textarea 
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amari-500 outline-none"
              placeholder="Describe your services, style, and what makes you unique..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Price Range</label>
              <select 
                name="priceRange"
                value={formData.priceRange}
                onChange={handleChange}
                className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amari-500 outline-none bg-white"
              >
                <option value="$$">$$ - Moderate</option>
                <option value="$$$">$$$ - Premium</option>
                <option value="$$$$">$$$$ - Luxury</option>
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Location / Map Link</label>
              <input 
                required
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amari-500 outline-none"
                placeholder="e.g. Diani Beach Road, Ukunda"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2 border-b pb-2">
            <Mail size={20} className="text-amari-500" /> Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
              <input 
                required
                type="email" 
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amari-500 outline-none"
                placeholder="contact@business.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
              <input 
                required
                type="tel" 
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amari-500 outline-none"
                placeholder="+254..."
              />
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button type="submit" className="w-full bg-amari-600 text-white py-3 rounded-lg font-bold hover:bg-amari-700 transition shadow-md">
            Submit Application
          </button>
          <p className="text-xs text-stone-500 text-center mt-4">
            By submitting, you agree to Amari Experience's vendor terms and conditions.
          </p>
        </div>

      </form>
    </div>
  );
};

export default VendorOnboarding;
