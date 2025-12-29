import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Sunset, Waves } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path 
      ? 'text-amari-500 font-semibold border-b-2 border-amari-500' 
      : 'text-stone-600 hover:text-amari-500 hover:bg-amari-50/50 rounded-lg transition-colors';
  };

  return (
    <div className="min-h-screen flex flex-col bg-amari-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-amari-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
                <div className="bg-amari-100 text-amari-600 p-2.5 rounded-xl transition-transform group-hover:rotate-3">
                  <Waves size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-serif font-bold text-amari-900 tracking-wide">AMARI</h1>
                    <p className="text-[10px] text-amari-500 uppercase tracking-[0.2em] -mt-1 font-medium group-hover:text-amari-600 transition-colors">Experience</p>
                </div>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/couples" className={`py-2 ${isActive('/couples')}`}>For Couples</Link>
              <Link to="/vendors" className={`py-2 ${isActive('/vendors')}`}>Directory</Link>
              <Link to="/tools" className={`py-2 ${isActive('/tools')}`}>Tools</Link>
              <Link to="/concierge" className={`py-2 ${isActive('/concierge')}`}>Concierge</Link>
              <div className="h-8 w-px bg-amari-100 mx-2"></div>
              <Link to="/partner" className={`bg-amari-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-amari-900 transition shadow-lg shadow-amari-200 hover:shadow-xl flex items-center gap-2 ${location.pathname === '/partner' ? 'ring-2 ring-offset-2 ring-amari-600' : ''}`}>
                Partner with Us
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-amari-600 hover:text-amari-900 focus:outline-none p-2 rounded-lg hover:bg-amari-50 transition"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-amari-100 shadow-xl absolute w-full">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link to="/partner" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-amari-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-amari-900 mb-6 shadow-md">
                Partner with Us
              </Link>
              <Link to="/couples" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-stone-600 hover:bg-amari-50 hover:text-amari-600 rounded-xl font-medium transition">For Couples</Link>
              <Link to="/vendors" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-stone-600 hover:bg-amari-50 hover:text-amari-600 rounded-xl font-medium transition">Directory</Link>
              <Link to="/tools" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-stone-600 hover:bg-amari-50 hover:text-amari-600 rounded-xl font-medium transition">Planning Tools</Link>
              <Link to="/concierge" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-stone-600 hover:bg-amari-50 hover:text-amari-600 rounded-xl font-medium transition">Concierge</Link>
              <div className="pt-2 mt-2 border-t border-amari-100/70"></div>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-stone-600 hover:bg-amari-50 hover:text-amari-600 rounded-xl font-medium transition">About Us</Link>
              <Link to="/community" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-stone-600 hover:bg-amari-50 hover:text-amari-600 rounded-xl font-medium transition">Community</Link>
              <Link to="/activities" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-stone-600 hover:bg-amari-50 hover:text-amari-600 rounded-xl font-medium transition">Activities</Link>
              <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-stone-600 hover:bg-amari-50 hover:text-amari-600 rounded-xl font-medium transition">Inspiration Board</Link>
              <Link to="/history" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-stone-600 hover:bg-amari-50 hover:text-amari-600 rounded-xl font-medium transition">Diani History</Link>
              <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-stone-600 hover:bg-amari-50 hover:text-amari-600 rounded-xl font-medium transition">FAQ</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/254796535120?text=${encodeURIComponent('Hi Amari! I would like help planning a destination wedding in Kenya.')}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 left-6 z-40 group"
      >
        <div className="flex items-center gap-3 bg-amari-600 text-white px-4 py-3 rounded-full shadow-xl hover:bg-amari-500 transition-all transform hover:scale-105">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
            <svg
              viewBox="0 0 32 32"
              width="22"
              height="22"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16.04 3C9.4 3 4 8.38 4 15c0 2.32.68 4.55 1.98 6.47L4.7 29l7.68-1.23A12.05 12.05 0 0 0 16.04 27C22.68 27 28.08 21.62 28.08 15S22.68 3 16.04 3Zm0 21.9c-2.1 0-4.15-.6-5.91-1.72l-.43-.27-4.55.73.76-4.43-.28-.45A9.76 9.76 0 0 1 6.4 15c0-5.35 4.33-9.7 9.64-9.7 5.31 0 9.64 4.35 9.64 9.7 0 5.35-4.33 9.7-9.64 9.7Zm5.6-7.18c-.3-.15-1.78-.88-2.06-.98-.28-.1-.49-.15-.7.15-.2.3-.8.98-.98 1.18-.18.2-.36.22-.66.07-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.49-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.7-1.69-.96-2.31-.25-.6-.5-.52-.7-.53h-.6c-.2 0-.52.07-.8.37-.27.3-1.06 1.03-1.06 2.5 0 1.48 1.09 2.91 1.24 3.11.15.2 2.15 3.29 5.2 4.62.73.32 1.3.51 1.74.65.73.23 1.4.2 1.93.12.59-.09 1.78-.73 2.03-1.44.25-.7.25-1.31.18-1.44-.08-.13-.28-.2-.58-.35Z" />
            </svg>
          </span>
          <span className="font-medium">Chat with us</span>
        </div>
      </a>

      {/* Footer */}
      <footer className="bg-amari-900 text-amari-200 py-16 border-t-[6px] border-amari-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="bg-white/10 p-2 rounded-xl">
                  <Waves size={20} className="text-amari-300" />
               </div>
               <span className="text-white text-xl font-serif tracking-wide">AMARI</span>
            </div>
            <p className="text-sm leading-relaxed text-amari-100/70 font-light">
              We bring the magic of the Diani coastline to your special day. Simplifying destination weddings with local expertise and curated style.
            </p>
          </div>
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/couples" className="hover:text-amari-300 transition hover:translate-x-1 inline-block">For Couples</Link></li>
              <li><Link to="/vendors" className="hover:text-amari-300 transition hover:translate-x-1 inline-block">Vendor Directory</Link></li>
              <li><Link to="/tools" className="hover:text-amari-300 transition hover:translate-x-1 inline-block">Planning Tools</Link></li>
              <li><Link to="/gallery" className="hover:text-amari-300 transition hover:translate-x-1 inline-block">Inspiration Board</Link></li>
              <li><Link to="/community" className="hover:text-amari-300 transition hover:translate-x-1 inline-block">Community Hub</Link></li>
              <li><Link to="/activities" className="hover:text-amari-300 transition hover:translate-x-1 inline-block">Activities</Link></li>
              <li><Link to="/history" className="hover:text-amari-300 transition hover:translate-x-1 inline-block">Diani History</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/concierge" className="hover:text-amari-300 transition hover:translate-x-1 inline-block">Concierge Services</Link></li>
              <li><Link to="/about" className="hover:text-amari-300 transition hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link to="/community" className="hover:text-amari-300 transition hover:translate-x-1 inline-block">Community</Link></li>
              <li><Link to="/contact" className="hover:text-amari-300 transition hover:translate-x-1 inline-block">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-amari-300 transition hover:translate-x-1 inline-block">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-serif text-lg mb-6">For Business</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/partner" className="inline-block bg-amari-300 text-amari-900 px-6 py-2.5 rounded-lg transition font-bold hover:bg-white hover:text-amari-600">Join as Vendor</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 text-center text-xs flex flex-col md:flex-row justify-between items-center text-amari-100/50">
          <p>© {new Date().getFullYear()} Amari Experience. Made with ❤️ in Diani.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;