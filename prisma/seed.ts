import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create roles
  const adminRole = await prisma.roles.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'Administrator with full access'
    },
  });

  const staffRole = await prisma.roles.upsert({
    where: { name: 'staff' },
    update: {},
    create: {
      name: 'staff',
      description: 'Staff with limited admin access'
    },
  });

  const customerRole = await prisma.roles.upsert({
    where: { name: 'customer' },
    update: {},
    create: {
      name: 'customer',
      description: 'Regular customer'
    },
  });

  const guestRole = await prisma.roles.upsert({
    where: { name: 'guest' },
    update: {},
    create: {
      name: 'guest',
      description: 'Guest user'
    },
  });

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.users.upsert({
    where: { email: 'admin@tihanimafaza.com' },
    update: {},
    create: {
      email: 'admin@tihanimafaza.com',
      password_hash: hashedPassword,
      full_name: 'Administrator',
      role_id: adminRole.id,
      is_active: true,
      email_verified: true,
    },
  });

  // Create categories
  const elektronikCategory = await prisma.categories.upsert({
    where: { name: 'Elektronik' },
    update: {},
    create: {
      name: 'Elektronik',
      slug: 'elektronik',
      description: 'Produk elektronik dan gadget',
      is_active: true,
    },
  });

  const medisCategory = await prisma.categories.upsert({
    where: { name: 'Alat Medis' },
    update: {},
    create: {
      name: 'Alat Medis',
      slug: 'alat-medis',
      description: 'Peralatan medis dan kesehatan',
      is_active: true,
    },
  });

  // Create products
  const product1 = await prisma.products.upsert({
    where: { slug: 'mesin-absen-digital-solution-x-601' },
    update: {},
    create: {
      name: 'Mesin Absen Digital Solution X-601',
      slug: 'mesin-absen-digital-solution-x-601',
      description: 'Mesin absen digital dengan teknologi fingerprint dan RFID',
      price: 6270000,
      discount_percentage: 0,
      stock_quantity: 5,
      category_id: elektronikCategory.id,
      is_featured: true,
      is_active: true,
    },
  });

  const product2 = await prisma.products.upsert({
    where: { slug: 'epson-l3110-printer-multifungsi' },
    update: {},
    create: {
      name: 'Epson L3110 Printer Multifungsi',
      slug: 'epson-l3110-printer-multifungsi',
      description: 'Printer multifungsi Epson L3110 dengan teknologi ink tank',
      price: 3179500,
      discount_percentage: 5,
      stock_quantity: 8,
      category_id: elektronikCategory.id,
      is_featured: true,
      is_active: true,
    },
  });

  // Create some customer users
  const customer1 = await prisma.users.upsert({
    where: { email: 'customer1@example.com' },
    update: {},
    create: {
      email: 'customer1@example.com',
      password_hash: await bcrypt.hash('password123', 10),
      full_name: 'Ahmad Surya',
      role_id: customerRole.id,
      is_active: true,
      email_verified: true,
    },
  });

  const customer2 = await prisma.users.upsert({
    where: { email: 'customer2@example.com' },
    update: {},
    create: {
      email: 'customer2@example.com',
      password_hash: await bcrypt.hash('password123', 10),
      full_name: 'Siti Nurhaliza',
      role_id: customerRole.id,
      is_active: true,
      email_verified: true,
    },
  });

  // Create some reviews
  await prisma.product_reviews.create({
    data: {
      user_id: customer1.id,
      product_id: product1.id,
      rating: 5,
      title: 'Produk Berkualitas Tinggi',
      review_text: 'Mesin absen ini sangat akurat dan mudah digunakan. Sudah 2 tahun kami pakai dan belum pernah ada masalah.',
      is_approved: true,
    },
  });

  await prisma.product_reviews.create({
    data: {
      user_id: customer2.id,
      product_id: product2.id,
      rating: 4,
      title: 'Printer Bagus dan Hemat',
      review_text: 'Printer Epson ini sangat hemat tinta dan hasil cetaknya bagus. Recommended untuk sekolah.',
      is_approved: true,
    },
  });

  // Create some orders
  const order1 = await prisma.orders.upsert({
    where: { order_number: 'ORD-2024-001' },
    update: {},
    create: {
      order_number: 'ORD-2024-001',
      user_id: customer1.id,
      subtotal: 6270000,
      total_amount: 6270000,
      order_status: 'completed',
      payment_status: 'paid',
    },
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });