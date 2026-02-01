// Identitas Perusahaan
export const COMPANY = {
  name: 'CV. Tihani Mafaza',
  tagline: 'Kepuasan Anda adalah Prestasi Kami',
  motto: 'A thousand miles journey begins with one small step',
  domain: 'cv-tihani-mafaza.com',
  location: 'Kab. Bandung',
  description: 'Penyedia barang & jasa profesional dengan harga transparan dan layanan 24 jam',
  businessType: 'Penyedia Barang dan Jasa',
  serviceArea: 'Seluruh Indonesia',
  operationalHours: '24 Jam',
  founded: '2008',
  experience: '15+ tahun',
  copyright: '© 2024 CV. Tihani Mafaza. All rights reserved.',
} as const;

// Design Colors - Oranye, Putih, Biru Tua
export const COLORS = {
  primary: '#0e2431', // Biru Tua
  primaryDark: '#0a1820',
  accent: '#ff4f00', // Oranye
  accentAlt: '#f77400', // Oranye Alt
  accentLight: '#ffb366',
  white: '#ffffff',
  grayLight: '#f3f4f6',
  gray: '#6b7280',
  grayDark: '#374151',
  border: '#e5e7eb',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
} as const;

// Kategori Produk
export const PRODUCT_CATEGORIES = [
  { id: 'elektronik', name: 'Elektronik', slug: 'elektronik', description: 'Peralatan elektronik berkualitas' },
  { id: 'buku', name: 'Buku & Referensi', slug: 'buku-teks', description: 'Buku teks & referensi pendidikan' },
  { id: 'furniture', name: 'Furniture & Mebel', slug: 'furniture', description: 'Perabotan dan meubelair' },
  { id: 'atk', name: 'Alat Tulis Kantor', slug: 'atk', description: 'Perlengkapan kantor' },
  { id: 'seragam', name: 'Seragam & Atribut', slug: 'seragam', description: 'Seragam dan atribut' },
  { id: 'jasa', name: 'Jasa & Service', slug: 'jasa', description: 'Layanan dan jasa profesional' },
  { id: 'medis', name: 'Alat & Bahan Medis', slug: 'medis', description: 'Alat dan bahan medis berkualitas' },
  { id: 'kebersihan', name: 'Kebersihan & Sanitasi', slug: 'kebersihan', description: 'Produk kebersihan & sanitasi' },
  { id: 'material', name: 'Material Bangunan', slug: 'material', description: 'Material konstruksi & bangunan' },
] as const;

// Statistik Perusahaan
export const STATISTICS = [
  { number: '100+', label: 'Perusahaan Partner', icon: '🏢' },
  { number: '300+', label: 'Kepala Sekolah & Pimpinan', icon: '👥' },
  { number: '25+', label: 'Tahun Pengalaman', icon: '⭐' },
] as const;

// Keunggulan Utama
export const USP = [
  {
    title: 'Harga Transparan',
    description: 'Semua harga sudah termasuk pajak (PPN, PPh, DPP) tanpa biaya tersembunyi',
    icon: '💰',
  },
  {
    title: 'Unlimited Request',
    description: 'Layanan pengadaan barang di luar katalog sesuai kebutuhan spesifik Anda',
    icon: '📝',
  },
  {
    title: '24 Jam Operasional',
    description: 'Tim siap melayani kapan saja untuk kebutuhan mendesak Anda',
    icon: '⏰',
  },
] as const;

// Produk Real dari Data yang Dikirim
export const PRODUCTS = [
  // ELEKTRONIK
  {
    id: 1,
    name: 'Mesin Absen Digital Solution X-601',
    category: 'elektronik',
    priceFinal: 6270000,
    dppValue: 5177927,
    sold: 1,
    stock: 15,
    image: 'https://via.placeholder.com/300x200?text=Mesin+Absen',
    specifications: {
      type: 'Mesin Absen Digital',
      availability: 'Tersedia',
      weight: '2.5 kg',
      dimension: '25 x 15 x 8 cm',
      warranty: '2 tahun',
      description: 'Mesin absen digital terpercaya untuk sistem manajemen kehadiran',
    },
  },
  {
    id: 2,
    name: 'EPSON L3110 Printer Multifungsi',
    category: 'elektronik',
    priceFinal: 3179500,
    dppValue: 2625712,
    sold: 1,
    stock: 8,
    image: 'https://via.placeholder.com/300x200?text=Printer+Epson',
    specifications: {
      type: 'Printer Multifungsi',
      availability: 'Tersedia',
      weight: '4.2 kg',
      dimension: '40 x 30 x 15 cm',
      warranty: '1 tahun',
      description: 'Printer multifungsi Epson dengan kualitas cetak profesional',
    },
  },
  {
    id: 3,
    name: 'Ashley Wireless Microphone Dual Channel',
    category: 'elektronik',
    priceFinal: 2590000,
    dppValue: 2138888,
    sold: 2,
    stock: 10,
    image: 'https://via.placeholder.com/300x200?text=Microphone',
    specifications: {
      type: 'Microphone Wireless',
      availability: 'Tersedia',
      weight: '0.5 kg',
      dimension: '15 x 10 x 5 cm',
      warranty: '1 tahun',
      description: 'Microphone wireless dual channel untuk acara dan presentasi',
    },
  },
  {
    id: 4,
    name: 'AC Split Wall 1 PK',
    category: 'elektronik',
    priceFinal: 6193000,
    dppValue: 5114339,
    sold: 4,
    stock: 6,
    image: 'https://via.placeholder.com/300x200?text=AC+Split',
    specifications: {
      type: 'AC Split Wall',
      availability: 'Tersedia',
      weight: '15 kg',
      dimension: '70 x 30 x 20 cm',
      warranty: '3 tahun',
      description: 'AC split wall 1 PK dengan teknologi hemat energi',
    },
  },
  {
    id: 5,
    name: 'Laptop Acer E5-474 Intel Core i5',
    category: 'elektronik',
    priceFinal: 10000000,
    dppValue: 8258258,
    sold: 1,
    stock: 3,
    image: 'https://via.placeholder.com/300x200?text=Laptop+Acer',
    specifications: {
      type: 'Laptop Office',
      availability: 'Tersedia',
      processor: 'Intel Core i5',
      ram: '8GB DDR4',
      storage: '256GB SSD',
      warranty: '1 tahun',
      description: 'Laptop office Acer dengan performa stabil untuk pekerjaan sehari-hari',
    },
  },

  // BUKU & REFERENSI
  {
    id: 6,
    name: 'KOMPETEN BERBAHASA INDONESIA SMA/MA KLS.10/KM',
    category: 'buku',
    priceFinal: 171000,
    dppValue: 0,
    sold: 120,
    stock: 50,
    image: 'https://via.placeholder.com/300x200?text=Buku+Bahasa',
    specifications: {
      type: 'Buku Pelajaran',
      availability: 'Tersedia',
      weight: '0.5 kg',
      dimension: '20 x 15 x 1 cm',
      warranty: 'N/A',
      description: 'Buku pelajaran bahasa Indonesia untuk SMA/MA kelas 10 kurikulum merdeka',
    },
  },
  {
    id: 7,
    name: 'IPA: BIOLOGI SMA/MA KLS.10/KM REVISI',
    category: 'buku',
    priceFinal: 166000,
    dppValue: 0,
    sold: 120,
    stock: 40,
    image: 'https://via.placeholder.com/300x200?text=Buku+IPA',
    specifications: {
      type: 'Buku Pelajaran',
      availability: 'Tersedia',
      weight: '0.6 kg',
      dimension: '20 x 15 x 1 cm',
      warranty: 'N/A',
      description: 'Buku IPA Biologi SMA/MA kelas 10 edisi revisi',
    },
  },
  {
    id: 8,
    name: 'Buku Inventaris Barang Sekolah',
    category: 'buku',
    priceFinal: 206916,
    dppValue: 170875,
    sold: 2,
    stock: 20,
    image: 'https://via.placeholder.com/300x200?text=Buku+Inventaris',
    specifications: {
      type: 'Buku Administrasi',
      availability: 'Tersedia',
      weight: '0.3 kg',
      dimension: '21 x 15 x 0.5 cm',
      warranty: 'N/A',
      description: 'Buku inventaris barang untuk manajemen aset sekolah',
    },
  },

  // FURNITURE & ATK
  {
    id: 9,
    name: 'Kursi Siswa Bahan Kayu',
    category: 'furniture',
    priceFinal: 450000,
    dppValue: 371621,
    sold: 20,
    stock: 30,
    image: 'https://via.placeholder.com/300x200?text=Kursi+Kayu',
    specifications: {
      type: 'Kursi Sekolah',
      availability: 'Tersedia',
      weight: '3 kg',
      dimension: '50 x 40 x 35 cm',
      warranty: '1 tahun',
      description: 'Kursi siswa berbahan kayu solid untuk sekolah',
    },
  },
  {
    id: 10,
    name: 'Whiteboard - Papan Tulis Kayu 240 x 120 cm',
    category: 'furniture',
    priceFinal: 1250000,
    dppValue: 1032282,
    sold: 25,
    stock: 15,
    image: 'https://via.placeholder.com/300x200?text=Whiteboard',
    specifications: {
      type: 'Papan Tulis',
      availability: 'Tersedia',
      weight: '8 kg',
      dimension: '240 x 120 x 2 cm',
      warranty: '2 tahun',
      description: 'Papan tulis whiteboard ukuran besar untuk ruang kelas',
    },
  },
  {
    id: 11,
    name: 'Kertas HVS F4 80 GSM',
    category: 'atk',
    priceFinal: 72000,
    dppValue: 59458,
    sold: 175,
    stock: 200,
    image: 'https://via.placeholder.com/300x200?text=Kertas+HVS',
    specifications: {
      type: 'Kertas Fotokopi',
      availability: 'Tersedia',
      weight: '2 kg',
      dimension: '21 x 33 cm',
      warranty: 'N/A',
      description: 'Kertas HVS F4 80 gram per rim (500 lembar)',
    },
  },
  {
    id: 12,
    name: 'Pulpen/Ballpoint Standard AE7',
    category: 'atk',
    priceFinal: 50000,
    dppValue: 41291,
    sold: 7,
    stock: 100,
    image: 'https://via.placeholder.com/300x200?text=Pulpen',
    specifications: {
      type: 'Pulpen Ballpoint',
      availability: 'Tersedia',
      weight: '0.02 kg',
      dimension: '15 x 1 cm',
      warranty: 'N/A',
      description: 'Pulpen ballpoint standar model AE7 per pack',
    },
  },

  // SERAGAM & ATRIBUT
  {
    id: 13,
    name: 'Jas Almamater',
    category: 'seragam',
    priceFinal: 167500,
    dppValue: 138325,
    sold: 0,
    stock: 20,
    image: 'https://via.placeholder.com/300x200?text=Jas+Almamater',
    specifications: {
      type: 'Seragam Almamater',
      availability: 'Tersedia',
      weight: '0.5 kg',
      dimension: 'S-M-L-XL',
      warranty: 'N/A',
      description: 'Jas almamater berkualitas untuk acara wisuda dan formal',
    },
  },
  {
    id: 14,
    name: 'Seragam Batik',
    category: 'seragam',
    priceFinal: 89500,
    dppValue: 73910,
    sold: 0,
    stock: 30,
    image: 'https://via.placeholder.com/300x200?text=Batik',
    specifications: {
      type: 'Seragam Batik',
      availability: 'Tersedia',
      weight: '0.3 kg',
      dimension: 'S-M-L-XL',
      warranty: 'N/A',
      description: 'Seragam batik tradisional dengan desain eksklusif',
    },
  },

  // MEDIS
  {
    id: 15,
    name: 'Onemed Spuit 5cc Disposable Syringe',
    category: 'medis',
    priceFinal: 1250,
    dppValue: 1032,
    sold: 400,
    stock: 500,
    image: 'https://via.placeholder.com/300x200?text=Spuit+Medis',
    specifications: {
      type: 'Spuit Suntik',
      availability: 'Tersedia',
      weight: '0.01 kg',
      dimension: '8 x 1 cm',
      warranty: 'N/A',
      description: 'Spuit disposable 5cc untuk keperluan medis',
    },
  },
  {
    id: 16,
    name: 'Stik Autocheck Gula Darah isi 25 pcs',
    category: 'medis',
    priceFinal: 80000,
    dppValue: 66066,
    sold: 12,
    stock: 50,
    image: 'https://via.placeholder.com/300x200?text=Stik+Gula',
    specifications: {
      type: 'Alat Tes Gula Darah',
      availability: 'Tersedia',
      weight: '0.1 kg',
      dimension: '10 x 5 x 3 cm',
      warranty: 'N/A',
      description: 'Stik autocheck untuk tes gula darah, isi 25 pcs',
    },
  },

  // KEBERSIHAN & SANITASI
  {
    id: 17,
    name: 'Disinfecktan Pembasmi Kuman',
    category: 'kebersihan',
    priceFinal: 92400,
    dppValue: 76305,
    sold: 4,
    stock: 30,
    image: 'https://via.placeholder.com/300x200?text=Disinfektan',
    specifications: {
      type: 'Cairan Desinfektan',
      availability: 'Tersedia',
      weight: '1 liter',
      dimension: '20 x 10 x 10 cm',
      warranty: 'N/A',
      description: 'Cairan disinfektan multi-fungsi pembersih dan pembasmi kuman',
    },
  },

  // MATERIAL BANGUNAN
  {
    id: 18,
    name: 'Besi 8"',
    category: 'material',
    priceFinal: 55000,
    dppValue: 45419,
    sold: 2,
    stock: 25,
    image: 'https://via.placeholder.com/300x200?text=Besi',
    specifications: {
      type: 'Besi Konstruksi',
      availability: 'Tersedia',
      weight: '2 kg',
      dimension: '8 inchi',
      warranty: 'N/A',
      description: 'Besi ukuran 8 inchi untuk konstruksi bangunan',
    },
  },
  {
    id: 19,
    name: 'Rel Pintu Dorong',
    category: 'material',
    priceFinal: 200000,
    dppValue: 165165,
    sold: 7,
    stock: 20,
    image: 'https://via.placeholder.com/300x200?text=Rel+Pintu',
    specifications: {
      type: 'Rel/Track Pintu',
      availability: 'Tersedia',
      weight: '3 kg',
      dimension: '200 cm',
      warranty: '1 tahun',
      description: 'Rel pintu dorong untuk sistem geser otomatis',
    },
  },

  // JASA & SERVICE
  {
    id: 20,
    name: 'Fotocopy Dokumen',
    category: 'jasa',
    priceFinal: 500,
    dppValue: 412,
    sold: 5000,
    stock: 0,
    image: 'https://via.placeholder.com/300x200?text=Fotocopy',
    specifications: {
      type: 'Jasa Fotokopi',
      availability: 'Tersedia (per lembar)',
      weight: 'N/A',
      dimension: 'Berbagai ukuran',
      warranty: 'N/A',
      description: 'Jasa fotokopi dokumen dengan hasil berkualitas tinggi',
    },
  },
] as const;

// Layanan Utama
export const SERVICES = [
  {
    id: 1,
    title: 'Layanan 24 Jam',
    description: 'Tim customer service siap melayani Anda 24 jam sehari',
    icon: '⏰',
  },
  {
    id: 2,
    title: 'Pengiriman Cepat',
    description: 'Pengiriman ke seluruh Indonesia dengan jaminan tepat waktu',
    icon: '🚚',
  },
  {
    id: 3,
    title: 'Harga Kompetitif',
    description: 'Harga terbaik dengan kualitas yang terjamin',
    icon: '💰',
  },
  {
    id: 4,
    title: 'Garansi Resmi',
    description: 'Semua produk dilengkapi dengan garansi resmi dari manufaktur',
    icon: '✅',
  },
  {
    id: 5,
    title: 'Konsultasi Gratis',
    description: 'Konsultasi gratis untuk memilih produk yang tepat',
    icon: '👥',
  },
  {
    id: 6,
    title: 'Layanan After Sales',
    description: 'Dukungan purna jual profesional untuk kepuasan Anda',
    icon: '🤝',
  },
] as const;

// Testimoni
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ibu Siti, S.Pd',
    role: 'Kepala Sekolah SDN Merdeka',
    message: 'Sangat puas dengan layanan Tihani Mafaza. Produk berkualitas, harga transparan, dan pengiriman tepat waktu!',
    rating: 5,
    company: 'SDN Merdeka Bandung',
  },
  {
    id: 2,
    name: 'Bapak Ahmad',
    role: 'Manager Operasional',
    message: 'Telah bekerja sama selama 5 tahun. Konsistensi kualitas dan layanan adalah alasan kami tetap menjadi pelanggan setia.',
    rating: 5,
    company: 'PT Maju Jaya',
  },
  {
    id: 3,
    name: 'Dr. Suharto',
    role: 'Direktur Klinik',
    message: 'Produk medis selalu tersedia dan stok terjamin. Pelayanan sangat responsif terhadap kebutuhan klinik kami.',
    rating: 5,
    company: 'Klinik Sehat Sejahtera',
  },
] as const;

// Partner
export const PARTNERS = [
  {
    id: 1,
    name: 'SDN Merdeka',
    category: 'Sekolah',
    logo: 'https://via.placeholder.com/200x100?text=SDN+Merdeka',
  },
  {
    id: 2,
    name: 'SMPN 1 Bandung',
    category: 'Sekolah',
    logo: 'https://via.placeholder.com/200x100?text=SMPN+1',
  },
  {
    id: 3,
    name: 'PT Maju Jaya',
    category: 'Perusahaan',
    logo: 'https://via.placeholder.com/200x100?text=PT+Maju',
  },
  {
    id: 4,
    name: 'Klinik Sehat Sejahtera',
    category: 'Kesehatan',
    logo: 'https://via.placeholder.com/200x100?text=Klinik',
  },
  {
    id: 5,
    name: 'Rumah Sakit Citra Medika',
    category: 'Kesehatan',
    logo: 'https://via.placeholder.com/200x100?text=RS+Citra',
  },
  {
    id: 6,
    name: 'SMA Negeri 2 Bandung',
    category: 'Sekolah',
    logo: 'https://via.placeholder.com/200x100?text=SMAN+2',
  },
] as const;

// Kontak
export const CONTACT = {
  phone: '+62 274-513-660',
  whatsapp: '+62 812-3456-7890',
  email: 'cs@tihani.com',
  address: 'Jl. Merdeka No. 123, Kab. Bandung, Jawa Barat',
  operationalHours: 'Senin - Minggu: 08:00 - 21:00 WIB',
  emergency: '+62 812-9999-8888',
} as const;

// Navigasi
export const NAVIGATION = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Tentang Kami',
    href: '#',
    submenu: [
      { label: 'Profil Perusahaan', href: '/about' },
      { label: 'Tim Kami', href: '/about#team' },
      { label: 'Jejak Langkah', href: '/about#history' },
    ],
  },
  { label: 'Produk & Layanan', href: '/products' },
  {
    label: 'Portofolio',
    href: '#',
    submenu: [
      { label: 'Galeri Proyek', href: '/portfolio' },
      { label: 'Testimoni Klien', href: '/#testimonials' },
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
