import React from 'react';
import { Shield, Mail, Phone } from 'lucide-react';

const SECTIONS = [
  {
    title: '1. Platform Purpose',
    body: 'Amari is a destination wedding discovery and connection platform. We do not act as a wedding planner, agent, employer, or contracting party between users.',
  },
  {
    title: '2. Eligibility',
    body: 'You must be at least 18 years old and legally able to enter agreements to use Amari.',
  },
  {
    title: '3. Accounts',
    body: 'You agree to provide accurate information, keep your login details secure, and notify us of unauthorized access. Amari may suspend or terminate accounts that breach these Terms.',
  },
  {
    title: '4. Vendors & Planners',
    body: `Vendors and planners may be required to submit verification documents.

    Documents are for internal verification only
    They do not appear on public profiles
    Verification is not an endorsement or guarantee of services

Vendors are responsible for their listings, pricing, and service delivery.`,
  },
  {
    title: '5. Acceptable Use',
    body: 'You agree not to misuse the platform, misrepresent services, upload misleading or unlawful content, or interfere with platform security.',
  },
  {
    title: '6. Bookings & Payments',
    body: 'Amari does not process payments or guarantee bookings unless explicitly stated. All agreements and payments between users are independent and at their own risk.',
  },
  {
    title: '7. Fees',
    body: 'Certain features may involve subscription fees, listing fees, or commissions. All fees will be clearly disclosed in advance.',
  },
  {
    title: '8. Intellectual Property',
    body: 'All platform content belongs to Amari or its licensors. Users retain ownership of uploaded content but grant Amari permission to use it for platform operations and promotion.',
  },
  {
    title: '9. Privacy',
    body: 'Use of Amari is governed by our Privacy Policy.',
  },
  {
    title: '10. Liability',
    body: 'Amari is not responsible for disputes, losses, or damages arising from user interactions. Use of the platform is at your own risk.',
  },
  {
    title: '11. Termination',
    body: 'Amari may suspend or terminate access for violations of these Terms or to comply with legal obligations.',
  },
  {
    title: '12. Governing Law',
    body: 'These Terms are governed by the laws of Kenya.',
  },
];

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 sm:py-20 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amari-50 border border-amari-100 mb-5">
          <Shield size={26} className="text-amari-500" />
        </div>
        <span className="text-amari-500 font-bold uppercase tracking-widest text-xs mb-3 block">Legal</span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amari-900">Terms of Service</h1>
        <p className="mt-4 text-stone-500 text-sm">Effective date: February 7, 2026</p>
        <p className="mt-6 text-stone-600 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed">
          Welcome to Amari — Where love meets destination. By accessing or using the Amari web app, you agree to these Terms of Service.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {SECTIONS.map((section, idx) => (
          <section key={idx} className="bg-white rounded-2xl shadow-sm border border-amari-100 p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-amari-900 mb-3">{section.title}</h2>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">{section.body}</p>
          </section>
        ))}

        {/* Contact */}
        <section className="bg-gradient-to-br from-amari-50 to-white rounded-2xl shadow-sm border border-amari-200 p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-amari-900 mb-4">13. Contact</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-stone-600 text-sm">
              <Mail size={16} className="text-amari-400 flex-shrink-0" />
              <a href="mailto:Fiona.kimingi@amariexperiences.com" className="hover:text-amari-600 transition">Fiona.kimingi@amariexperiences.com</a>
            </div>
            <div className="flex items-center gap-3 text-stone-600 text-sm">
              <Phone size={16} className="text-amari-400 flex-shrink-0" />
              <a href="https://wa.me/254796535120" target="_blank" rel="noreferrer" className="hover:text-amari-600 transition">+254 796 535 120</a>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <p className="text-center text-xs text-stone-400 pt-4">
          This document is for general informational purposes and does not replace legal advice.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
