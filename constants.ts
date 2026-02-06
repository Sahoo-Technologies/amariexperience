import { Vendor, VendorCategory, BudgetItem, Guest, WeddingVendorCategory } from './types';

export const WEDDING_VENDOR_CATEGORIES: Array<{ category: WeddingVendorCategory; examples: string[] }> = [
  {
    category: 'Venues',
    examples: ['Hotels', 'Resorts', 'Villas', 'Private Properties', 'Gardens', 'Beaches', 'Rooftops', 'Safari Lodges', 'Historic Venues']
  },
  {
    category: 'Planning & Coordination',
    examples: ['Wedding Planners', 'Destination Planners', 'Day-of Coordinators', 'Guest Logistics Coordinators']
  },
  {
    category: 'Tents, Structures & Event Infrastructure',
    examples: ['Tents', 'Marquees', 'Clear Span', 'Flooring', 'Staging', 'Rigging']
  },
  {
    category: 'Décor, Styling & Rentals',
    examples: ['Stylists', 'Floral Designers', 'Furniture Rentals', 'Linen/Tableware', 'Lighting', 'Arches & Backdrops']
  },
  {
    category: 'Catering & Bar Services',
    examples: ['Caterers', 'Private Chefs', 'Mobile Caterers', 'Bar Services', 'Mixologists']
  },
  {
    category: 'Cakes & Desserts',
    examples: ['Wedding Cakes', 'Custom Cakes', 'Dessert Tables', 'Pastry Chefs']
  },
  {
    category: 'Photography, Videography & Content',
    examples: ['Photographers', 'Videographers', 'Cinematographers', 'Drone Operators', 'Content Creators', 'Reels Creators']
  },
  {
    category: 'Beauty & Grooming',
    examples: ['Hair', 'Makeup', 'Grooming', 'Skincare', 'Nail Services']
  },
  {
    category: 'Fashion & Attire',
    examples: ['Bridal Gowns', 'Bridal Boutiques', 'Suits', 'Tailors', 'Bridesmaid Dresses', 'Traditional Attire']
  },
  {
    category: 'Entertainment & Sound',
    examples: ['DJs', 'Live Bands', 'Musicians', 'Saxophonists', 'Violinists', 'Cultural Performers', 'MCs', 'Sound System Providers']
  },
  {
    category: 'Transport & Travel',
    examples: ['Bridal Cars', 'Luxury Vehicles', 'Guest Shuttles', 'Boats/Yachts', 'Helicopters', 'Airport Transfers']
  },
  {
    category: 'Accommodation & Guest Services',
    examples: ['Hotels', 'Resorts', 'Villas', 'Guesthouses', 'Airbnb Hosts', 'Concierge Services']
  },
  {
    category: 'Experiences & Activities',
    examples: ['Tour Operators', 'Safari Operators', 'Boat Tours', 'Snorkelling/Diving', 'Spa & Wellness', 'Cultural Experiences', 'Adventure Activities']
  },
  {
    category: 'Stationery, Signage & Personalisation',
    examples: ['Invitations', 'Calligraphy', 'Signage', 'Seating Charts', 'Custom Stationery']
  },
  {
    category: 'Lighting, AV & Special Effects',
    examples: ['Event Lighting', 'Audio-Visual', 'Projection Mapping', 'Fireworks', 'Smoke/Fog Effects']
  },
  {
    category: 'Gifts, Favors & Extras',
    examples: ['Wedding Favors', 'Custom Gifts', 'Welcome Boxes', 'Hampers']
  },
  {
    category: 'Legal & Ceremonial Services',
    examples: ['Officiants', 'Civil Registrars', 'Religious Leaders', 'Marriage Legal Support', 'Vow Renewal Officiants']
  },
  {
    category: 'Security, Safety & Operations',
    examples: ['Event Security', 'Medical Standby', 'Crowd Control']
  },
  {
    category: 'Cleanup & Post-Event Services',
    examples: ['Cleanup Companies', 'Waste Management', 'Equipment Breakdown Crews']
  },
  {
    category: 'Tech & Digital Services',
    examples: ['Wedding Website Designers', 'RSVP Management', 'Live Streaming', 'Wedding App Developers']
  },
  {
    category: 'Miscellaneous Services',
    examples: ['Childcare', 'Pet Handlers', 'Accessibility Services', 'Weather Contingency Planning']
  }
];

export const MOCK_VENDORS: Vendor[] = [
  {
    id: '1',
    name: 'Diani Beach Palace',
    category: VendorCategory.Venue,
    rating: 4.9,
    priceRange: '$$$$',
    description: 'Luxurious beachfront venue with pristine white sands and ocean views for unforgettable ceremonies.',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format',
    location: 'Diani Beach Road'
  },
  {
    id: '2',
    name: 'Coastal Dreams Weddings',
    category: VendorCategory.Planner,
    rating: 4.8,
    priceRange: '$$$',
    description: 'Expert destination wedding planning team specializing in Diani Coast celebrations.',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format',
    location: 'Diani Beach'
  },
  {
    id: '3',
    name: 'Swahili Coastal Cuisine',
    category: VendorCategory.Caterer,
    rating: 4.7,
    priceRange: '$$',
    description: 'Authentic coastal cuisine blending traditional Swahili flavors with modern culinary excellence.',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format',
    location: 'Diani Coast'
  },
  {
    id: '4',
    name: 'Ocean Lens Photography',
    category: VendorCategory.Photographer,
    rating: 5.0,
    priceRange: '$$$',
    description: 'Professional photography and film services capturing the magic of destination weddings.',
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&auto=format',
    location: 'Diani Beach'
  },
  {
    id: '5',
    name: 'Diani Guest Transfers',
    category: VendorCategory.Transport,
    rating: 4.6,
    priceRange: '$$',
    description: 'Reliable luxury transport services and guest shuttles throughout the Diani Coast.',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format',
    location: 'Ukunda Airstrip'
  },
  {
    id: '6',
    name: 'Paradise Beach Resort',
    category: VendorCategory.Accommodation,
    rating: 4.8,
    priceRange: '$$$$',
    description: 'Exclusive beachfront resort with tropical gardens, private beach access, and concierge services.',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format',
    location: 'Diani Beach'
  },
  {
    id: '7',
    name: 'Diani Bloom Florals',
    category: VendorCategory.Stylist,
    rating: 4.9,
    priceRange: '$$$',
    description: 'Tropical floral design, arches, backdrops, and full event styling for dream beach weddings.',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&auto=format',
    location: 'Diani Beach'
  },
  {
    id: '8',
    name: 'Sweet Coast Cakes',
    category: VendorCategory.Cakes,
    rating: 4.7,
    priceRange: '$$',
    description: 'Custom wedding cakes, dessert tables, and pastry creations with a coastal twist.',
    imageUrl: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&auto=format',
    location: 'Ukunda'
  },
  {
    id: '9',
    name: 'Coastal Glow Beauty',
    category: VendorCategory.Beauty,
    rating: 4.8,
    priceRange: '$$$',
    description: 'Bridal hair, makeup, and grooming services for the perfect beach-ready look.',
    imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&auto=format',
    location: 'Diani Beach'
  },
  {
    id: '10',
    name: 'Diani Beats Entertainment',
    category: VendorCategory.Entertainment,
    rating: 4.9,
    priceRange: '$$$',
    description: 'Live bands, DJs, saxophonists, and cultural performers for unforgettable celebrations.',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format',
    location: 'Diani Beach'
  },
  {
    id: '11',
    name: 'Safari & Sea Experiences',
    category: VendorCategory.Experiences,
    rating: 4.7,
    priceRange: '$$',
    description: 'Tour operators offering boat trips, snorkeling, safaris, and cultural excursions for wedding guests.',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format',
    location: 'South Coast'
  },
  {
    id: '12',
    name: 'Marquee Masters Kenya',
    category: VendorCategory.Tents,
    rating: 4.6,
    priceRange: '$$$',
    description: 'Premium tents, marquees, staging, and event infrastructure for outdoor celebrations.',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&auto=format',
    location: 'Diani Coast'
  },
  {
    id: '13',
    name: 'Bridal Couture Diani',
    category: VendorCategory.Fashion,
    rating: 4.8,
    priceRange: '$$$$',
    description: 'Bridal gowns, suits, traditional attire, and bridesmaid dresses for your perfect day.',
    imageUrl: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=600&auto=format',
    location: 'Diani Beach'
  },
  {
    id: '14',
    name: 'Spark & Glow Events',
    category: VendorCategory.Lighting,
    rating: 4.7,
    priceRange: '$$$',
    description: 'Event lighting, AV systems, projection mapping, and special effects for magical nights.',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&auto=format',
    location: 'Diani Coast'
  },
  {
    id: '15',
    name: 'Coastal Calligraphy & Print',
    category: VendorCategory.Stationery,
    rating: 4.9,
    priceRange: '$$',
    description: 'Custom wedding invitations, signage, seating charts, and personalised stationery.',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format',
    location: 'Diani Beach'
  }
];

export const INITIAL_BUDGET: BudgetItem[] = [
  { id: '1', category: 'Venue', estimated: 5000, actual: 4800 },
  { id: '2', category: 'Catering', estimated: 3000, actual: 3200 },
  { id: '3', category: 'Photography', estimated: 1500, actual: 0 },
  { id: '4', category: 'Attire', estimated: 2000, actual: 0 },
  { id: '5', category: 'Decor', estimated: 1200, actual: 0 },
  { id: '6', category: 'Transport', estimated: 500, actual: 0 },
];

export const INITIAL_GUESTS: Guest[] = [
  { id: '1', name: 'John Doe', rsvpStatus: 'Confirmed', table: 1 },
  { id: '2', name: 'Jane Smith', rsvpStatus: 'Pending', table: 1 },
  { id: '3', name: 'Michael Johnson', rsvpStatus: 'Declined', table: null },
];
