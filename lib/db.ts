// Database connection configuration
const connectionString = 'postgresql://neondb_owner:npg_COWH0y3qtwUa@ep-misty-bush-ah51gttt-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require';

// Simple database connection using fetch for now
export const executeQuery = async (query: string, params: any[] = []) => {
  try {
    const response = await fetch('https://ep-misty-bush-ah51gttt-pooler.c-3.us-east-1.aws.neon.tech/sql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${connectionString.split('://')[1].split('@')[0]}`
      },
      body: JSON.stringify({ query, params })
    });
    
    if (!response.ok) {
      throw new Error(`Database query failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
};

// Test connection function
export const testConnection = async () => {
  try {
    const result = await executeQuery('SELECT NOW()');
    console.log('Database connected successfully:', result);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Initialize database tables
export const initializeDatabase = async () => {
  try {
    // Create vendor_applications table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS vendor_applications (
        id VARCHAR(255) PRIMARY KEY,
        business_name VARCHAR(255) NOT NULL,
        vendor_type VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        business_registration_url TEXT,
        contact_person_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        portfolio_photos TEXT[],
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create vendors table for approved vendors
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS vendors (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        rating DECIMAL(2,1) DEFAULT 0.0,
        price_range VARCHAR(10),
        description TEXT,
        image_url VARCHAR(500),
        location VARCHAR(255) NOT NULL,
        contact_email VARCHAR(255),
        contact_phone VARCHAR(50),
        approved_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables initialized successfully');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
};
