// Admin Dashboard Constants and Types

export type UserRole = 'staff' | 'customer' | 'guest';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  company?: string;
  joinDate: string;
  avatar?: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalCustomers: number;
  conversionRate: number;
  averageOrderValue: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  notes?: string;
}

export interface RequestQuotation {
  id: string;
  requestNumber: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  institution?: string;
  items: Array<{
    productName: string;
    quantity: number;
    specifications?: string;
  }>;
  priceTarget?: number;
  notes?: string;
  status: 'new' | 'reviewed' | 'quoted' | 'converted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface StaffAnalytics {
  title: string;
  value: number;
  change: number;
  icon: string;
}

// Mock Staff Data
export const STAFF_USERS: AdminUser[] = [
  {
    id: 'staff-1',
    name: 'Budi Santoso',
    email: 'budi@tihani.com',
    role: 'staff',
    phone: '081234567890',
    joinDate: '2023-01-15',
    company: 'CV. Tihani Mafaza',
  },
  {
    id: 'staff-2',
    name: 'Siti Nurhaliza',
    email: 'siti@tihani.com',
    role: 'staff',
    phone: '081234567891',
    joinDate: '2023-02-20',
    company: 'CV. Tihani Mafaza',
  },
];

// Mock Orders Data
export const MOCK_ORDERS: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'ORD-2024-001',
    customerId: 'cust-1',
    customerName: 'PT Maju Jaya',
    customerEmail: 'order@majujaya.com',
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        productName: 'Mesin Absen Digital Solution X-601',
        quantity: 2,
        pricePerUnit: 6270000,
        total: 12540000,
      },
      {
        id: 'item-2',
        productId: 'prod-2',
        productName: 'EPSON L3110',
        quantity: 1,
        pricePerUnit: 3179500,
        total: 3179500,
      },
    ],
    totalAmount: 15719500,
    status: 'processing',
    paymentStatus: 'paid',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
    notes: 'Urgent delivery needed',
  },
  {
    id: 'order-2',
    orderNumber: 'ORD-2024-002',
    customerId: 'cust-2',
    customerName: 'SMA Negeri 1 Bandung',
    customerEmail: 'procurement@sman1bnd.sch.id',
    items: [
      {
        id: 'item-3',
        productId: 'prod-3',
        productName: 'Kursi Kerja - Kursi Kantor High Quality',
        quantity: 50,
        pricePerUnit: 650000,
        total: 32500000,
      },
    ],
    totalAmount: 32500000,
    status: 'shipped',
    paymentStatus: 'paid',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15',
  },
  {
    id: 'order-3',
    orderNumber: 'ORD-2024-003',
    customerId: 'cust-3',
    customerName: 'PT Teknologi Indonesia',
    customerEmail: 'procurement@tekindo.com',
    items: [
      {
        id: 'item-4',
        productId: 'prod-4',
        productName: 'AC Split Wall 1 PK',
        quantity: 10,
        pricePerUnit: 6193000,
        total: 61930000,
      },
    ],
    totalAmount: 61930000,
    status: 'pending',
    paymentStatus: 'unpaid',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
  },
];

// Mock Quotation Requests
export const MOCK_QUOTATIONS: RequestQuotation[] = [
  {
    id: 'quote-1',
    requestNumber: 'REQ-2024-001',
    customerId: 'cust-4',
    customerName: 'Sekolah Dasar Maju Bersama',
    customerEmail: 'procurement@sdmajubersama.sch.id',
    customerPhone: '082234567890',
    institution: 'Sekolah Dasar',
    items: [
      {
        productName: 'Kursi Siswa Bahan Kayu',
        quantity: 100,
        specifications: 'Ukuran standar, kualitas A',
      },
      {
        productName: 'Meja Belajar',
        quantity: 100,
        specifications: 'Ukuran 60x40, kayu jati',
      },
    ],
    priceTarget: 50000000,
    notes: 'Dibutuhkan untuk renovasi kelas baru',
    status: 'reviewed',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-15',
  },
  {
    id: 'quote-2',
    requestNumber: 'REQ-2024-002',
    customerName: 'PT Konstruksi Maju',
    customerEmail: 'info@konstruksi-maju.com',
    customerPhone: '081234567890',
    items: [
      {
        productName: 'Material Bangunan - Semen',
        quantity: 500,
        specifications: 'Semen Portland 50kg',
      },
    ],
    notes: 'Proyek jangka panjang, mencari supplier tetap',
    status: 'new',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16',
  },
];

// Dashboard Stats for Staff
export const STAFF_DASHBOARD_STATS: StaffAnalytics[] = [
  {
    title: 'Total Pesanan',
    value: 1250,
    change: 12,
    icon: 'ShoppingCart',
  },
  {
    title: 'Pendapatan Bulan Ini',
    value: 125500000,
    change: 8,
    icon: 'TrendingUp',
  },
  {
    title: 'Pesanan Menunggu',
    value: 45,
    change: -5,
    icon: 'Clock',
  },
  {
    title: 'Total Pelanggan',
    value: 380,
    change: 15,
    icon: 'Users',
  },
];
