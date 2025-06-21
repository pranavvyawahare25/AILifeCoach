import { Brain, Search, Book, History, Lightbulb, Menu, LogOut } from "lucide-react";
import { TabType } from "@/lib/types";
import { ThemeToggle } from "./ThemeToggle";
import { UserButton, useUser } from '@clerk/clerk-react';
import { useLocation } from "wouter";
import { Button } from "./ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { useMockAuth, MockUserButton } from './ClerkProvider';

// Custom hook to safely use authentication
function useAuth() {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const isValidKey = publishableKey && publishableKey.startsWith('pk_') && publishableKey.length > 20 && !publishableKey.includes('placeholder');
  
  // Always call both hooks (React rule of hooks)
  let clerkAuth = { isSignedIn: false };
  let mockAuth = { isSignedIn: false };
  
  try {
    clerkAuth = useUser();
  } catch (error) {
    // Clerk hook failed, will use mock
  }
  
  try {
    mockAuth = useMockAuth();
  } catch (error) {
    // Mock hook failed
  }
  
  return {
    isSignedIn: isValidKey ? clerkAuth.isSignedIn : mockAuth.isSignedIn,
    UserButtonComponent: isValidKey ? UserButton : MockUserButton
  };
}

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [, setLocation] = useLocation();
  const { isSignedIn, UserButtonComponent } = useAuth();
  
  const tabs = [
    { id: 'analyze' as TabType, label: 'Analyze', icon: Search },
    { id: 'journal' as TabType, label: 'Journal', icon: Book },
    { id: 'history' as TabType, label: 'History', icon: History },
    { id: 'nudges' as TabType, label: 'Nudges', icon: Lightbulb },
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => setLocation("/")}
            >
              <Brain className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">AILifeCoach</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {isSignedIn && tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex items-center space-x-2 transition-colors ${
                  activeTab === id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
            <ThemeToggle />
            
            {isSignedIn ? (
              <UserButtonComponent afterSignOutUrl="/" />
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => setLocation("/sign-in")}>
                  Sign In
                </Button>
                <Button onClick={() => setLocation("/sign-up")}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            
            {isSignedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {tabs.map(({ id, label, icon: Icon }) => (
                    <DropdownMenuItem key={id} onClick={() => onTabChange(id)}>
                      <Icon className="w-4 h-4 mr-2" />
                      <span>{label}</span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem>
                    <UserButtonComponent afterSignOutUrl="/" />
                    <span className="ml-2">Account</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {!isSignedIn && (
              <Button variant="ghost" onClick={() => setLocation("/sign-in")}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
