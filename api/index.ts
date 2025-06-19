// Vercel serverless function entry point
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes
const init = async () => {
  await registerRoutes(app);
  return app;
};

// Export for Vercel serverless
export default async (req: any, res: any) => {
  const app = await init();
  return app(req, res);
}; 