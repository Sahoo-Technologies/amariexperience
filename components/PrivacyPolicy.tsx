import React from 'react';
import { Lock, Mail, Phone } from 'lucide-react';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: `a) Personal Information

We may collect:
\u2022 Full name
\u2022 Email address
\u2022 Phone number (including WhatsApp)
\u2022 Location (city/country)
\u2022 Account login details

b) Vendor & Business Information

For vendors and planners, we may collect:
\u2022 Business name and contact details
\u2022 Business registration or verification documents
\u2022 Service category and service descriptions
\u2022 Pricing ranges (optional)
\u2022 Portfolio links or sample images

Note: Verification documents uploaded during onboarding are used strictly for internal verification and do not appear on public vendor profiles.

c) Usage & Technical Data

We may automatically collect:
\u2022 IP address
\u2022 Device and browser type
\u2022 Pages viewed and interactions within the app
\u2022 Date and time of access`,
  },
  {
    title: '2. How We Use Your Information',
    body: `We use collected information to:
\u2022 Create and manage user and vendor accounts
\u2022 Verify vendors and maintain platform trust
\u2022 Facilitate connections between couples, planners, and vendors
\u2022 Improve platform functionality and user experience
\u2022 Communicate important updates and service information
\u2022 Comply with legal and regulatory obligations

We do not sell or rent personal data to third parties.`,
  },
  {
    title: '3. Sharing of Information',
    body: `We may share limited information only:
\u2022 With trusted service providers who support platform operations (under confidentiality obligations)
\u2022 Where required by law, regulation, or legal process
\u2022 With user consent

Public profiles only display information intentionally provided for public viewing.`,
  },
  {
    title: '4. Data Storage & Security',
    body: `We implement appropriate technical and organizational measures to protect your data, including:
\u2022 Secure servers
\u2022 Restricted internal access
\u2022 Encrypted data transmission where applicable

While we take reasonable steps to protect information, no digital platform can guarantee absolute security.`,
  },
  {
    title: '5. Data Retention',
    body: `We retain personal data only for as long as necessary to:
\u2022 Provide services
\u2022 Meet legal and operational requirements
\u2022 Resolve disputes and enforce agreements

Users may request deletion of their accounts and associated data, subject to legal obligations.`,
  },
  {
    title: '6. Your Rights',
    body: `Depending on applicable law, you may have the right to:
\u2022 Access your personal data
\u2022 Correct inaccurate information
\u2022 Request deletion of your data
\u2022 Withdraw consent for certain processing activities

Requests can be made by contacting us using the details below.`,
  },
  {
    title: '7. Cookies',
    body: `Amari may use cookies or similar technologies to:
\u2022 Enhance site functionality
\u2022 Remember user preferences
\u2022 Analyze platform usage

You may control cookies through your browser settings.`,
  },
  {
    title: '8. Third-Party Links',
    body: 'Amari may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those external sites.',
  },
  {
    title: "9. Children's Privacy",
    body: 'Amari is not intended for individuals under the age of 18. We do not knowingly collect data from minors.',
  },
  {
    title: '10. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised effective date.',
  },
];

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 sm:py-20 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amari-50 border border-amari-100 mb-5">
          <Lock size={26} className="text-amari-500" />
        </div>
        <span className="text-amari-500 font-bold uppercase tracking-widest text-xs mb-3 block">Legal</span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amari-900">Privacy Policy</h1>
        <p className="mt-4 text-stone-500 text-sm">Effective date: February 7, 2026</p>
        <p className="mt-6 text-stone-600 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed">
          Amari ("we", "our", "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect information when you use the Amari web app — Where love meets destination.
        </p>
        <p className="mt-3 text-stone-500 text-sm">
          This policy applies to all users of the Amari platform, including couples, planners, vendors, and visitors.
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
          <h2 className="text-lg sm:text-xl font-serif font-bold text-amari-900 mb-4">11. Contact Us</h2>
          <p className="text-stone-600 text-sm mb-4">If you have questions or requests regarding this Privacy Policy, please contact:</p>
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
          This Privacy Policy is designed to reflect Amari's values of trust, transparency, and care. It does not replace professional legal advice.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
