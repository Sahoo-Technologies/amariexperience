import React from 'react';
import { Link } from 'react-router-dom';

const Community: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <span className="text-amari-500 font-bold uppercase tracking-widest text-xs mb-3 block">Community</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-amari-900">How We’re Building Together</h2>
        <p className="mt-6 text-stone-600 max-w-3xl mx-auto text-lg font-light leading-relaxed">
          Amari is designed to bring couples, guests, and vendors into the same conversation—sharing inspiration, local knowledge, and honest experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-sm border border-amari-100 p-8">
          <h3 className="text-2xl font-serif font-bold text-amari-900 mb-3">Guests</h3>
          <p className="text-stone-600 leading-relaxed">
            Share photos, stories, and tips from your stay in Diani. Use the guest itinerary tool to help everyone discover places to eat, visit, and unwind.
          </p>
          <div className="mt-6">
            <Link
              to="/tools"
              className="inline-block bg-amari-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-amari-600 transition shadow-md"
            >
              Open Planning Tools
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-amari-100 p-8">
          <h3 className="text-2xl font-serif font-bold text-amari-900 mb-3">Vendors</h3>
          <p className="text-stone-600 leading-relaxed">
            Post work you’re proud of, share behind-the-scenes stories, and help couples understand what’s possible along the coast.
          </p>
          <div className="mt-6">
            <Link
              to="/gallery"
              className="inline-block bg-amari-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-amari-600 transition shadow-md"
            >
              Go to Inspiration Board
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-amari-100 p-8 lg:col-span-2">
          <h3 className="text-2xl font-serif font-bold text-amari-900 mb-3">What You Can Share</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-stone-600">
            <div className="bg-amari-50 rounded-2xl border border-amari-100 p-5">
              <p className="font-bold text-amari-900 mb-1">Photos</p>
              <p className="text-sm">Beach setups, florals, sunsets, outfits, details.</p>
            </div>
            <div className="bg-amari-50 rounded-2xl border border-amari-100 p-5">
              <p className="font-bold text-amari-900 mb-1">Stories</p>
              <p className="text-sm">What made the trip special, what you’d repeat, what you’d skip.</p>
            </div>
            <div className="bg-amari-50 rounded-2xl border border-amari-100 p-5">
              <p className="font-bold text-amari-900 mb-1">Local Tips</p>
              <p className="text-sm">Spas, tours, snorkelling spots, restaurants, markets.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
