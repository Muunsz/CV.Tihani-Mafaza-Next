const { PrismaClient } = require('@prisma/client');

async function checkRoles() {
  const prisma = new PrismaClient();
  try {
    const roles = await prisma.roles.findMany();
    console.log('Available roles:', roles);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkRoles();