import { Vendor, VendorCategory, BudgetItem, Guest } from './types';

export const MOCK_VENDORS: Vendor[] = [
  {
    id: '1',
    name: 'The Sands at Nomad',
    category: VendorCategory.Venue,
    rating: 4.8,
    priceRange: '$$$$',
    description: 'Exclusive beach resort offering pristine white sands and luxury reception halls.',
    imageUrl: 'https://picsum.photos/id/1040/400/300',
    location: 'Diani Beach Road'
  },
  {
    id: '2',
    name: 'Swahili Beach Resort',
    category: VendorCategory.Venue,
    rating: 4.7,
    priceRange: '$$$$',
    description: 'Arabian-influenced architecture with cascading pools and beachfront vows.',
    imageUrl: 'https://picsum.photos/id/1039/400/300',
    location: 'Diani Beach'
  },
  {
    id: '3',
    name: 'Coastal Captures',
    category: VendorCategory.Photographer,
    rating: 4.9,
    priceRange: '$$$',
    description: 'Capturing the golden hour magic of the Kenyan coast.',
    imageUrl: 'https://picsum.photos/id/250/400/300',
    location: 'Ukunda'
  },
  {
    id: '4',
    name: 'Spice & Clove Catering',
    category: VendorCategory.Caterer,
    rating: 4.6,
    priceRange: '$$',
    description: 'Fusion of traditional Swahili dishes and modern continental cuisine.',
    imageUrl: 'https://picsum.photos/id/493/400/300',
    location: 'Mombasa/Diani'
  },
  {
    id: '5',
    name: 'Elegant Events Kenya',
    category: VendorCategory.Planner,
    rating: 5.0,
    priceRange: '$$$',
    description: 'Full-service wedding planning from logistics to decor.',
    imageUrl: 'https://picsum.photos/id/435/400/300',
    location: 'Diani'
  },
  {
    id: '6',
    name: 'Ocean Air Safaris',
    category: VendorCategory.Transport,
    rating: 4.5,
    priceRange: '$$',
    description: 'Private charters and guest shuttles from Ukunda Airstrip.',
    imageUrl: 'https://picsum.photos/id/212/400/300',
    location: 'Ukunda Airstrip'
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
