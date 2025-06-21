import { Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Define a custom request interface that extends Express Request
export interface AuthenticatedRequest extends Request {
  auth?: {
    userId: string;
    sessionId: string;
    getToken: () => Promise<string | null>;
  };
}

// Check if we're in development mode and should use mock auth
const isDevelopment = process.env.NODE_ENV === 'development';
const hasClerkSecret = !!process.env.CLERK_SECRET_KEY;

// Mock authentication for development
const mockAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Create a mock auth object for development
  req.auth = {
    userId: 'mock-user-id',
    sessionId: 'mock-session-id',
    getToken: async () => 'mock-token'
  };
  next();
};

// Middleware to verify the Clerk session token or use mock in development
export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (isDevelopment && !hasClerkSecret) {
    console.log('Using mock authentication in development mode');
    return mockAuth(req, res, next);
  }
  
  // Use real Clerk authentication
  return ClerkExpressRequireAuth({
    onError: (err, req, res) => {
      console.error('Authentication error:', err);
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
  })(req, res, next);
};

// Helper middleware to extract the user ID and make it available in the request
export const extractUserId = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.auth?.userId) {
    return res.status(401).json({
      success: false,
      message: 'User ID not found in authenticated request'
    });
  }
  
  // Handle mock user ID for development
  if (req.auth.userId === 'mock-user-id') {
    (req as any).userId = 1; // Use a fixed user ID for development
    return next();
  }
  
  // Convert the Clerk user ID to a numeric ID for our database
  // In a real app, you'd want to maintain a mapping between Clerk IDs and your DB IDs
  // For simplicity, we'll just use a hash function here
  const numericUserId = Math.abs(hashString(req.auth.userId)) % 1000000;
  
  // Attach the user ID to the request object for use in route handlers
  (req as any).userId = numericUserId;
  
  next();
};

// Simple string hash function
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
} 