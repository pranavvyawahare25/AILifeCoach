import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkProvider } from "@/components/ClerkProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";
import LandingPage from "@/pages/landing";

function Router() {
  return (
    <Switch>
      <Route path="/sign-in">
        <SignInPage />
      </Route>
      <Route path="/sign-up">
        <SignUpPage />
      </Route>
      <Route path="/sign-in/sso-callback">
        <SignInPage />
      </Route>
      <Route path="/sign-up/sso-callback">
        <SignUpPage />
      </Route>
      <Route path="/sign-in/continue">
        <SignInPage />
      </Route>
      <Route path="/sign-up/continue">
        <SignUpPage />
      </Route>
      <Route path="/sign-in/verify">
        <SignInPage />
      </Route>
      <Route path="/sign-up/verify">
        <SignUpPage />
      </Route>
      <Route path="/" component={LandingPage} />
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ailife-coach-theme">
        <ClerkProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ClerkProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
