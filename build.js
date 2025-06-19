import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ensure environment variables are loaded
import dotenv from 'dotenv';
dotenv.config();

console.log('Starting build process...');

// Build the client
console.log('Building client...');
execSync('npm run build', { stdio: 'inherit' });

// Ensure the api directory exists
const apiDir = path.join(__dirname, 'api');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

console.log('Build completed successfully!'); 