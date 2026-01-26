import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { neonAuth, AuthState, User, LoginCredentials, RegisterData } from '../lib/neonAuth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER'; payload: { user: User; token?: string | null } }
  | { type: 'CLEAR_AUTH' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const neonAuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token ?? null,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_AUTH':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(neonAuthReducer, initialState);

  // Initialize auth on mount
  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      const user = await neonAuth.initializeAuth();
      if (!isMounted || !user) return;
      dispatch({
        type: 'SET_USER',
        payload: { user, token: null },
      });
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const result = await neonAuth.login(credentials);
      if (result.success && result.user) {
        dispatch({
          type: 'SET_USER',
          payload: { user: result.user, token: null },
        });
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.error || 'Login failed' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'An unexpected error occurred' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const register = async (data: RegisterData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const result = await neonAuth.register(data);
      if (result.success && result.user) {
        dispatch({
          type: 'SET_USER',
          payload: { user: result.user, token: null },
        });
      } else if (result.success) {
        const currentUser = neonAuth.getCurrentUser();
        if (currentUser) {
          dispatch({
            type: 'SET_USER',
            payload: { user: currentUser, token: null },
          });
        } else {
          dispatch({ type: 'SET_ERROR', payload: 'Registration successful but login failed' });
        }
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.error || 'Registration failed' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'An unexpected error occurred' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    neonAuth.logout();
    dispatch({ type: 'CLEAR_AUTH' });
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!state.user) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const result = await neonAuth.updateProfile(updates);
      if (result.success) {
        if (result.user) {
          dispatch({ type: 'SET_USER', payload: { user: result.user, token: null } });
        } else {
          dispatch({ type: 'UPDATE_USER', payload: updates });
        }
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.error || 'Profile update failed' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'An unexpected error occurred' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!state.user) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const result = await neonAuth.changePassword(currentPassword, newPassword);
      if (result.success) {
        // Password changed successfully
        dispatch({ type: 'SET_ERROR', payload: null });
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.error || 'Password change failed' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'An unexpected error occurred' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
