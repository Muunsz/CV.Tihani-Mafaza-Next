#!/bin/bash

# Setup script to fix npm installation issues

echo "Starting project setup..."

# Step 1: Remove corrupted node_modules and lock files
echo "Cleaning up corrupted installations..."
rm -rf node_modules
rm -rf package-lock.json
rm -rf .next

# Step 2: Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Step 3: Install dependencies with retry logic
echo "Installing dependencies..."
npm install --legacy-peer-deps --fetch-timeout=120000

# Step 4: Verify bcryptjs installation
echo "Verifying bcryptjs installation..."
if npm list bcryptjs &>/dev/null; then
  echo "✓ bcryptjs is properly installed"
else
  echo "✗ bcryptjs installation failed, installing explicitly..."
  npm install bcryptjs --save
fi

# Step 5: Verify TypeScript installation
echo "Verifying TypeScript installation..."
if npm list typescript &>/dev/null; then
  echo "✓ TypeScript is properly installed"
else
  echo "✗ TypeScript installation failed, installing explicitly..."
  npm install typescript --save-dev
fi

# Step 6: Run Prisma setup
echo "Setting up Prisma..."
npx prisma generate

echo "✓ Setup completed successfully!"
echo "You can now run: npm run dev"
