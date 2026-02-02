import { z } from 'zod';

// Product Validation Schemas
export const productCreateSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().optional(),
  sku: z.string().min(1, 'SKU is required').optional(),
  price: z.number().positive('Price must be positive'),
  discount_percentage: z.number().min(0).max(100).optional(),
  stock_quantity: z.number().int().nonnegative().optional(),
  category_id: z.number().int().positive('Category ID must be positive'),
  is_featured: z.boolean().optional().default(false),
  is_active: z.boolean().optional().default(true),
});

export const productUpdateSchema = productCreateSchema.partial();

export type ProductCreate = z.infer<typeof productCreateSchema>;
export type ProductUpdate = z.infer<typeof productUpdateSchema>;

// Category Validation Schemas
export const categoryCreateSchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  slug: z.string().optional(),
  description: z.string().optional(),
  image_url: z.string().url().optional(),
  parent_category_id: z.number().int().optional(),
  is_active: z.boolean().optional().default(true),
});

export const categoryUpdateSchema = categoryCreateSchema.partial();

export type CategoryCreate = z.infer<typeof categoryCreateSchema>;
export type CategoryUpdate = z.infer<typeof categoryUpdateSchema>;

// Order Validation Schemas
export const orderCreateSchema = z.object({
  user_id: z.number().int().positive().optional(),
  guest_email: z.string().email().optional(),
  shipping_address_id: z.number().int().positive().optional(),
  shipping_method: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      product_id: z.number().int().positive(),
      quantity: z.number().int().positive(),
    })
  ),
});

export type OrderCreate = z.infer<typeof orderCreateSchema>;

// User Address Validation Schema
export const userAddressCreateSchema = z.object({
  full_name: z.string().min(2),
  phone_number: z.string().min(10),
  street_address: z.string().min(5),
  city: z.string().min(2),
  province: z.string().min(2),
  postal_code: z.string().min(4),
  is_default: z.boolean().optional(),
});

export type UserAddressCreate = z.infer<typeof userAddressCreateSchema>;

// Query Filters
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export const productFilterSchema = z.object({
  category_id: z.coerce.number().int().optional(),
  is_featured: z.coerce.boolean().optional(),
  is_active: z.coerce.boolean().default(true),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'price', 'created_at', 'rating']).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationParams = z.infer<typeof paginationSchema>;
export type ProductFilters = z.infer<typeof productFilterSchema>;

// Auth Validation Schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[0-9]/, 'Password must contain number'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type Register = z.infer<typeof registerSchema>;
export type Login = z.infer<typeof loginSchema>;

// Support Ticket Validation
export const supportTicketSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(255),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
  category: z.string().optional(),
  order_id: z.number().int().optional(),
});

export type SupportTicket = z.infer<typeof supportTicketSchema>;

// Review Validation
export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().min(5).max(255),
  review_text: z.string().min(20),
});

export type Review = z.infer<typeof reviewSchema>;

// FAQ Feedback Validation
export const faqFeedbackSchema = z.object({
  faq_id: z.number().int().positive(),
  is_helpful: z.boolean(),
  session_id: z.string().optional(),
});

export type FAQFeedback = z.infer<typeof faqFeedbackSchema>;

// Notification Validation
export const notificationSchema = z.object({
  user_id: z.number().int().positive(),
  type: z.string().max(50),
  title: z.string().max(255),
  message: z.string(),
  data: z.record(z.any()).optional(),
});

export type Notification = z.infer<typeof notificationSchema>;

// Settings Validation
export const settingsSchema = z.record(z.string(), z.any());

export type Settings = z.infer<typeof settingsSchema>;
