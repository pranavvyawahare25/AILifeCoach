import { SignIn } from '../components/ClerkProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Welcome back to AILifeCoach</CardTitle>
          <CardDescription>Sign in to continue your personal growth journey</CardDescription>
        </CardHeader>
        <CardContent>
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
          />
        </CardContent>
      </Card>
    </div>
  );
} 