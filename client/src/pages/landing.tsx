import { useNavigate } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Brain } from "lucide-react";

export default function LandingPage() {
  const [, navigate] = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Brain className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">AILifeCoach</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" onClick={() => navigate("/sign-in")}>Sign In</Button>
              <Button onClick={() => navigate("/sign-up")}>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Your Personal AI Life Coach
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            Get personalized coaching, track your growth journey, and develop better habits with AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" onClick={() => navigate("/sign-up")} className="text-lg px-8 py-6">
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/sign-in")} className="text-lg px-8 py-6">
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Features Designed for Personal Growth
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "AI Coaching",
                description: "Get tailored advice for your specific life challenges"
              },
              {
                title: "Smart Journaling",
                description: "Record your thoughts with AI-powered reflection insights"
              },
              {
                title: "Daily Nudges",
                description: "Receive gentle reminders and motivation to stay on track"
              },
              {
                title: "Growth Timeline",
                description: "Track your progress and personal development over time"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Life?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are improving their lives with AILifeCoach's personalized guidance.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => navigate("/sign-up")}
            className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6"
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Brain className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white">AILifeCoach</span>
            </div>
            <p className="text-sm">© {new Date().getFullYear()} AILifeCoach. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 