// User Roles and Permissions System
export type UserRole = 'admin' | 'staff' | 'customer' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  isActive: boolean;
}

// Role Definitions
export const ROLES = {
  ADMIN: 'admin' as const,
  STAFF: 'staff' as const,
  CUSTOMER: 'customer' as const,
  GUEST: 'guest' as const,
} as const;

// Role Descriptions
export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  admin: 'Administrator - Akses penuh ke sistem',
  staff: 'Staff - Mengelola pesanan dan inventori',
  customer: 'Customer - Pelanggan yang terdaftar',
  guest: 'Guest - Pengunjung tanpa akun',
};

// Role Permissions
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: [
    // Dashboard & Analytics
    'view_dashboard',
    'view_comprehensive_analytics',
    'view_revenue_analytics',
    'view_user_behavior_analytics',
    'export_reports_csv',
    'export_reports_pdf',
    
    // User Management
    'manage_users',
    'manage_staff',
    'view_all_users',
    'create_user',
    'update_user',
    'delete_user',
    'reset_user_password',
    'manage_user_roles',
    'activate_deactivate_user',
    
    // Product Management
    'manage_products',
    'create_product',
    'update_product',
    'delete_product',
    'manage_categories',
    'manage_stock',
    'bulk_update_products',
    'toggle_product_status',
    'toggle_featured_products',
    
    // Order Management
    'manage_orders',
    'view_all_orders',
    'update_order_status',
    'view_payment_status',
    'monitor_payment_gateway',
    'export_orders',
    'process_refunds',
    
    // Request Management
    'manage_product_requests',
    'approve_requests',
    'reject_requests',
    'view_all_requests',
    
    // Content Management
    'manage_testimonials',
    'approve_testimonials',
    'manage_faq',
    'manage_support_tickets',
    'assign_tickets_to_staff',
    
    // System Management
    'view_activity_log',
    'manage_settings',
    'manage_webhooks',
    'file_uploads_management',
  ],
  staff: [
    // Dashboard
    'view_dashboard',
    'view_daily_metrics',
    'view_support_tickets',
    
    // Order Management
    'manage_orders',
    'update_order_status',
    'track_shipment',
    'view_order_details',
    
    // Customer Management
    'view_customers',
    'view_customer_data',
    'view_customer_transactions',
    'send_customer_notifications',
    'send_promotions',
    
    // Inventory Management
    'manage_inventory',
    'update_stock',
    'monitor_stock_alerts',
    'view_inventory_reports',
    
    // Support
    'manage_support_tickets',
    'respond_to_tickets',
    'add_internal_notes',
    'view_faq',
    'create_tickets_for_customers',
    
    // Reporting
    'view_performance_metrics',
    'export_daily_reports',
    'export_weekly_reports',
    'view_customer_satisfaction',
  ],
  customer: [
    // Product Browsing
    'view_products',
    'view_product_details',
    'view_categories',
    'filter_products',
    'search_products',
    'view_trending_products',
    'view_recommendations',
    
    // Shopping
    'create_order',
    'manage_cart',
    'add_to_cart',
    'update_cart',
    'remove_from_cart',
    'checkout',
    
    // Order & Payment
    'view_own_orders',
    'track_orders',
    'view_payment_status',
    'download_invoice',
    'view_transaction_history',
    
    // Account
    'update_profile',
    'view_profile',
    'change_password',
    'manage_addresses',
    'view_notifications',
    'mark_notifications_read',
    
    // Reviews & Requests
    'submit_review',
    'submit_testimonial',
    'submit_product_request',
    'view_request_status',
    'view_own_reviews',
    
    // Support
    'create_support_ticket',
    'view_own_tickets',
    'chat_with_support',
    'view_faq',
    'search_faq',
    'mark_faq_helpful',
  ],
  guest: [
    // Product Browsing Only
    'view_products',
    'view_product_details',
    'view_categories',
    'filter_products',
    'search_products',
    'view_testimonials',
    'view_faq',
  ],
};

// Check if user has permission
export function hasPermission(role: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

// Check if user can access resource
export function canAccessResource(userRole: UserRole, requiredRoles: UserRole[]): boolean {
  return requiredRoles.includes(userRole);
}
