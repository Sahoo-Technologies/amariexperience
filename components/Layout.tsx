import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Calendar, Users, Briefcase, Plane, Star } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-amari-500 font-semibold' : 'text-stone-600 hover:text-amari-500';

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <div className="bg-amari-500 text-white p-2 rounded-full">
                  <Heart size={20} fill="white" />
                </div>
                <div>
                    <h1 className="text-2xl font-serif text-stone-800 tracking-wide">AMARI</h1>
                    <p className="text-xs text-amari-600 uppercase tracking-widest -mt-1">Experience</p>
                </div>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/vendors" className={isActive('/vendors')}>Vendors</Link>
              <Link to="/tools" className={isActive('/tools')}>Planning Tools</Link>
              <Link to="/flights" className={isActive('/flights')}>Flights</Link>
              <Link to="/gallery" className={isActive('/gallery')}>Gallery</Link>
              <Link to="/concierge" className={`bg-stone-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-stone-700 transition ${isActive('/concierge') === 'text-amari-500 font-semibold' ? 'ring-2 ring-amari-500' : ''}`}>
                Concierge
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-stone-500 hover:text-stone-900 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:bg-stone-50 rounded-md">Home</Link>
              <Link to="/vendors" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:bg-stone-50 rounded-md">Vendors</Link>
              <Link to="/tools" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:bg-stone-50 rounded-md">Planning Tools</Link>
              <Link to="/flights" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:bg-stone-50 rounded-md">Flights</Link>
              <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-stone-600 hover:bg-stone-50 rounded-md">Gallery</Link>
              <Link to="/concierge" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-amari-600 font-semibold hover:bg-amari-50 rounded-md">Premium Concierge</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-serif mb-4">AMARI Experience</h3>
            <p className="text-sm">Crafting unforgettable weddings on the white sands of Diani, Kenya.</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Plan</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/vendors" className="hover:text-white">Vendor Directory</Link></li>
              <li><Link to="/tools" className="hover:text-white">Budget Calculator</Link></li>
              <li><Link to="/flights" className="hover:text-white">Book Flights</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/concierge" className="hover:text-white">Concierge Services</Link></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">For Business</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/join" className="hover:text-amari-500 text-stone-300">Join as Vendor</Link></li>
              <li><Link to="/admin" className="hover:text-amari-500 text-stone-500 text-xs">Admin Login</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-stone-800 pt-8 text-center text-xs">
          © {new Date().getFullYear()} Amari Experience. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
