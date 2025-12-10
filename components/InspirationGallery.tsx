import React from 'react';

const IMAGES = [
  'https://picsum.photos/id/1015/600/400',
  'https://picsum.photos/id/1016/400/600',
  'https://picsum.photos/id/1025/400/400',
  'https://picsum.photos/id/1036/600/400',
  'https://picsum.photos/id/301/400/600',
  'https://picsum.photos/id/306/400/400',
  'https://picsum.photos/id/319/600/400',
];

const InspirationGallery: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
       <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800">Inspiration Gallery</h2>
        <p className="mt-4 text-stone-600">Real weddings and styled shoots from the Diani coastline.</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {IMAGES.map((src, index) => (
          <div key={index} className="break-inside-avoid relative group overflow-hidden rounded-xl">
             <img src={src} alt="Wedding Inspiration" className="w-full h-auto object-cover transform transition duration-500 group-hover:scale-110" />
             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white border border-white px-4 py-2 uppercase text-xs tracking-widest font-bold">View</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspirationGallery;
