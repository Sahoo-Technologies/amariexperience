import React from 'react';

const Activities: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <span className="text-amari-500 font-bold uppercase tracking-widest text-xs mb-3 block">Activities</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-amari-900">Things To Do Around Diani</h2>
        <p className="mt-6 text-stone-600 max-w-3xl mx-auto text-lg font-light leading-relaxed">
          From ocean adventures to deep rest, Diani has something for every kind of guest.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-sm border border-amari-100 p-8">
          <h3 className="text-2xl font-serif font-bold text-amari-900 mb-3">Ocean & Water</h3>
          <ul className="text-stone-600 leading-relaxed space-y-2 list-disc pl-5">
            <li>Snorkelling</li>
            <li>Dhow cruises (sunrise or sunset)</li>
            <li>Swimming and beach walks</li>
            <li>Water sports and guided ocean adventures</li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-amari-100 p-8">
          <h3 className="text-2xl font-serif font-bold text-amari-900 mb-3">Relaxation</h3>
          <ul className="text-stone-600 leading-relaxed space-y-2 list-disc pl-5">
            <li>Spas and massages</li>
            <li>Beachfront brunches</li>
            <li>Quiet pool days</li>
            <li>Wellness sessions and slow mornings</li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-amari-100 p-8">
          <h3 className="text-2xl font-serif font-bold text-amari-900 mb-3">Tours & Culture</h3>
          <ul className="text-stone-600 leading-relaxed space-y-2 list-disc pl-5">
            <li>Local markets and coastal towns</li>
            <li>Swahili food experiences</li>
            <li>Guided day tours and adventures</li>
            <li>Photo spots along the coast</li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-amari-100 p-8">
          <h3 className="text-2xl font-serif font-bold text-amari-900 mb-3">Group Moments</h3>
          <ul className="text-stone-600 leading-relaxed space-y-2 list-disc pl-5">
            <li>Welcome dinners and rehearsal dinners</li>
            <li>Bachelor / bachelorette outings</li>
            <li>Anniversary and honeymoon experiences</li>
            <li>Proposal setups and surprise plans</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Activities;
