// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// App Configuration
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'ECoFinds';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGES_PER_PRODUCT = 10;

// Product Categories
export const PRODUCT_CATEGORIES = [
  'clothing',
  'shoes',
  'accessories',
  'bags',
  'jewelry',
  'home',
  'electronics',
  'books',
  'other'
] as const;

// Product Conditions
export const PRODUCT_CONDITIONS = [
  'new',
  'like-new',
  'good',
  'fair',
  'poor'
] as const;

// Sustainability Badges
export const SUSTAINABILITY_BADGES = [
  'organic',
  'recycled',
  'fair-trade',
  'vegan',
  'carbon-neutral',
  'local',
  'handmade'
] as const;

// Order Statuses
export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded'
] as const;

// Sustainability Levels
export const SUSTAINABILITY_LEVELS = [
  'beginner',
  'eco-conscious',
  'sustainable',
  'environmentalist',
  'eco-champion'
] as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  SUSTAINABILITY: '/sustainability',
  ORDERS: '/orders',
  LISTINGS: '/listings',
  SELL: '/sell',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'ecofinds_auth_token',
  REFRESH_TOKEN: 'ecofinds_refresh_token',
  USER_DATA: 'ecofinds_user_data',
  CART_DATA: 'ecofinds_cart_data',
  THEME: 'ecofinds_theme',
  LANGUAGE: 'ecofinds_language',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_ALREADY_EXISTS: 'An account with this email already exists.',
  PASSWORD_TOO_WEAK: 'Password must be at least 8 characters long.',
  FILE_TOO_LARGE: 'File size must be less than 5MB.',
  INVALID_FILE_TYPE: 'Please upload a valid image file.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back!',
  REGISTER_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PRODUCT_CREATED: 'Product listed successfully!',
  PRODUCT_UPDATED: 'Product updated successfully.',
  PRODUCT_DELETED: 'Product deleted successfully.',
  ADDED_TO_CART: 'Item added to cart!',
  REMOVED_FROM_CART: 'Item removed from cart.',
  ORDER_PLACED: 'Order placed successfully!',
  PAYMENT_SUCCESS: 'Payment processed successfully!',
} as const;
