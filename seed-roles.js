const { PrismaClient } = require('@prisma/client');

async function seedRoles() {
  const prisma = new PrismaClient();
  try {
    const roles = [
      { id: 1, name: 'admin', description: 'Administrator' },
      { id: 2, name: 'staff', description: 'Staff' },
      { id: 3, name: 'customer', description: 'Customer' },
      { id: 4, name: 'guest', description: 'Guest' },
    ];

    for (const role of roles) {
      await prisma.roles.upsert({
        where: { id: role.id },
        update: role,
        create: role,
      });
    }

    console.log('Roles seeded successfully');
  } catch (error) {
    console.error('Error seeding roles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedRoles();