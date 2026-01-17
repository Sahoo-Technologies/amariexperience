// Authentication and User Management System with Neon Database Integration
import { executeQuery } from './db';

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

// Password hashing (simple implementation - use bcrypt in production)
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Password verification
const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hash === hashedPassword;
};

// Generate session token
const generateToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
};

// Authentication functions
const auth = {
  // Register new user
  async register(data: RegisterData): Promise<{ success: boolean; error?: string }> {
    try {
      const userId = Date.now().toString();
      const hashedPassword = await hashPassword(data.password);
      
      // Insert user into database
      await executeQuery(`
        INSERT INTO users (
          id, email, first_name, last_name, phone, user_type, 
          password_hash, email_verified, is_active, created_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9
        )
      `, [
        userId,
        data.email,
        data.firstName,
        data.lastName,
        data.phone || null,
        data.userType,
        hashedPassword,
        true,
        true,
        new Date().toISOString()
      ]);

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  },

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
      const isValidPassword = await verifyPassword(credentials.password, user.password_hash);
      
      if (!isValidPassword) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Generate session token
      const token = generateToken();
      const expires = Date.now() + (24 * 60 * 60 * 1000); // 24 hours

      // Store session in database
      await executeQuery(`
        INSERT INTO sessions (id, user_id, expires_at, created_at)
        VALUES ($1, $2, $3, $4)
      `, [token, user.id, new Date(expires).toISOString(), new Date().toISOString()]);

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
        lastLogin: new Date().toISOString(),
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
          lastLogin: new Date().toISOString(),
          isActive: user.is_active,
          emailVerified: user.email_verified
        },
        token 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        // Remove session from database
        await executeQuery('DELETE FROM sessions WHERE id = $1', [token]);
      }
      
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Get current user
  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem('currentUser');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

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
      const currentUser = auth.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        const updatedUser = { ...currentUser, ...updates };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }

      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  },

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
      
      const isValidCurrentPassword = await verifyPassword(currentPassword, storedPassword);
      if (!isValidCurrentPassword) {
        return { success: false, error: 'Current password is incorrect' };
      }

      if (newPassword.length < 8) {
        return { success: false, error: 'New password must be at least 8 characters long' };
      }

      const hashedNewPassword = await hashPassword(newPassword);
      
      // Update password in database
      await executeQuery(`
        UPDATE users 
        SET password_hash = $1
        WHERE id = $2
      `, [hashedNewPassword, userId]);

      return { success: true };
    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, error: 'Failed to change password' };
    }
  },

  // Initialize auth state from localStorage
  async initializeAuth(): Promise<void> {
    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('currentUser');
      
      if (token && userData) {
        // Verify session is still valid
        const result = await executeQuery(`
          SELECT expires_at FROM sessions 
          WHERE id = $1 AND expires_at > NOW()
        `, [token]);

        if (result.length === 0) {
          // Session expired, clear auth
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentUser');
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    }
  }
};

export { auth, User, AuthState, LoginCredentials, RegisterData };
