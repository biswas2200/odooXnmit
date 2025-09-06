import { z } from 'zod';

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Product validation schemas
export const productSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  price: z.number()
    .min(0.01, 'Price must be greater than 0')
    .max(10000, 'Price must be less than $10,000'),
  originalPrice: z.number().optional(),
  category: z.enum(['clothing', 'shoes', 'accessories', 'bags', 'jewelry', 'home', 'electronics', 'books', 'other']),
  subcategory: z.string().optional(),
  brand: z.string().optional(),
  size: z.string().min(1, 'Size is required'),
  color: z.string().min(1, 'Color is required'),
  condition: z.enum(['new', 'like-new', 'good', 'fair', 'poor']),
  material: z.array(z.string()).min(1, 'At least one material is required'),
  tags: z.array(z.string()).optional(),
  location: z.object({
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    country: z.string().min(1, 'Country is required'),
  }),
});

// Profile validation schema
export const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
});

// Address validation schema
export const addressSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
  phone: z.string().optional(),
});

// Payment method validation schema
export const paymentMethodSchema = z.object({
  type: z.enum(['card', 'paypal', 'apple_pay', 'google_pay']),
  card: z.object({
    number: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
    expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, 'Invalid expiry month'),
    expiryYear: z.string().regex(/^\d{4}$/, 'Invalid expiry year'),
    cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
    name: z.string().min(1, 'Cardholder name is required'),
  }).optional(),
  paypalEmail: z.string().email().optional(),
});

// Search validation schema
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  category: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  condition: z.array(z.string()).optional(),
  size: z.array(z.string()).optional(),
  color: z.array(z.string()).optional(),
  location: z.string().optional(),
});

// Review validation schema
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters').max(500, 'Review must be less than 500 characters'),
});

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Newsletter validation schema
export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// File validation
export const fileValidation = {
  image: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxFiles: 10,
  },
  document: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    maxFiles: 5,
  },
};

// Validation helper functions
export function validateFile(file: File, type: 'image' | 'document' = 'image'): { isValid: boolean; error?: string } {
  const config = fileValidation[type];
  
  if (file.size > config.maxSize) {
    return { isValid: false, error: `File size must be less than ${config.maxSize / (1024 * 1024)}MB` };
  }
  
  if (!config.allowedTypes.includes(file.type)) {
    return { isValid: false, error: `File type must be one of: ${config.allowedTypes.join(', ')}` };
  }
  
  return { isValid: true };
}

export function validateFiles(files: File[], type: 'image' | 'document' = 'image'): { isValid: boolean; error?: string } {
  const config = fileValidation[type];
  
  if (files.length > config.maxFiles) {
    return { isValid: false, error: `Maximum ${config.maxFiles} files allowed` };
  }
  
  for (const file of files) {
    const validation = validateFile(file, type);
    if (!validation.isValid) {
      return validation;
    }
  }
  
  return { isValid: true };
}
