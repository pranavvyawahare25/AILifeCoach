import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'wouter';
import { LoadingState } from './LoadingState';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useUser();
  const [, navigate] = useNavigate();
  const [location] = useLocation();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Store the attempted URL to redirect back after login
      sessionStorage.setItem('redirectAfterSignIn', location);
      navigate('/sign-in');
    }
  }, [isLoaded, isSignedIn, navigate, location]);

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return <LoadingState message="Checking authentication..." />;
  }

  // If authenticated, render the children
  return isSignedIn ? <>{children}</> : null;
} 