import { ClerkProvider as BaseClerkProvider, SignIn, SignUp, UserButton } from '@clerk/clerk-react';
import { useTheme } from './ThemeProvider';

// Import themes safely with a fallback
let darkTheme: any = undefined;
try {
  // Try to dynamically import the theme
  import('@clerk/themes').then(module => {
    darkTheme = module.dark;
  }).catch(err => {
    console.warn('Could not load Clerk themes:', err);
  });
} catch (error) {
  console.warn('Could not load Clerk themes:', error);
}

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';

if (!publishableKey) {
  console.error('Missing Clerk publishable key');
}

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  
  return (
    <BaseClerkProvider
      publishableKey={publishableKey}
      appearance={{
        baseTheme: theme === 'dark' ? darkTheme : undefined,
        variables: {
          colorPrimary: '#7c3aed', // Purple to match your theme
          colorText: theme === 'dark' ? '#e2e8f0' : '#1e293b',
          colorBackground: theme === 'dark' ? '#1e293b' : '#ffffff',
        },
      }}
    >
      {children}
    </BaseClerkProvider>
  );
}

export { SignIn, SignUp, UserButton }; 