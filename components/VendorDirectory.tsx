import React, { useState } from 'react';
import { MOCK_VENDORS } from '../constants';
import { VendorCategory } from '../types';
import { MapPin, Star, MessageSquare } from 'lucide-react';

const VendorDirectory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<VendorCategory | 'All'>('All');

  const filteredVendors = selectedCategory === 'All' 
    ? MOCK_VENDORS 
    : MOCK_VENDORS.filter(v => v.category === selectedCategory);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800">Curated Vendor Directory</h2>
        <p className="mt-4 text-stone-600 max-w-2xl mx-auto">Discover Diani's most trusted wedding professionals. All our listings are verified for quality and service.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button 
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedCategory === 'All' ? 'bg-amari-600 text-white' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}`}
        >
          All
        </button>
        {Object.values(VendorCategory).map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedCategory === cat ? 'bg-amari-600 text-white' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVendors.map(vendor => (
          <div key={vendor.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group border border-stone-100">
            <div className="relative h-48 overflow-hidden">
              <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-stone-800">
                {vendor.priceRange}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="text-xl font-bold text-stone-800 font-serif">{vendor.name}</h3>
                 <div className="flex items-center text-yellow-500 gap-1 text-sm font-bold">
                   <Star size={14} fill="currentColor" />
                   {vendor.rating}
                 </div>
              </div>
              
              <div className="flex items-center text-stone-500 text-xs mb-4">
                <MapPin size={14} className="mr-1" />
                {vendor.location}
              </div>
              
              <p className="text-stone-600 text-sm mb-6 line-clamp-2">{vendor.description}</p>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-stone-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-stone-700 transition">View Profile</button>
                <button className="flex items-center justify-center w-10 bg-amari-50 text-amari-600 rounded-lg hover:bg-amari-100 border border-amari-200 transition">
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorDirectory;
