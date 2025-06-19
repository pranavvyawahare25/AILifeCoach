import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import LoadingState from './LoadingState';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
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