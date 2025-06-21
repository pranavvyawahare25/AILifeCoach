import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ensure environment variables are loaded
import dotenv from 'dotenv';
dotenv.config();

console.log('Starting build process...');

// Check for required environment variables
const requiredEnvVars = [
  'DATABASE_URL',
  'GEMINI_API_KEY',
  'VITE_CLERK_PUBLISHABLE_KEY'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.warn(`⚠️ Warning: The following environment variables are missing: ${missingEnvVars.join(', ')}`);
  console.warn('The build will continue, but the application may not function correctly without these variables.');
  console.warn('Make sure to set these variables in your deployment environment.');
}

// Build the client
try {
  console.log('Building client...');
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('Error building client:', error);
  process.exit(1);
}

// Ensure the api directory exists
const apiDir = path.join(__dirname, 'api');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

// Create the API entry point
try {
  console.log('Creating API entry point...');
  const apiIndexContent = `
import dotenv from 'dotenv';
dotenv.config();

// Log environment variable status (not their values) for debugging
console.log('Environment variables status:');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Set' : 'Not set');
console.log('CLERK_SECRET_KEY:', process.env.CLERK_SECRET_KEY ? 'Set' : 'Not set');

// Import and re-export the server
export * from '../server/index.js';
`;

  fs.writeFileSync(path.join(apiDir, 'index.ts'), apiIndexContent);
} catch (error) {
  console.error('Error creating API entry point:', error);
  process.exit(1);
}

console.log('Build completed successfully!'); 