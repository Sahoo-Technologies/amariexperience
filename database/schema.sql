-- =====================================================
-- AMARI EXPERIENCE DATABASE SCHEMA
-- Wedding Platform for Diani, Kenya
-- =====================================================

-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Users table for couples and vendors
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    user_type VARCHAR(20) CHECK (user_type IN ('couple', 'vendor', 'admin')) NOT NULL,
    profile_image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Vendor applications table
CREATE TABLE IF NOT EXISTS vendor_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    business_name VARCHAR(255) NOT NULL,
    vendor_type VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    business_registration_url TEXT,
    contact_person_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    website VARCHAR(500),
    social_media JSONB, -- Store social media links as JSON
    portfolio_photos TEXT[], -- Array of photo URLs
    business_description TEXT,
    services_offered TEXT[], -- Array of services
    price_range VARCHAR(20),
    years_experience INTEGER,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Under Review', 'Approved', 'Rejected', 'More Info Required')),
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    admin_notes TEXT,
    approved_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT
);

-- Approved vendors table
CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    vendor_type VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    website VARCHAR(500),
    social_media JSONB,
    business_description TEXT,
    services_offered TEXT[],
    price_range VARCHAR(20),
    rating DECIMAL(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5.0),
    review_count INTEGER DEFAULT 0,
    portfolio_photos TEXT[],
    profile_image_url VARCHAR(500),
    featured BOOLEAN DEFAULT false,
    verified BOOLEAN DEFAULT false,
    approved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- WEDDING PLANNING TABLES
-- =====================================================

-- Weddings table
CREATE TABLE IF NOT EXISTS weddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    couple_id UUID REFERENCES users(id) ON DELETE CASCADE,
    wedding_name VARCHAR(255),
    partner_name VARCHAR(255),
    wedding_date DATE,
    venue_id UUID REFERENCES vendors(id),
    guest_count INTEGER DEFAULT 0,
    budget_total DECIMAL(12,2),
    currency VARCHAR(10) DEFAULT 'KES',
    status VARCHAR(50) DEFAULT 'Planning' CHECK (status IN ('Planning', 'Confirmed', 'In Progress', 'Completed', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Guest list table
CREATE TABLE IF NOT EXISTS guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    dietary_restrictions TEXT,
    plus_one_count INTEGER DEFAULT 0,
    rsvp_status VARCHAR(20) DEFAULT 'Pending' CHECK (rsvp_status IN ('Pending', 'Confirmed', 'Declined')),
    table_number INTEGER,
    special_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Budget items table
CREATE TABLE IF NOT EXISTS budget_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    estimated_cost DECIMAL(12,2),
    actual_cost DECIMAL(12,2),
    vendor_id UUID REFERENCES vendors(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Timeline/Itinerary items table
CREATE TABLE IF NOT EXISTS timeline_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
    day VARCHAR(50) NOT NULL,
    time TIME NOT NULL,
    place VARCHAR(255) NOT NULL,
    activity TEXT NOT NULL,
    vendor_id UUID REFERENCES vendors(id),
    notes TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- VENDOR REVIEW & RATINGS
-- =====================================================

-- Vendor reviews table
CREATE TABLE IF NOT EXISTS vendor_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    couple_id UUID REFERENCES users(id) ON DELETE SET NULL,
    wedding_id UUID REFERENCES weddings(id) ON DELETE SET NULL,
    rating DECIMAL(3,2) NOT NULL CHECK (rating >= 1 AND rating <= 5.0),
    review_text TEXT NOT NULL,
    review_date DATE,
    response_text TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified BOOLEAN DEFAULT false -- Verified by admin
);

-- Review reports (for flagging inappropriate reviews)
CREATE TABLE IF NOT EXISTS review_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID REFERENCES vendor_reviews(id) ON DELETE CASCADE,
    reported_by UUID REFERENCES users(id) ON DELETE SET NULL,
    reason VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Under Review', 'Resolved', 'Dismissed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by UUID REFERENCES users(id)
);

-- =====================================================
-- INSPIRATION & CONTENT
-- =====================================================

-- Inspiration posts table
CREATE TABLE IF NOT EXISTS inspiration_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    story TEXT NOT NULL,
    image_url VARCHAR(500),
    image_data_url VARCHAR(500), -- For base64 uploaded images
    tags TEXT[], -- Array of tags
    category VARCHAR(100),
    featured BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'Published' CHECK (status IN ('Draft', 'Published', 'Archived', 'Reported')),
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inspiration likes table
CREATE TABLE IF NOT EXISTS inspiration_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES inspiration_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, user_id) -- One like per user per post
);

-- =====================================================
-- MESSAGING & COMMUNICATION
-- =====================================================

-- Messages table (vendor-couple communication)
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(255),
    message_text TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'inquiry')),
    file_url VARCHAR(500), -- For file attachments
    is_read BOOLEAN DEFAULT false,
    is_archived BOOLEAN DEFAULT false,
    parent_message_id UUID REFERENCES messages(id), -- For threading
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Message read receipts
CREATE TABLE IF NOT EXISTS message_read_receipts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(message_id, user_id)
);

-- =====================================================
-- ADMIN & SYSTEM TABLES
-- =====================================================

-- Admin activity logs
CREATE TABLE IF NOT EXISTS admin_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(255) NOT NULL,
    table_name VARCHAR(255), -- Which table was modified
    record_id UUID, -- ID of the affected record
    old_values JSONB, -- Previous values
    new_values JSONB, -- New values
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System settings table
CREATE TABLE IF NOT EXISTS system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    is_public BOOLEAN DEFAULT false, -- Whether setting is exposed to frontend
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);

-- Vendor indexes
CREATE INDEX IF NOT EXISTS idx_vendors_type ON vendors(vendor_type);
CREATE INDEX IF NOT EXISTS idx_vendors_location ON vendors(location);
CREATE INDEX IF NOT EXISTS idx_vendors_rating ON vendors(rating DESC);
CREATE INDEX IF NOT EXISTS idx_vendors_featured ON vendors(featured DESC, approved_at DESC);

-- Wedding indexes
CREATE INDEX IF NOT EXISTS idx_weddings_couple ON weddings(couple_id);
CREATE INDEX IF NOT EXISTS idx_weddings_date ON weddings(wedding_date);
CREATE INDEX IF NOT EXISTS idx_weddings_status ON weddings(status);

-- Guest indexes
CREATE INDEX IF NOT EXISTS idx_guests_wedding ON guests(wedding_id);
CREATE INDEX IF NOT EXISTS idx_guests_rsvp ON guests(rsvp_status);

-- Inspiration indexes
CREATE INDEX IF NOT EXISTS idx_inspiration_author ON inspiration_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_inspiration_featured ON inspiration_posts(featured DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inspiration_status ON inspiration_posts(status);

-- Message indexes
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);

-- =====================================================
-- TRIGGERS FOR AUTOMATION
-- =====================================================

-- Update updated_at timestamp on user profile changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Update updated_at on vendor profile changes
CREATE TRIGGER update_vendors_updated_at
    BEFORE UPDATE ON vendors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Update updated_at on wedding changes
CREATE TRIGGER update_weddings_updated_at
    BEFORE UPDATE ON weddings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for vendor details with user info
CREATE OR REPLACE VIEW vendor_details AS
SELECT 
    v.*,
    u.first_name || ' ' || u.last_name as contact_person_name,
    u.email as user_email,
    u.phone as user_phone
FROM vendors v
JOIN users u ON v.user_id = u.id;

-- View for wedding statistics
CREATE OR REPLACE VIEW wedding_stats AS
SELECT 
    w.*,
    COUNT(g.id) as guest_count,
    COUNT(CASE WHEN g.rsvp_status = 'Confirmed' THEN 1 END) as confirmed_guests,
    SUM(bi.estimated_cost) as total_budget,
    SUM(bi.actual_cost) as actual_spent
FROM weddings w
LEFT JOIN guests g ON w.id = g.wedding_id
LEFT JOIN budget_items bi ON w.id = bi.wedding_id
GROUP BY w.id;

-- =====================================================
-- SAMPLE DATA INSERTIONS (for development)
-- =====================================================

-- Insert sample vendor categories
INSERT INTO system_settings (setting_key, setting_value, description, is_public) VALUES
('vendor_categories', '["Venues and Locations", "Planning and Coordination", "Decor and Styling", "Photography and Videography", "Beauty and Fashion", "Catering and Cake", "Entertainment and Music", "Transport and Logistics", "Stationery and Print", "Legal and Admin", "Event Planning Supplies", "Extras and Unique Experiences"]', 'Available vendor categories', true)
ON CONFLICT (setting_key) DO NOTHING;

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description, is_public) VALUES
('site_name', 'Amari Experience', 'Site name', true),
('site_description', 'Diani''s Premier Wedding Platform', 'Site description', true),
('contact_email', 'hello@amariexperience.com', 'Contact email', true),
('default_currency', 'KES', 'Default currency', true)
ON CONFLICT (setting_key) DO NOTHING;

-- =====================================================
-- CONSTRAINTS AND BUSINESS RULES
-- =====================================================

-- Business rules implemented via constraints:
-- 1. Email must be unique across users
-- 2. Rating must be between 1-5 for vendors
-- 3. RSVP status must be valid enum
-- 4. Wedding status must follow workflow
-- 5. One like per user per inspiration post
-- 6. Vendor applications must have required fields

-- Data integrity rules:
-- 1. Foreign key constraints ensure referential integrity
-- 2. UUID primary keys prevent ID collisions
-- 3. Check constraints ensure data validity
-- 4. Timestamps with timezone for consistency

-- =====================================================
-- PERFORMANCE CONSIDERATIONS
-- =====================================================

-- 1. Indexes on frequently queried columns
-- 2. Partitioning for large tables (inspiration_posts by date)
-- 3. Materialized views for complex reporting queries
-- 4. Connection pooling via application layer
-- 5. Read replicas for reporting queries

-- =====================================================
-- SECURITY CONSIDERATIONS
-- =====================================================

-- 1. All user inputs should be parameterized
-- 2. Row Level Security (RLS) for multi-tenant data
-- 3. Audit trails via admin_logs table
-- 4. Password hashing (handled at application layer)
-- 5. Input validation and sanitization
-- 6. Rate limiting on API endpoints
-- 7. HTTPS enforcement for all connections

-- =====================================================
-- MIGRATION NOTES
-- =====================================================

-- Version: 1.0.0
-- Created: 2026-01-16
-- Compatible with: PostgreSQL 14+
-- Neon Database: Fully supported

-- Migration strategy:
-- 1. Use transaction blocks for complex changes
-- 2. Backward compatible column additions
-- 3. Feature flags via system_settings table
-- 4. Blue-green deployments supported

-- =====================================================
-- USAGE EXAMPLES
-- =====================================================

-- Get all approved vendors with ratings above 4.0
-- SELECT * FROM vendor_details WHERE rating >= 4.0 AND featured = true;

-- Get wedding budget breakdown
-- SELECT category, SUM(estimated_cost) as budgeted, SUM(actual_cost) as spent 
-- FROM budget_items 
-- WHERE wedding_id = $1 
-- GROUP BY category;

-- Get popular inspiration posts
-- SELECT ip.*, COUNT(il.id) as like_count 
-- FROM inspiration_posts ip 
-- LEFT JOIN inspiration_likes il ON ip.id = il.post_id 
-- WHERE ip.status = 'Published' 
-- GROUP BY ip.id, ip.title, ip.created_at 
-- ORDER BY like_count DESC, ip.created_at DESC 
-- LIMIT 10;
