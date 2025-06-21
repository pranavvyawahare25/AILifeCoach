// Vercel serverless function entry point
import dotenv from 'dotenv';
dotenv.config();

// Log environment variables status (not their values) for debugging
console.log('API Environment variables status:');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Set' : 'Not set');
console.log('CLERK_SECRET_KEY:', process.env.CLERK_SECRET_KEY ? 'Set' : 'Not set');

import express from 'express';
import { registerRoutes } from '../server/routes';
import '../shared/schema'; // Ensure schema is loaded

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message || 'Unknown error'
  });
});

// Initialize routes
const init = async () => {
  try {
    const server = await registerRoutes(app);
    return app;
  } catch (error) {
    console.error('Failed to initialize routes:', error);
    // Still return the app, but it will use the error handler
    return app;
  }
};

// Export for Vercel serverless
export default async (req: any, res: any) => {
  try {
    const app = await init();
    return app(req, res);
  } catch (error) {
    console.error('Error in serverless function:', error);
    res.status(500).json({
      success: false,
      message: 'Server initialization failed'
    });
  }
}; 