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
    body: `We implement appropriate technical and organizational measures to protect your data in compliance with the Kenya Data Protection Act, 2019 and international best practices, including:
\u2022 Dual-database architecture with automatic failover (primary and secondary) to ensure data availability
\u2022 Encrypted data transmission (SSL/TLS) for all connections
\u2022 Passwords hashed using industry-standard bcrypt algorithms
\u2022 Secure, access-controlled servers hosted by reputable cloud providers
\u2022 Restricted internal access on a need-to-know basis
\u2022 Session tokens stored as HTTP-only cookies to prevent cross-site scripting
\u2022 Regular security reviews and updates

Your data is stored on servers that may be located outside Kenya. By using our platform, you consent to the transfer of data to these servers, which maintain equivalent or higher levels of data protection as required under the Kenya DPA.

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
    title: '6. Your Rights Under the Kenya Data Protection Act, 2019',
    body: `As a data subject under Kenya's Data Protection Act, 2019, you have the following rights:
\u2022 Right of access — Request a copy of the personal data we hold about you
\u2022 Right to rectification — Request correction of inaccurate or incomplete data
\u2022 Right to erasure — Request deletion of your personal data (subject to legal retention obligations)
\u2022 Right to restrict processing — Request that we limit how we use your data
\u2022 Right to data portability — Receive your data in a structured, commonly used format
\u2022 Right to object — Object to processing of your data for specific purposes
\u2022 Right to withdraw consent — Withdraw consent at any time without affecting the lawfulness of prior processing

To exercise any of these rights, contact us at Fiona.kimingi@amariexperiences.com or use the data deletion request feature in your account settings. We will respond to your request within 30 days as required by the Act.

You also have the right to lodge a complaint with the Office of the Data Protection Commissioner (ODPC) of Kenya if you believe your data rights have been violated.`,
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
    title: '10. Legal Basis for Processing (Kenya DPA)',
    body: `We process your personal data on the following lawful bases as defined by the Kenya Data Protection Act, 2019:
\u2022 Consent — You have given explicit consent for us to process your data (e.g. during account registration)
\u2022 Contractual necessity — Processing is necessary to provide our services to you
\u2022 Legal obligation — Processing is required to comply with Kenyan law
\u2022 Legitimate interest — Processing is necessary for our legitimate business interests, provided these do not override your fundamental rights

We collect only the minimum data necessary for the stated purposes and do not engage in automated decision-making or profiling that produces legal effects.`,
  },
  {
    title: '11. Data Protection Officer',
    body: `In accordance with the Kenya Data Protection Act, 2019, our designated Data Protection contact is:

Fiona Kimingi
Email: Fiona.kimingi@amariexperiences.com
Phone/WhatsApp: +254 796 535 120

This contact is responsible for overseeing data protection compliance and handling data subject requests.`,
  },
  {
    title: '12. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised effective date. Where changes are significant, we will notify registered users via email or in-app notification.',
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
          <h2 className="text-lg sm:text-xl font-serif font-bold text-amari-900 mb-4">13. Contact Us</h2>
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
