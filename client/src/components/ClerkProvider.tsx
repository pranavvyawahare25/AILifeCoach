import { ClerkProvider as BaseClerkProvider, SignIn as ClerkSignIn, SignUp as ClerkSignUp, UserButton as ClerkUserButton } from '@clerk/clerk-react';
import { useTheme } from './ThemeProvider';
import { useLocation } from 'wouter';
import React from 'react';

// Get the publishable key from environment variables
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const isValidKey = publishableKey && publishableKey.startsWith('pk_') && publishableKey.length > 20 && !publishableKey.includes('placeholder');

// Log for debugging
console.log("Clerk Debug Info:", {
  publishableKey: publishableKey ? `${publishableKey.slice(0, 10)}...` : "No key found",
  isValidKey,
  keyLength: publishableKey?.length || 0
});

// Create a context for auth state in development mode
const MockAuthContext = React.createContext({
  isSignedIn: true,
  isLoaded: true,
  user: { id: 'mock-user-id', fullName: 'Test User' }
});

export const useMockAuth = () => React.useContext(MockAuthContext);

// Mock provider for development when key is missing
const MockClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return <MockAuthContext.Provider value={{
    isSignedIn: true,
    isLoaded: true,
    user: { id: 'mock-user-id', fullName: 'Test User' }
  }}>
    {children}
  </MockAuthContext.Provider>;
};

// Mock components for development
export const MockSignIn = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Sign in to AILifeCoach</h1>
      <p className="text-muted-foreground">Welcome back! Please sign in to continue</p>
      
      <div className="space-y-4 mt-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input 
            type="email" 
            placeholder="Enter your email"
            className="w-full p-2 border rounded-md" 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <input 
            type="password" 
            placeholder="Enter your password"
            className="w-full p-2 border rounded-md" 
          />
        </div>
        
        <button 
          className="w-full p-2 bg-primary text-white rounded-md hover:bg-primary/90"
          onClick={() => window.location.href = "/dashboard"}
        >
          Sign in
        </button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Don't have an account? <a href="/sign-up" className="text-primary hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export const MockSignUp = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Join AILifeCoach</h1>
      <p className="text-muted-foreground">Create an account to start your personal growth journey</p>
      
      <div className="space-y-4 mt-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input 
            type="email" 
            placeholder="Enter your email"
            className="w-full p-2 border rounded-md" 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <input 
            type="password" 
            placeholder="Create a password"
            className="w-full p-2 border rounded-md" 
          />
        </div>
        
        <button 
          className="w-full p-2 bg-primary text-white rounded-md hover:bg-primary/90"
          onClick={() => window.location.href = "/sign-in"}
        >
          Sign up
        </button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account? <a href="/sign-in" className="text-primary hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export const MockUserButton = () => {
  return (
    <button className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
      U
    </button>
  );
};

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [, setLocation] = useLocation();
  
  // Use mock provider if publishable key is missing or invalid
  if (!isValidKey) {
    console.warn('Using mock Clerk provider as no valid VITE_CLERK_PUBLISHABLE_KEY is available');
    return <MockClerkProvider>{children}</MockClerkProvider>;
  }
  
  // Only use the real Clerk provider if we have a valid key
  return (
    <BaseClerkProvider
      publishableKey={publishableKey}
      navigate={setLocation}
      appearance={{
        variables: {
          colorPrimary: '#7c3aed', // Purple to match your theme
          colorText: theme === 'dark' ? '#e2e8f0' : '#1e293b',
          colorBackground: theme === 'dark' ? '#1e293b' : '#ffffff',
        },
        layout: {
          socialButtonsVariant: 'iconButton',
          socialButtonsPlacement: 'top',
        },
      }}
      localization={{
        socialButtonsBlockButton: "Continue with {{provider}}",
        signIn: {
          title: "Sign in to AILifeCoach",
          subtitle: "Welcome back! Please sign in to continue",
        },
        signUp: {
          title: "Join AILifeCoach",
          subtitle: "Create an account to start your personal growth journey",
        },
      }}
    >
      {children}
    </BaseClerkProvider>
  );
}

// Export the appropriate components based on whether we have a valid key
export const SignIn = isValidKey ? ClerkSignIn : MockSignIn;
export const SignUp = isValidKey ? ClerkSignUp : MockSignUp;
export const UserButton = isValidKey ? ClerkUserButton : MockUserButton; 