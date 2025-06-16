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
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div className="flex-1 bg-gray-100 rounded-xl p-6">
                  <div className="h-5 bg-gray-200 rounded w-48 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <History className="text-primary w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Your Journey Timeline</h2>
            <p className="text-gray-600">Track your progress and insights over time</p>
          </div>
        </div>
        <div className="text-center py-12">
          <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No sessions yet</h3>
          <p className="text-gray-500">Start by analyzing your first challenge to see your progress here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <History className="text-primary w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Your Journey Timeline</h2>
          <p className="text-gray-600">Track your progress and insights over time</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        
        <div className="space-y-8">
          {sessions.map((session) => {
            const Icon = getIconForSession(session.title);
            const color = getColorForSession(session.title);
            
            const colorClasses = {
              red: {
                bg: 'bg-red-100',
                text: 'text-red-600',
                cardBg: 'bg-red-50',
                cardText: 'text-red-700',
                cardTitle: 'text-red-800',
                fixBg: 'bg-blue-50',
                fixText: 'text-blue-700',
                fixTitle: 'text-blue-800'
              },
              blue: {
                bg: 'bg-blue-100',
                text: 'text-blue-600',
                cardBg: 'bg-red-50',
                cardText: 'text-red-700',
                cardTitle: 'text-red-800',
                fixBg: 'bg-blue-50',
                fixText: 'text-blue-700',
                fixTitle: 'text-blue-800'
              },
              green: {
                bg: 'bg-green-100',
                text: 'text-green-600',
                cardBg: 'bg-red-50',
                cardText: 'text-red-700',
                cardTitle: 'text-red-800',
                fixBg: 'bg-blue-50',
                fixText: 'text-blue-700',
                fixTitle: 'text-blue-800'
              },
              gray: {
                bg: 'bg-gray-100',
                text: 'text-gray-600',
                cardBg: 'bg-red-50',
                cardText: 'text-red-700',
                cardTitle: 'text-red-800',
                fixBg: 'bg-blue-50',
                fixText: 'text-blue-700',
                fixTitle: 'text-blue-800'
              }
            };

            const colors = colorClasses[color as keyof typeof colorClasses];

            return (
              <div key={session.id} className="relative flex items-start space-x-4">
                <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center border-4 border-white shadow-lg`}>
                  <Icon className={`${colors.text} w-6 h-6`} />
                </div>
                <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{session.title}</h3>
                    <span className="text-sm text-gray-500">{session.date}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{session.problem}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className={`${colors.cardBg} p-3 rounded-lg`}>
                      <strong className={colors.cardTitle}>Root Cause:</strong>
                      <p className={`${colors.cardText} mt-1`}>{session.rootCause}</p>
                    </div>
                    <div className={`${colors.fixBg} p-3 rounded-lg`}>
                      <strong className={colors.fixTitle}>Quick Fix:</strong>
                      <p className={`${colors.fixText} mt-1`}>{session.quickFix}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      <Eye className="mr-1 w-4 h-4" />
                      View Full Analysis
                    </Button>
                    <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary/80">
                      <CheckCircle className="mr-1 w-4 h-4" />
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
