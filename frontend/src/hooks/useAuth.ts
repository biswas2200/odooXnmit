import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { User } from '@/types/auth';

export const useAuth = () => {
  const authContext = useAuth();
  return authContext;
};

// Hook for managing user profile
export const useProfile = () => {
  const { user, updateProfile } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUserProfile = useCallback(async (data: Partial<User>) => {
    try {
      setIsUpdating(true);
      setError(null);
      await updateProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, [updateProfile]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      setIsUpdating(true);
      setError(null);
      await authService.changePassword(currentPassword, newPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password');
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    try {
      setError(null);
      await authService.requestPasswordReset(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
      throw err;
    }
  }, []);

  const verifyEmail = useCallback(async (token: string) => {
    try {
      setError(null);
      await authService.verifyEmail(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify email');
      throw err;
    }
  }, []);

  return {
    user,
    isUpdating,
    error,
    updateUserProfile,
    changePassword,
    requestPasswordReset,
    verifyEmail,
    clearError: () => setError(null),
  };
};

// Hook for managing authentication state
export const useAuthState = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  return {
    isAuthenticated,
    isLoading,
    user,
    isLoggedIn: isAuthenticated && !!user,
    isGuest: !isAuthenticated && !isLoading,
  };
};

// Hook for managing login
export const useLogin = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await login({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  return {
    login: handleLogin,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};

// Hook for managing registration
export const useRegister = () => {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = useCallback(async (data: {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      await register(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [register]);

  return {
    register: handleRegister,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};

// Hook for managing logout
export const useLogout = () => {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await logout();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  return {
    logout: handleLogout,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};

// Hook for checking authentication status
export const useAuthCheck = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setHasChecked(true);
    }
  }, [isLoading]);

  return {
    isAuthenticated,
    isLoading,
    user,
    hasChecked,
    isReady: hasChecked && !isLoading,
  };
};
