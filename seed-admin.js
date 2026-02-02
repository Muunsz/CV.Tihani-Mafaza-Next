const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
  const prisma = new PrismaClient();
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.users.findFirst({
      where: { role_id: 1 }
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create admin user
    const admin = await prisma.users.create({
      data: {
        email: 'admin@tihanimafaza.com',
        password_hash: hashedPassword,
        full_name: 'Administrator',
        phone_number: '081234567890',
        role_id: 1, // admin
        is_active: true,
        email_verified: true,
      },
    });

    console.log('Admin user created:', admin.email);

    // Create a sample customer
    const customerPassword = await bcrypt.hash('customer123', 10);
    const customer = await prisma.users.create({
      data: {
        email: 'customer@example.com',
        password_hash: customerPassword,
        full_name: 'Sample Customer',
        phone_number: '081234567891',
        role_id: 3, // customer
        is_active: true,
        email_verified: true,
      },          
    });

    console.log('Sample customer created:', customer.email);

  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();