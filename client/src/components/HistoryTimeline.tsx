import { Button } from "@/components/ui/button";
import { History, Eye, CheckCircle, Moon, Dumbbell, Utensils } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { SessionWithAnalysis } from "@/lib/types";

const getIconForSession = (title: string) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('sleep')) return Moon;
  if (titleLower.includes('exercise') || titleLower.includes('workout')) return Dumbbell;
  if (titleLower.includes('eat') || titleLower.includes('food')) return Utensils;
  return History;
};

const getColorForSession = (title: string) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('sleep')) return 'red';
  if (titleLower.includes('exercise') || titleLower.includes('workout')) return 'blue';
  if (titleLower.includes('eat') || titleLower.includes('food')) return 'green';
  return 'gray';
};

export default function HistoryTimeline() {
  const { data: historyData, isLoading } = useQuery<{ success: boolean; sessions: SessionWithAnalysis[] }>({
    queryKey: ["/api/history"],
  });

  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-muted rounded-xl"></div>
            <div>
              <div className="h-6 bg-muted rounded w-48 mb-2"></div>
              <div className="h-4 bg-muted rounded w-32"></div>
            </div>
          </div>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-muted rounded-full"></div>
                <div className="flex-1 bg-muted/30 rounded-xl p-6">
                  <div className="h-5 bg-muted rounded w-48 mb-3"></div>
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const sessions = historyData?.sessions || [];

  if (sessions.length === 0) {
    return (
      <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <History className="text-primary w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">Your Journey Timeline</h2>
            <p className="text-muted-foreground">Track your progress and insights over time</p>
          </div>
        </div>
        <div className="text-center py-12">
          <History className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">No sessions yet</h3>
          <p className="text-muted-foreground/80">Start by analyzing your first challenge to see your progress here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <History className="text-primary w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Your Journey Timeline</h2>
          <p className="text-muted-foreground">Track your progress and insights over time</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
        
        <div className="space-y-8">
          {sessions.map((session, index) => {
            const Icon = getIconForSession(session.title);
            const color = getColorForSession(session.title);
            
            const colorClasses = {
              red: {
                bg: 'bg-red-100 dark:bg-red-900/30',
                text: 'text-red-600 dark:text-red-400',
                cardBg: 'bg-red-50 dark:bg-red-950/30',
                cardText: 'text-red-700 dark:text-red-300',
                cardTitle: 'text-red-800 dark:text-red-200',
                fixBg: 'bg-blue-50 dark:bg-blue-950/30',
                fixText: 'text-blue-700 dark:text-blue-300',
                fixTitle: 'text-blue-800 dark:text-blue-200'
              },
              blue: {
                bg: 'bg-blue-100 dark:bg-blue-900/30',
                text: 'text-blue-600 dark:text-blue-400',
                cardBg: 'bg-red-50 dark:bg-red-950/30',
                cardText: 'text-red-700 dark:text-red-300',
                cardTitle: 'text-red-800 dark:text-red-200',
                fixBg: 'bg-blue-50 dark:bg-blue-950/30',
                fixText: 'text-blue-700 dark:text-blue-300',
                fixTitle: 'text-blue-800 dark:text-blue-200'
              },
              green: {
                bg: 'bg-green-100 dark:bg-green-900/30',
                text: 'text-green-600 dark:text-green-400',
                cardBg: 'bg-red-50 dark:bg-red-950/30',
                cardText: 'text-red-700 dark:text-red-300',
                cardTitle: 'text-red-800 dark:text-red-200',
                fixBg: 'bg-blue-50 dark:bg-blue-950/30',
                fixText: 'text-blue-700 dark:text-blue-300',
                fixTitle: 'text-blue-800 dark:text-blue-200'
              },
              gray: {
                bg: 'bg-gray-100 dark:bg-gray-800',
                text: 'text-gray-600 dark:text-gray-400',
                cardBg: 'bg-red-50 dark:bg-red-950/30',
                cardText: 'text-red-700 dark:text-red-300',
                cardTitle: 'text-red-800 dark:text-red-200',
                fixBg: 'bg-blue-50 dark:bg-blue-950/30',
                fixText: 'text-blue-700 dark:text-blue-300',
                fixTitle: 'text-blue-800 dark:text-blue-200'
              }
            };

            const colors = colorClasses[color as keyof typeof colorClasses];

            return (
              <div key={session.id} className="relative flex items-start space-x-4">
                <div className={`relative z-10 w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center border-4 border-card shadow-lg`}>
                  <Icon className={`${colors.text} w-6 h-6`} />
                </div>
                <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-card-foreground">{session.title}</h3>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">{session.date}</span>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{session.problem}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className={`${colors.cardBg} p-4 rounded-lg border border-border/50`}>
                      <strong className={colors.cardTitle}>Root Cause:</strong>
                      <p className={`${colors.cardText} mt-2 leading-relaxed`}>{session.rootCause}</p>
                    </div>
                    <div className={`${colors.fixBg} p-4 rounded-lg border border-border/50`}>
                      <strong className={colors.fixTitle}>Quick Fix:</strong>
                      <p className={`${colors.fixText} mt-2 leading-relaxed`}>{session.quickFix}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center space-x-3">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">
                      <Eye className="mr-2 w-4 h-4" />
                      View Full Analysis
                    </Button>
                    <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary/80 hover:bg-secondary/10">
                      <CheckCircle className="mr-2 w-4 h-4" />
                      Mark as Completed
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
