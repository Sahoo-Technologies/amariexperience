import React from 'react';
import { Link } from 'react-router-dom';
import { WEDDING_VENDOR_CATEGORIES } from '../constants';
import {
  Building2, CalendarCheck, Tent, Palette, UtensilsCrossed, Cake,
  Camera, Sparkles, Shirt, Music, Car, Hotel, Compass, PenTool,
  Lightbulb, Gift, Scale, Shield, Trash2, Monitor, MoreHorizontal,
  ArrowRight
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Venues': <Building2 size={22} />,
  'Planning & Coordination': <CalendarCheck size={22} />,
  'Tents, Structures & Event Infrastructure': <Tent size={22} />,
  'Décor, Styling & Rentals': <Palette size={22} />,
  'Catering & Bar Services': <UtensilsCrossed size={22} />,
  'Cakes & Desserts': <Cake size={22} />,
  'Photography, Videography & Content': <Camera size={22} />,
  'Beauty & Grooming': <Sparkles size={22} />,
  'Fashion & Attire': <Shirt size={22} />,
  'Entertainment & Sound': <Music size={22} />,
  'Transport & Travel': <Car size={22} />,
  'Accommodation & Guest Services': <Hotel size={22} />,
  'Experiences & Activities': <Compass size={22} />,
  'Stationery, Signage & Personalisation': <PenTool size={22} />,
  'Lighting, AV & Special Effects': <Lightbulb size={22} />,
  'Gifts, Favors & Extras': <Gift size={22} />,
  'Legal & Ceremonial Services': <Scale size={22} />,
  'Security, Safety & Operations': <Shield size={22} />,
  'Cleanup & Post-Event Services': <Trash2 size={22} />,
  'Tech & Digital Services': <Monitor size={22} />,
  'Miscellaneous Services': <MoreHorizontal size={22} />,
};

const VendorCategories: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-amari-900">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=2000&auto=format" alt="Wedding" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-amari-900/80 to-amari-950/95" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 text-center">
          <span className="text-amari-300 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Complete Directory</span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-white mb-4">Wedding Vendor Categories</h1>
          <p className="text-white/50 max-w-2xl mx-auto text-base sm:text-lg mb-8">
            {WEDDING_VENDOR_CATEGORIES.length} specialised categories covering every aspect of your coastal wedding.
          </p>
          <Link
            to="/partner"
            className="inline-flex items-center gap-2 bg-white text-amari-900 px-7 py-3.5 rounded-full font-bold hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5 transition-all duration-300 text-sm"
          >
            Register as a Vendor <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WEDDING_VENDOR_CATEGORIES.map((c, idx) => (
            <div
              key={c.category}
              className="group bg-white rounded-2xl border border-stone-200/60 hover:border-amari-200 hover:shadow-xl hover:shadow-amari-500/5 transition-all duration-500 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amari-400 to-amari-600 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {CATEGORY_ICONS[c.category] || <MoreHorizontal size={22} />}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-stone-900 leading-snug mb-2">{c.category}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {c.examples.map((ex) => (
                        <span key={ex} className="bg-stone-50 border border-stone-100 text-stone-500 text-[10px] font-medium rounded-full px-2 py-0.5">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-amari-900 rounded-2xl p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amari-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">Don't see your category?</h3>
            <p className="text-white/50 mb-6 max-w-lg mx-auto text-sm">We're always expanding. If your service supports weddings, we'd love to hear from you.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/partner" className="bg-white text-amari-900 px-7 py-3 rounded-full font-bold hover:shadow-lg transition text-sm">
                Apply Now
              </Link>
              <Link to="/contact" className="border border-white/20 text-white px-7 py-3 rounded-full font-bold hover:bg-white/10 transition text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCategories;
