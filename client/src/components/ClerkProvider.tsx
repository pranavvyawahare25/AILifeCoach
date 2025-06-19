import { ClerkProvider as BaseClerkProvider, SignIn, SignUp, UserButton } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { useTheme } from './ThemeProvider';

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
        baseTheme: theme === 'dark' ? dark : undefined,
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