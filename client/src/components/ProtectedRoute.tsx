import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import LoadingState from './LoadingState';
import { useMockAuth } from './ClerkProvider';

// Check if we have a valid Clerk key
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const isValidKey = publishableKey && publishableKey.startsWith('pk_') && publishableKey.length > 20 && !publishableKey.includes('placeholder');

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // If we don't have a valid key, use mock auth
  if (!isValidKey) {
    console.log("Using mock authentication - bypassing auth check");
    // In development mode, we always consider the user authenticated
    return <>{children}</>;
  }

  // Real authentication with Clerk
  const { isLoaded, isSignedIn } = useUser();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Store the attempted URL to redirect back after login
      sessionStorage.setItem('redirectAfterSignIn', location);
      setLocation('/sign-in');
    }
  }, [isLoaded, isSignedIn, setLocation, location]);

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return <LoadingState message="Checking authentication..." />;
  }

  // If authenticated, render the children
  return isSignedIn ? <>{children}</> : null;
} 