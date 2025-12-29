import React, { useEffect, useMemo, useState } from 'react';
import { InspirationPost } from '../types';

const STORAGE_KEY = 'amari_inspiration_posts_v1';

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
  const [posts, setPosts] = useState<InspirationPost[]>([]);
  const [authorType, setAuthorType] = useState<InspirationPost['authorType']>('Guest');
  const [authorName, setAuthorName] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [story, setStory] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as InspirationPost[];
      if (Array.isArray(parsed)) setPosts(parsed);
    } catch {
      // Ignore malformed storage
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch {
      // Ignore storage write issues
    }
  }, [posts]);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => b.createdAt - a.createdAt);
  }, [posts]);

  const submitPost = () => {
    setError(null);

    const trimmedTitle = title.trim();
    const trimmedImageUrl = imageUrl.trim();
    const trimmedStory = story.trim();
    const trimmedAuthorName = authorName.trim();

    if (!trimmedImageUrl) {
      setError('Please add an image URL.');
      return;
    }
    if (!trimmedTitle && !trimmedStory) {
      setError('Please add a title or a story.');
      return;
    }

    const newPost: InspirationPost = {
      id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      authorType,
      authorName: trimmedAuthorName,
      title: trimmedTitle,
      imageUrl: trimmedImageUrl,
      story: trimmedStory,
      createdAt: Date.now(),
    };

    setPosts((prev) => [newPost, ...prev]);
    setAuthorName('');
    setTitle('');
    setImageUrl('');
    setStory('');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
       <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800">Inspiration Board</h2>
        <p className="mt-4 text-stone-600">Guests and vendors can post photos, stories, and real experiences from Diani.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-amari-100 p-6 md:p-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Posting As</label>
            <select
              value={authorType}
              onChange={(e) => setAuthorType(e.target.value as InspirationPost['authorType'])}
              className="w-full bg-amari-50 border border-amari-100 rounded-2xl px-4 py-3 outline-none text-amari-900"
            >
              <option value="Guest">Guest</option>
              <option value="Vendor">Vendor</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Name (optional)</label>
            <input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-amari-50 border border-amari-100 rounded-2xl px-4 py-3 outline-none text-amari-900 placeholder:text-stone-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Image URL</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-amari-50 border border-amari-100 rounded-2xl px-4 py-3 outline-none text-amari-900 placeholder:text-stone-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Title (optional)</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sunset dinner rehearsal at the beach"
              className="w-full bg-amari-50 border border-amari-100 rounded-2xl px-4 py-3 outline-none text-amari-900 placeholder:text-stone-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Story (optional)</label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Share your experience, tips, or what you loved..."
              rows={4}
              className="w-full bg-amari-50 border border-amari-100 rounded-2xl px-4 py-3 outline-none text-amari-900 placeholder:text-stone-400 resize-none"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-amari-50 border border-amari-100 rounded-2xl px-4 py-3 text-sm text-amari-terracotta">
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={submitPost}
            className="bg-amari-500 text-white px-6 py-3 rounded-xl hover:bg-amari-600 font-bold transition shadow-md"
          >
            Post
          </button>
        </div>
      </div>

      {sortedPosts.length > 0 && (
        <div className="mb-10">
          <h3 className="text-2xl font-serif font-bold text-amari-900 mb-4">Latest Posts</h3>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {sortedPosts.map((post) => (
              <div key={post.id} className="break-inside-avoid bg-white rounded-2xl border border-amari-100 overflow-hidden shadow-sm">
                <div className="relative">
                  <img src={post.imageUrl} alt={post.title || 'Inspiration post'} className="w-full h-auto object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amari-500">
                      {post.authorType}{post.authorName ? ` • ${post.authorName}` : ''}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {post.title && (
                    <h4 className="text-lg font-serif font-bold text-amari-900 mb-2 leading-snug">{post.title}</h4>
                  )}
                  {post.story && (
                    <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">{post.story}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-serif font-bold text-amari-900">Gallery</h3>
        <p className="mt-3 text-stone-600">A few coastal moments to spark ideas.</p>
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
