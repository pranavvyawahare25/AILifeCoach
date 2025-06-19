import { SignUp } from '../components/ClerkProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Join AILifeCoach</CardTitle>
          <CardDescription>Create an account to start your personal growth journey</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            redirectUrl="/dashboard"
          />
        </CardContent>
      </Card>
    </div>
  );
} 