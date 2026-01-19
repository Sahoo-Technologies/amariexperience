// Neon Auth Integration
import { executeQuery } from './db';

// Neon Auth configuration
const NEON_AUTH_URL = process.env.VITE_NEON_AUTH_URL || 'https://ep-misty-bush-ah51gttt-pooler.c-3.us-east-1.aws.neon.tech';
const NEON_AUTH_TOKEN = process.env.VITE_NEON_AUTH_TOKEN || 'npg_COWH0y3qtwUa';

// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userType: 'couple' | 'vendor' | 'admin';
  profileImage?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  emailVerified: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userType: 'couple' | 'vendor';
}

// Neon Auth client
class NeonAuth {
  private baseUrl: string;
  private token: string;

  constructor() {
    this.baseUrl = NEON_AUTH_URL.replace('/neondb', '/auth');
    this.token = NEON_AUTH_TOKEN;
  }

  // Initialize Neon Auth
  async initialize() {
    try {
      // Check if auth tables exist, create if not
      await this.ensureAuthTables();
    } catch (error) {
      console.error('Neon Auth initialization error:', error);
    }
  }

  // Ensure auth tables exist
  private async ensureAuthTables() {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        user_type VARCHAR(20) NOT NULL DEFAULT 'couple',
        profile_image TEXT,
        email_verified BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        last_login TIMESTAMP WITH TIME ZONE,
        password_hash VARCHAR(255) NOT NULL
      );
    `;

    const createSessionsTable = `
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        token_hash VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        ip_address INET,
        user_agent TEXT
      );
    `;

    const createPasswordResetsTable = `
      CREATE TABLE IF NOT EXISTS password_resets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        token_hash VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        used BOOLEAN DEFAULT FALSE
      );
    `;

    await executeQuery(createUsersTable);
    await executeQuery(createSessionsTable);
    await executeQuery(createPasswordResetsTable);
  }

  // Password hashing using Web Crypto API
  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Password verification
  private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hash === hashedPassword;
  }

  // Generate secure token
  private generateToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
  }

  // Register new user
  async register(data: RegisterData): Promise<{ success: boolean; error?: string }> {
    try {
      const hashedPassword = await this.hashPassword(data.password);
      
      const result = await executeQuery(`
        INSERT INTO users (
          email, first_name, last_name, phone, user_type, 
          password_hash, email_verified, is_active
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8
        )
        RETURNING id, email, first_name, last_name, phone, user_type, 
                  email_verified, is_active, created_at
      `, [
        data.email,
        data.firstName,
        data.lastName,
        data.phone || null,
        data.userType,
        hashedPassword,
        false, // email_verified
        true   // is_active
      ]);

      if (result.length === 0) {
        return { success: false, error: 'Registration failed' };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.message?.includes('duplicate key')) {
        return { success: false, error: 'Email already exists' };
      }
      return { success: false, error: 'Registration failed' };
    }
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    try {
      // Get user from database
      const result = await executeQuery(`
        SELECT id, email, first_name, last_name, phone, user_type, 
               password_hash, email_verified, is_active, created_at
        FROM users 
        WHERE email = $1 AND is_active = true
      `, [credentials.email]);

      if (result.length === 0) {
        return { success: false, error: 'Invalid email or password' };
      }

      const user = result[0];
      const isValidPassword = await this.verifyPassword(credentials.password, user.password_hash);
      
      if (!isValidPassword) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Generate session token
      const token = this.generateToken();
      const tokenHash = await this.hashPassword(token);
      const expires = new Date(Date.now() + (24 * 60 * 60 * 1000)); // 24 hours

      // Store session in database
      await executeQuery(`
        INSERT INTO sessions (user_id, token_hash, expires_at)
        VALUES ($1, $2, $3)
      `, [user.id, tokenHash, expires.toISOString()]);

      // Update last login
      await executeQuery(`
        UPDATE users 
        SET last_login = NOW()
        WHERE id = $1
      `, [user.id]);

      // Store session in localStorage for quick access
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        userType: user.user_type,
        profileImage: user.profile_image,
        createdAt: user.created_at,
        lastLogin: user.last_login,
        isActive: user.is_active,
        emailVerified: user.email_verified
      }));

      return { 
        success: true, 
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          phone: user.phone,
          userType: user.user_type,
          profileImage: user.profile_image,
          createdAt: user.created_at,
          lastLogin: user.last_login,
          isActive: user.is_active,
          emailVerified: user.email_verified
        },
        token 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const tokenHash = await this.hashPassword(token);
        
        // Remove session from database
        await executeQuery('DELETE FROM sessions WHERE token_hash = $1', [tokenHash]);
      }
      
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem('currentUser');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  // Verify session
  async verifySession(): Promise<User | null> {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return null;
      }

      const tokenHash = await this.hashPassword(token);
      
      const result = await executeQuery(`
        SELECT s.user_id, s.expires_at, u.*
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.token_hash = $1 AND s.expires_at > NOW() AND u.is_active = true
      `, [tokenHash]);

      if (result.length === 0) {
        // Session expired or invalid
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        return null;
      }

      const user = result[0];
      return {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        userType: user.user_type,
        profileImage: user.profile_image,
        createdAt: user.created_at,
        lastLogin: user.last_login,
        isActive: user.is_active,
        emailVerified: user.email_verified
      };
    } catch (error) {
      console.error('Session verification error:', error);
      return null;
    }
  }

  // Update user profile
  async updateProfile(userId: string, updates: Partial<User>): Promise<{ success: boolean; error?: string }> {
    try {
      const setClause = Object.keys(updates)
        .map((key, index) => {
          const dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
          return `${dbKey} = $${index + 1}`;
        })
        .join(', ');

      const values = [...Object.values(updates), userId];
      
      await executeQuery(`
        UPDATE users 
        SET ${setClause}
        WHERE id = $${values.length}
      `, values);

      // Update localStorage
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        const updatedUser = { ...currentUser, ...updates };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }

      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  }

  // Change password
  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Get user from database
      const result = await executeQuery(`
        SELECT password_hash FROM users WHERE id = $1
      `, [userId]);

      if (result.length === 0) {
        return { success: false, error: 'User not found' };
      }

      const storedPassword = result[0].password_hash;
      
      const isValidCurrentPassword = await this.verifyPassword(currentPassword, storedPassword);
      if (!isValidCurrentPassword) {
        return { success: false, error: 'Current password is incorrect' };
      }

      if (newPassword.length < 8) {
        return { success: false, error: 'New password must be at least 8 characters long' };
      }

      const hashedNewPassword = await this.hashPassword(newPassword);
      
      // Update password in database
      await executeQuery(`
        UPDATE users 
        SET password_hash = $1
        WHERE id = $2
      `, [hashedNewPassword, userId]);

      // Invalidate all sessions for this user
      await executeQuery('DELETE FROM sessions WHERE user_id = $1', [userId]);

      return { success: true };
    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, error: 'Failed to change password' };
    }
  }

  // Initialize auth state
  async initializeAuth(): Promise<void> {
    try {
      await this.initialize();
      const user = await this.verifySession();
      if (!user) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    }
  }
}

// Export singleton instance
export const neonAuth = new NeonAuth();
export type { User, AuthState, LoginCredentials, RegisterData };
