// Environment variable validation
// This ensures required environment variables are set at startup

const requiredEnvVars = [
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'DATABASE_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
];

const optionalEnvVars = [
  'NODE_ENV',
];

export function validateEnv() {
  console.log("[ENV] Validating environment variables...");
  
  const missingVars: string[] = [];
  
  // Check required variables
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      missingVars.push(varName);
      console.error(`[ENV] Missing required environment variable: ${varName}`);
    }
  });

  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables: ${missingVars.join(', ')}`;
    console.error(`[ENV] ${errorMessage}`);
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error(errorMessage);
    }
  }

  // Log optional variables
  optionalEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      console.warn(`[ENV] Optional environment variable not set: ${varName}`);
    }
  });

  console.log("[ENV] Environment variables validated successfully");
}

// Export validated environment variables
export const env = {
  nextAuthSecret: process.env.NEXTAUTH_SECRET,
  nextAuthUrl: process.env.NEXTAUTH_URL,
  databaseUrl: process.env.DATABASE_URL,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development',
} as const;
