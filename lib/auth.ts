// Authentication and User Management System
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

// Session management
let sessions: { [key: string]: { userId: string; expires: number } } = {};

// Password hashing (simple implementation - use bcrypt in production)
const hashPassword = async (password: string): Promise<string> => {
  // In production, use bcrypt: await bcrypt.hash(password, 10)
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const hashedInput = await hashPassword(password);
  return hashedInput === hashedPassword;
};

// Generate secure token
const generateToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Authentication functions
export const auth = {
  // Register new user
  async register(data: RegisterData): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      // Check if user already exists
      const existingUser = users.find(u => u.email === data.email);
      if (existingUser) {
        return { success: false, error: 'User with this email already exists' };
      }

      // Validate input
      if (!data.email || !data.password || !data.firstName || !data.lastName) {
        return { success: false, error: 'All required fields must be filled' };
      }

      if (data.password.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters long' };
      }

      // Create new user
      const hashedPassword = await hashPassword(data.password);
      const newUser: User = {
        id: generateToken(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        userType: data.userType,
        createdAt: new Date().toISOString(),
        isActive: true,
        emailVerified: false
      };

      users.push(newUser);
      
      // Store password separately (in production, this would be in the database)
      const userPasswords: { [key: string]: string } = {};
      userPasswords[newUser.id] = hashedPassword;
      localStorage.setItem('userPasswords', JSON.stringify(userPasswords));

      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  },

  // Login user
  async login(credentials: LoginCredentials): Promise<{ success: boolean; error?: string; user?: User; token?: string }> {
    try {
      // Find user
      const user = users.find(u => u.email === credentials.email);
      if (!user) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Get stored password
      const userPasswords = JSON.parse(localStorage.getItem('userPasswords') || '{}');
      const storedPassword = userPasswords[user.id];
      
      if (!storedPassword) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Verify password
      const isValidPassword = await verifyPassword(credentials.password, storedPassword);
      if (!isValidPassword) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Check if user is active
      if (!user.isActive) {
        return { success: false, error: 'Account has been deactivated' };
      }

      // Generate session token
      const token = generateToken();
      const expires = Date.now() + (7 * 24 * 60 * 60 * 1000); // 7 days
      
      sessions[token] = { userId: user.id, expires };
      localStorage.setItem('sessions', JSON.stringify(sessions));

      // Update last login
      user.lastLogin = new Date().toISOString();
      localStorage.setItem('users', JSON.stringify(users));

      return { success: true, user, token };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  },

  // Logout user
  logout(): void {
    const currentToken = localStorage.getItem('authToken');
    if (currentToken && sessions[currentToken]) {
      delete sessions[currentToken];
      localStorage.setItem('sessions', JSON.stringify(sessions));
    }
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  },

  // Get current user
  getCurrentUser(): User | null {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    const session = sessions[token];
    if (!session || session.expires < Date.now()) {
      this.logout();
      return null;
    }

    const user = users.find(u => u.id === session.userId);
    return user || null;
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },

  // Update user profile
  async updateProfile(userId: string, updates: Partial<User>): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return { success: false, error: 'User not found' };
      }

      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('users', JSON.stringify(users));

      return { success: true, user: users[userIndex] };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  },

  // Change password
  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      const userPasswords = JSON.parse(localStorage.getItem('userPasswords') || '{}');
      const storedPassword = userPasswords[userId];
      
      const isValidCurrentPassword = await verifyPassword(currentPassword, storedPassword);
      if (!isValidCurrentPassword) {
        return { success: false, error: 'Current password is incorrect' };
      }

      if (newPassword.length < 8) {
        return { success: false, error: 'New password must be at least 8 characters long' };
      }

      const hashedNewPassword = await hashPassword(newPassword);
      userPasswords[userId] = hashedNewPassword;
      localStorage.setItem('userPasswords', JSON.stringify(userPasswords));

      return { success: true };
    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, error: 'Failed to change password' };
    }
  },

  // Initialize auth state from localStorage
  initializeAuth(): void {
    const token = localStorage.getItem('authToken');
    const usersData = localStorage.getItem('users');
    const sessionsData = localStorage.getItem('sessions');
    
    if (usersData) {
      users = JSON.parse(usersData);
    }
    
    if (sessionsData) {
      sessions = JSON.parse(sessionsData);
    }

    if (token && sessions[token] && sessions[token].expires > Date.now()) {
      // Valid session exists
      const user = users.find(u => u.id === sessions[token].userId);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    } else {
      // Invalid or expired session
      this.logout();
    }
  }
};

// Export for use in components
export default auth;
