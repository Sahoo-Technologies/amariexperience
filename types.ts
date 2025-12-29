export enum VendorCategory {
  Venue = 'Venue',
  Planner = 'Planner',
  Photographer = 'Photographer',
  Caterer = 'Caterer',
  Stylist = 'Stylist',
  Transport = 'Transport'
}

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  rating: number;
  priceRange: '$$' | '$$$' | '$$$$';
  description: string;
  imageUrl: string;
  location: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  estimated: number;
  actual: number;
}

export interface Guest {
  id: string;
  name: string;
  rsvpStatus: 'Pending' | 'Confirmed' | 'Declined';
  table: number | null;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface VendorApplication {
  id: string;
  businessName: string;
  category: VendorCategory;
  description: string;
  priceRange: '$$' | '$$$' | '$$$$';
  location: string;
  contactEmail: string;
  contactPhone: string;
  submittedAt: number;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface InspirationPost {
  id: string;
  authorType: 'Guest' | 'Vendor';
  authorName: string;
  title: string;
  imageUrl: string;
  story: string;
  createdAt: number;
}

export interface ItineraryItem {
  id: string;
  day: string;
  time: string;
  place: string;
  notes: string;
  createdAt: number;
}
