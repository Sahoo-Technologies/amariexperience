import React from 'react';

const DianiHistory: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <span className="text-amari-500 font-bold uppercase tracking-widest text-xs mb-3 block">History</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-amari-900">The Beautiful History of Diani</h2>
        <p className="mt-6 text-stone-600 max-w-4xl mx-auto text-lg font-light leading-relaxed">
          Diani was born of the sea and the sun. First home to the Digo people, it later welcomed Arab and Persian traders whose journeys shaped Swahili culture along the coast. Under British rule, it rested quietly, waiting. Then it awakened—its white sands and turquoise waters calling travelers, lovers, and dreamers. Today, Diani is where many histories meet, and every tide feels like a promise.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-amari-100/50 p-8 md:p-12 border border-amari-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-serif font-bold text-amari-900 mb-3">Roots</h3>
            <p className="text-stone-600 leading-relaxed">
              Diani’s earliest story is coastal and local—woven through the lives of the Digo people and the rhythms of the ocean.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-amari-900 mb-3">Trade & Culture</h3>
            <p className="text-stone-600 leading-relaxed">
              Traders from across the Indian Ocean brought languages, faiths, and ideas that helped shape the Swahili coast.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-amari-900 mb-3">A Quiet Chapter</h3>
            <p className="text-stone-600 leading-relaxed">
              Under British rule, the coastline changed slowly, holding onto calm stretches and everyday life.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-amari-900 mb-3">Diani Today</h3>
            <p className="text-stone-600 leading-relaxed">
              Now it’s a meeting place of stories—where celebrations feel brighter, and the sea keeps time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DianiHistory;
