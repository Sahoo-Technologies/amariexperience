import { VendorApplication, VendorCategory } from '../types';

// In-memory store for demonstration purposes
let applications: VendorApplication[] = [
  {
    id: 'mock-1',
    businessName: 'Diani Floral Studio',
    category: VendorCategory.Stylist,
    description: 'Bespoke tropical floral arrangements for beach weddings.',
    priceRange: '$$',
    location: 'Ukunda, near Airstrip',
    contactEmail: 'hello@dianifloral.com',
    contactPhone: '+254 712 345 678',
    submittedAt: Date.now() - 86400000, // 1 day ago
    status: 'Pending'
  }
];

export const submitApplication = (app: Omit<VendorApplication, 'id' | 'submittedAt' | 'status'>): VendorApplication => {
  const newApp: VendorApplication = {
    ...app,
    id: Date.now().toString(),
    submittedAt: Date.now(),
    status: 'Pending'
  };
  applications = [newApp, ...applications];
  return newApp;
};

export const getApplications = (): VendorApplication[] => {
  return [...applications];
};

export const updateApplicationStatus = (id: string, status: 'Approved' | 'Rejected') => {
  applications = applications.map(app => 
    app.id === id ? { ...app, status } : app
  );
};
