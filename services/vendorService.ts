import { VendorApplication, VendorCategory } from '../types';
import { executeQuery } from '../lib/db';

// Submit vendor application to database
export const submitApplication = async (app: Omit<VendorApplication, 'id' | 'submittedAt' | 'status'>): Promise<VendorApplication> => {
  try {
    const id = Date.now().toString();
    const submittedAt = new Date().toISOString();
    
    // Handle file uploads (convert to URLs or base64 for storage)
    let businessRegistrationUrl = null;
    if (app.businessRegistration) {
      // In a real app, you'd upload to a storage service
      // For now, we'll store the file name
      businessRegistrationUrl = app.businessRegistration.name;
    }

    let portfolioPhotos: string[] = [];
    if (app.portfolioPhotos && app.portfolioPhotos.length > 0) {
      // Convert file objects to URLs or base64
      portfolioPhotos = app.portfolioPhotos.map(file => file.name);
    }

    const newApp: VendorApplication = {
      ...app,
      id,
      submittedAt: new Date(submittedAt).getTime(),
      status: 'Pending'
    };

    // Insert into database
    await executeQuery(`
      INSERT INTO vendor_applications (
        id, business_name, vendor_type, location, business_registration_url,
        contact_person_name, email, phone, portfolio_photos, 
        submitted_at, status
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      )
    `, [
      id,
      app.businessName,
      app.vendorType,
      app.location,
      businessRegistrationUrl,
      app.contactPersonName,
      app.email,
      app.phone,
      JSON.stringify(portfolioPhotos),
      submittedAt,
      'Pending'
    ]);

    console.log('Application submitted successfully:', newApp);
    return newApp;
  } catch (error) {
    console.error('Failed to submit application:', error);
    throw new Error('Failed to submit vendor application');
  }
};

// Get all vendor applications
export const getApplications = async (): Promise<VendorApplication[]> => {
  try {
    const result = await executeQuery(`
      SELECT * FROM vendor_applications 
      ORDER BY submitted_at DESC
    `);
    
    return result.map((row: any) => ({
      id: row.id,
      businessName: row.business_name,
      category: row.vendor_type as VendorCategory,
      location: row.location,
      businessRegistration: null, // Would be file object in real implementation
      contactPersonName: row.contact_person_name,
      email: row.email,
      phone: row.phone,
      portfolioPhotos: row.portfolio_photos ? JSON.parse(row.portfolio_photos) : [],
      submittedAt: new Date(row.submitted_at).getTime(),
      status: row.status
    }));
  } catch (error) {
    console.error('Failed to get applications:', error);
    throw new Error('Failed to retrieve vendor applications');
  }
};

// Update application status
export const updateApplicationStatus = async (id: string, status: 'Approved' | 'Rejected'): Promise<void> => {
  try {
    await executeQuery(`
      UPDATE vendor_applications 
      SET status = $1, approved_at = $2
      WHERE id = $3
    `, [status, status === 'Approved' ? new Date().toISOString() : null, id]);
    
    console.log(`Application ${id} status updated to:`, status);
  } catch (error) {
    console.error('Failed to update application status:', error);
    throw new Error('Failed to update application status');
  }
};

// Get approved vendors for directory
export const getApprovedVendors = async () => {
  try {
    const result = await executeQuery(`
      SELECT * FROM vendors 
      WHERE approved_at IS NOT NULL
      ORDER BY approved_at DESC
    `);
    
    return result.map((row: any) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      rating: parseFloat(row.rating),
      priceRange: row.price_range || '$$$',
      description: row.description,
      imageUrl: row.image_url,
      location: row.location
    }));
  } catch (error) {
    console.error('Failed to get approved vendors:', error);
    return [];
  }
};
