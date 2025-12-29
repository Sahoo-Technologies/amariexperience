import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <span className="text-amari-500 font-bold uppercase tracking-widest text-xs mb-3 block">About Us</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-amari-900">Amari Experience</h2>
        <p className="mt-6 text-stone-600 max-w-3xl mx-auto text-lg font-light leading-relaxed">
          We help couples (and their people) plan unforgettable celebrations in Diani—pairing local insight with curated vendors and practical tools.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-amari-100/50 p-8 md:p-12 border border-amari-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-serif font-bold text-amari-900 mb-3">What We Do</h3>
            <p className="text-stone-600 leading-relaxed">
              Amari Experience brings together trusted coastal vendors, planning resources, and on-the-ground knowledge so you can design a celebration that feels effortless and personal.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-amari-900 mb-3">Celebrations We Love</h3>
            <ul className="text-stone-600 leading-relaxed space-y-2 list-disc pl-5">
              <li>Honeymoons</li>
              <li>Anniversaries</li>
              <li>Proposals</li>
              <li>Rehearsal dinners</li>
              <li>Bachelor / bachelorette parties</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-10 border-t border-amari-100">
          <h3 className="text-2xl font-serif font-bold text-amari-900 mb-3">Community, Not Just a Checklist</h3>
          <p className="text-stone-600 leading-relaxed">
            We’re building a community where guests and vendors can share real stories, inspiration, and local recommendations—so planning feels grounded in lived experiences, not generic templates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
