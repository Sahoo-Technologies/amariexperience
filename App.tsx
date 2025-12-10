import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import VendorDirectory from './components/VendorDirectory';
import PlanningTools from './components/PlanningTools';
import AirlineBooking from './components/AirlineBooking';
import InspirationGallery from './components/InspirationGallery';
import GeminiPlanner from './components/GeminiPlanner';
import VendorOnboarding from './components/VendorOnboarding';
import AdminDashboard from './components/AdminDashboard';

// Landing Page Components
import { ArrowRight, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2070&auto=format&fit=crop" 
        alt="Diani Beach Wedding" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
    <div className="relative z-10 text-center px-4 max-w-4xl">
      <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-lg">
        Say Yes to Diani
      </h1>
      <p className="text-xl text-stone-100 mb-8 max-w-2xl mx-auto font-light">
        Plan your dream coastal wedding in Kenya with curated vendors, smart tools, and premium concierge support.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/vendors" className="bg-white text-stone-900 px-8 py-3 rounded-full font-medium hover:bg-stone-100 transition flex items-center justify-center gap-2">
          Find Vendors
        </Link>
        <Link to="/concierge" className="bg-amari-500/90 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium hover:bg-amari-600 transition flex items-center justify-center gap-2">
          Concierge Service <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </div>
);

const Features = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 text-center">
      <div className="p-6">
        <div className="w-16 h-16 bg-amari-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Star className="text-amari-600" size={32} />
        </div>
        <h3 className="text-xl font-bold font-serif mb-3">Verified Vendors</h3>
        <p className="text-stone-500">Access our exclusive network of Diani's best venues, planners, and creatives, personally vetted for quality.</p>
      </div>
      <div className="p-6">
        <div className="w-16 h-16 bg-amari-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Check className="text-amari-600" size={32} />
        </div>
        <h3 className="text-xl font-bold font-serif mb-3">Smart Planning</h3>
        <p className="text-stone-500">Stay organized with our digital budget calculator, guest list manager, and day-of timeline creator.</p>
      </div>
      <div className="p-6">
        <div className="w-16 h-16 bg-amari-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Star className="text-amari-600" size={32} />
        </div>
        <h3 className="text-xl font-bold font-serif mb-3">Concierge Support</h3>
        <p className="text-stone-500">Upgrade to our premium package for a dedicated wedding expert to handle bookings and logistics.</p>
      </div>
    </div>
  </section>
);

const ConciergePage = () => (
  <div className="max-w-5xl mx-auto py-16 px-4">
    <div className="bg-stone-900 text-white rounded-3xl p-8 md:p-16 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amari-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
      <div className="relative z-10">
        <span className="text-amari-400 font-bold tracking-widest text-xs uppercase mb-2 block">Premium Service</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Amari Concierge</h2>
        <p className="text-stone-300 text-lg mb-8 max-w-xl">
          Let us handle the details while you enjoy the journey. Our concierge service offers end-to-end planning assistance, exclusive vendor rates, and on-site coordination.
        </p>
        <ul className="space-y-4 mb-10 text-stone-200">
          <li className="flex items-center gap-3"><Check className="text-amari-500" /> Dedicated Wedding Expert</li>
          <li className="flex items-center gap-3"><Check className="text-amari-500" /> Vendor Contract Negotiation</li>
          <li className="flex items-center gap-3"><Check className="text-amari-500" /> Guest Accommodation & Travel Management</li>
          <li className="flex items-center gap-3"><Check className="text-amari-500" /> Day-of Coordination</li>
        </ul>
        <button className="bg-amari-500 text-white px-8 py-3 rounded-full font-bold hover:bg-amari-600 transition">
          Inquire for Pricing
        </button>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<><Hero /><Features /><VendorDirectory /><InspirationGallery /></>} />
          <Route path="/vendors" element={<VendorDirectory />} />
          <Route path="/tools" element={<PlanningTools />} />
          <Route path="/flights" element={<AirlineBooking />} />
          <Route path="/gallery" element={<InspirationGallery />} />
          <Route path="/concierge" element={<ConciergePage />} />
          <Route path="/join" element={<VendorOnboarding />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
      <GeminiPlanner />
    </Router>
  );
};

export default App;
