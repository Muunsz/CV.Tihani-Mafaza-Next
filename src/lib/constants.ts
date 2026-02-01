// Identitas Perusahaan
export const COMPANY = {
  name: 'CV. Tihani Mafaza',
  tagline: 'Kepuasan Anda adalah Prestasi Kami',
  motto: 'A thousand miles journey begins with one small step',
  domain: 'cv.tihanimafaza.com',
  description: 'Penyedia barang & jasa profesional dengan harga transparan dan layanan 24 jam',
} as const;

/**
 * ReCAPTCHA Configuration
 * 
 * IMPORTANT: Do NOT import RECAPTCHA_SITE_KEY directly in client components.
 * Use the API endpoint instead:
 * 
 * // In client component:
 * const response = await fetch('/api/captcha/config');
 * const { siteKey } = await response.json();
 * 
 * Or use a server component to fetch and pass as prop:
 * 
 * // In server component:
 * import { getRecaptchaSiteKey } from '@/lib/recaptcha-config';
 * const siteKey = getRecaptchaSiteKey();
 * // Then pass to client component via props
 */

// This constant is exported for server components only
// Client components should use the /api/captcha/config endpoint
export const RECAPTCHA_SITE_KEY_DEFAULT = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

// Design Colors
export const COLORS = {
  primary: '#0e2431', // Biru Tua
  primaryDark: '#0a1820',
  accent: '#ff4f00', // Oranye
  accentAlt: '#f77400', // Oranye Alt
  white: '#ffffff',
  grayLight: '#f3f4f6',
  gray: '#6b7280',
  border: '#e5e7eb',
} as const;

// Kategori Produk
export const PRODUCT_CATEGORIES = [
  { id: 'elektronik', name: 'Elektronik', icon: '⚡' },
  { id: 'buku', name: 'Buku & Referensi', icon: '📚' },
  { id: 'furniture', name: 'Furniture & ATK', icon: '🪑' },
  { id: 'medis', name: 'Alat Medis', icon: '⚕️' },
  { id: 'kebersihan', name: 'Kebersihan & Sanitasi', icon: '🧼' },
  { id: 'material', name: 'Material Bangunan', icon: '🏗️' },
  { id: 'jasa', name: 'Jasa & Service', icon: '🔧' },
] as const;

// Statistik Perusahaan
export const STATISTICS = [
  { number: '100+', label: 'Perusahaan Partner' },
  { number: '300+', label: 'Kepala Sekolah & Pimpinan' },
  { number: '25+', label: 'Acara & Event' },
] as const;

// Keunggulan Utama
export const USP = [
  {
    title: 'Transparansi Pajak',
    description: 'Harga tayang sudah termasuk PPN & PPh, dengan rincian DPP ditampilkan jelas.',
    icon: '💰',
  },
  {
    title: 'Unlimited Request',
    description: 'Layanan pengadaan barang di luar katalog sesuai kebutuhan spesifik Anda.',
    icon: '📝',
  },
  {
    title: '24 Jam Operasional',
    description: 'Tim siap melayani kapan saja, siang atau malam, untuk kebutuhan mendesak.',
    icon: '⏰',
  },
] as const;

// Data Produk
export const PRODUCTS = [
  {
    id: 1,
    name: 'Mesin Absen Digital Solution X-601',
    category: 'elektronik',
    priceFinal: 6270000,
    dppValue: 5177927,
    stock: 5,
    image: 'https://via.placeholder.com/300x200?text=Mesin+Absen',
    specifications: {
      weight: '2.5 kg',
      dimension: '25 x 15 x 8 cm',
      warranty: '2 tahun',
    },
  },
  {
    id: 2,
    name: 'Epson L3110 Printer Multifungsi',
    category: 'elektronik',
    priceFinal: 3179500,
    dppValue: 2625712,
    stock: 8,
    image: 'https://via.placeholder.com/300x200?text=Printer+Epson',
    specifications: {
      weight: '4.2 kg',
      dimension: '40 x 30 x 15 cm',
      warranty: '1 tahun',
    },
  },
  {
    id: 3,
    name: 'Laptop Acer E5-474 Core i5',
    category: 'elektronik',
    priceFinal: 10000000,
    dppValue: 8258258,
    stock: 3,
    image: 'https://via.placeholder.com/300x200?text=Laptop+Acer',
    specifications: {
      processor: 'Intel Core i5',
      ram: '8GB DDR4',
      storage: '256GB SSD',
      warranty: '3 tahun',
    },
  },
  {
    id: 4,
    name: 'Tandu Darurat Medis',
    category: 'medis',
    priceFinal: 1976400,
    dppValue: 1632161,
    stock: 10,
    image: 'https://via.placeholder.com/300x200?text=Tandu+Darurat',
    specifications: {
      material: 'Aluminium & Kain',
      weight: '8 kg',
      capacity: '150 kg',
    },
  },
  {
    id: 5,
    name: 'Reagen Golongan Darah Set',
    category: 'medis',
    priceFinal: 385000,
    dppValue: 317942,
    stock: 25,
    image: 'https://via.placeholder.com/300x200?text=Reagen+Darah',
    specifications: {
      quantity: '50 sets',
      expiry: '2 tahun',
      storage: 'Suhu 2-8°C',
    },
  },
  {
    id: 6,
    name: 'Pasir Beton Berkualitas',
    category: 'material',
    priceFinal: 215000,
    dppValue: 177551,
    stock: 100,
    image: 'https://via.placeholder.com/300x200?text=Pasir+Beton',
    specifications: {
      weight: '25 kg/sak',
      origin: 'Lokal',
      quality: 'Grade A',
    },
  },
  {
    id: 7,
    name: 'Semen Portland 40 kg',
    category: 'material',
    priceFinal: 74000,
    dppValue: 61110,
    stock: 150,
    image: 'https://via.placeholder.com/300x200?text=Semen',
    specifications: {
      weight: '40 kg',
      standard: 'SNI',
      expiry: '6 bulan dari pembelian',
    },
  },
  {
    id: 8,
    name: 'Kursi Siswa Kayu Berkualitas',
    category: 'furniture',
    priceFinal: 450000,
    dppValue: 371621,
    stock: 50,
    image: 'https://via.placeholder.com/300x200?text=Kursi+Siswa',
    specifications: {
      material: 'Kayu Jati',
      height: '35-40 cm (adjustable)',
      weight_capacity: '100 kg',
    },
  },
  {
    id: 9,
    name: 'Kertas HVS F4 80 GSM Pack',
    category: 'furniture',
    priceFinal: 72000,
    dppValue: 59458,
    stock: 200,
    image: 'https://via.placeholder.com/300x200?text=Kertas+HVS',
    specifications: {
      quantity: '500 lembar',
      size: 'F4',
      gsm: '80 GSM',
    },
  },
  {
    id: 10,
    name: 'Perbaikan Hardware Laptop',
    category: 'jasa',
    priceFinal: 500000,
    dppValue: 412912,
    stock: 999, // Unlimited service
    image: 'https://via.placeholder.com/300x200?text=Service+Laptop',
    specifications: {
      duration: '1-3 hari kerja',
      warranty: '2 minggu',
      location: 'Bandung',
    },
  },
  {
    id: 11,
    name: 'Sewa Minibus 7 Kursi',
    category: 'jasa',
    priceFinal: 1500000,
    dppValue: 0,
    stock: 999, // Unlimited service
    image: 'https://via.placeholder.com/300x200?text=Sewa+Minibus',
    specifications: {
      capacity: '7 penumpang',
      driver: 'Tersedia',
      duration: 'Per hari',
    },
  },
] as const;

// Data Partner/Klien
export const PARTNERS = [
  { name: 'SMK Telkom Bandung', logo: '🏫' },
  { name: 'SMK Angkasa 2 Bandung', logo: '🏫' },
  { name: 'SMK Bina Insani Ibun', logo: '🏫' },
  { name: 'SD Sedunia', logo: '🏫' },
  { name: 'Kober Mawar', logo: '🏫' },
  { name: 'PT. Maju Jaya Investama', logo: '🏢' },
  { name: 'Pemerintah Bandung', logo: '🏛️' },
  { name: 'RSUD Setiabudhi', logo: '🏥' },
] as const;

// Data Testimoni
export const TESTIMONIALS = [
  {
    id: 1,
    author: 'SMK Bina Insani Ibun',
    role: 'Kepala Sekolah',
    content: 'Barang diterima dalam kondisi baik, tidak rusak. Pelayanan sangat cepat dan profesional. Akan menjadi supplier tetap kami.',
    rating: 5,
  },
  {
    id: 2,
    author: 'SMK Persis 02 Bandung',
    role: 'Wakil Kepala Sarana',
    content: 'Recomended! Harga kompetitif dan transparansi yang bagus. Tim Tihani Mafaza sangat responsif terhadap kebutuhan kami.',
    rating: 5,
  },
  {
    id: 3,
    author: 'Kober Mawar',
    role: 'Kepala Yayasan',
    content: 'Sangat baik dan amanah. Mereka memahami kebutuhan lembaga kami dan selalu memberikan solusi terbaik.',
    rating: 5,
  },
  {
    id: 4,
    author: 'PT. Maju Jaya Investama',
    role: 'Direktur Operasional',
    content: 'Kerjasama yang excellent dengan Tihani Mafaza. Konsisten dalam kualitas dan tepat waktu.',
    rating: 5,
  },
] as const;

// Kontak
export const CONTACT = {
  phone: '+62-274-123-456',
  whatsapp: '+62-812-345-6789',
  email: 'info@tihanimafaza.com',
  address: 'Jl. Pendidikan No. 42, Bandung, Jawa Barat 40154',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7178594906846!2d107.6095!3d-6.9023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTihani%20Mafaza!5e0!3m2!1sid!2sid',
} as const;

// Navigation Menu
export const NAVIGATION = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Tentang Kami',
    href: '#',
    submenu: [
      { label: 'Profil Perusahaan', href: '/about' },
      { label: 'Tim Kami', href: '/team' },
      { label: 'Jejak Langkah', href: '/history' },
    ],
  },
  { label: 'Produk & Layanan', href: '/products' },
  {
    label: 'Portofolio',
    href: '#',
    submenu: [
      { label: 'Galeri Proyek', href: '/portfolio' },
      { label: 'Testimoni Klien', href: '/testimonials' },
    ],
  },
  {
    label: 'Pusat Informasi',
    href: '#',
    submenu: [
      { label: 'Artikel & Blog', href: '/blog' },
      { label: 'Karir', href: '/careers' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  { label: 'Kontak', href: '/contact' },
] as const;

// Re-export MOCK_ORDERS from admin-constants for backward compatibility
export { MOCK_ORDERS } from '@/lib/admin-constants';
