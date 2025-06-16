import { useState } from "react";
import Navigation from "@/components/Navigation";
import IntakeForm from "@/components/IntakeForm";
import AdviceDisplay from "@/components/AdviceDisplay";
import LoadingState from "@/components/LoadingState";
import Journal from "@/components/Journal";
import DailyNudge from "@/components/DailyNudge";
import HistoryTimeline from "@/components/HistoryTimeline";
import { Button } from "@/components/ui/button";
import { Plus, Moon, Dumbbell, Utensils } from "lucide-react";
import { TabType, SessionWithAnalysis } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const RecentSessions = () => {
  const { data: historyData } = useQuery<{ success: boolean; sessions: SessionWithAnalysis[] }>({
    queryKey: ["/api/history"],
  });

  const recentSessions = historyData?.sessions?.slice(0, 3) || [];

  const getIconForSession = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('sleep')) return Moon;
    if (titleLower.includes('exercise') || titleLower.includes('workout')) return Dumbbell;
    if (titleLower.includes('eat') || titleLower.includes('food')) return Utensils;
    return Plus;
  };

  const getColorForSession = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('sleep')) return 'red';
    if (titleLower.includes('exercise') || titleLower.includes('workout')) return 'blue';
    if (titleLower.includes('eat') || titleLower.includes('food')) return 'green';
    return 'gray';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800">Recent Sessions</h3>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          View All
        </button>
      </div>
      
      {recentSessions.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <p className="text-sm">No sessions yet. Start by analyzing a challenge!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentSessions.map((session) => {
            const Icon = getIconForSession(session.title);
            const color = getColorForSession(session.title);
            
            const colorClasses = {
              red: 'bg-red-100 text-red-600',
              blue: 'bg-blue-100 text-blue-600',
              green: 'bg-green-100 text-green-600',
              gray: 'bg-gray-100 text-gray-600'
            };

            return (
              <div 
                key={session.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{session.title}</p>
                  <p className="text-xs text-gray-600">{session.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('analyze');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<SessionWithAnalysis | null>(null);

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setCurrentAnalysis(null);
  };

  const handleAnalysisComplete = (result: any) => {
    setIsAnalyzing(false);
    setCurrentAnalysis(result.session);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="gradient-text mb-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Transform Your Life</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get AI-powered insights to break through your recurring challenges and build lasting positive habits.
            </p>
          </div>
          <div className="mt-8 flex justify-center space-x-4">
            <Button 
              onClick={() => setActiveTab('analyze')}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Journey
            </Button>
            <Button 
              onClick={() => setActiveTab('history')}
              variant="outline"
              className="border-gray-300 hover:border-primary text-gray-700 hover:text-primary px-8 py-3 rounded-xl font-semibold transition-all"
            >
              View Demo
            </Button>
          </div>
        </section>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Analyze Tab */}
            {activeTab === 'analyze' && (
              <>
                <IntakeForm 
                  onAnalysisStart={handleAnalysisStart}
                  onAnalysisComplete={handleAnalysisComplete}
                />
                
                {isAnalyzing && (
                  <LoadingState message="AI is analyzing your challenge..." />
                )}
                
                {currentAnalysis && !isAnalyzing && (
                  <AdviceDisplay 
                    session={currentAnalysis} 
                    analysisTimestamp="Generated just now"
                  />
                )}
              </>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <HistoryTimeline />
            )}

            {/* Journal Tab */}
            {activeTab === 'journal' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Personal Journal</h2>
                  <Journal />
                </div>
              </div>
            )}

            {/* Nudges Tab */}
            {activeTab === 'nudges' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Motivation</h2>
                  <DailyNudge />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <DailyNudge />
            <Journal />
            <RecentSessions />
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="icon"
          className="bg-primary hover:bg-primary/90 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
          onClick={() => setActiveTab('analyze')}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
