import { Button } from "@/components/ui/button";
import { Save, Share2, Search, Wrench, PlusCircle, Brain, Calendar } from "lucide-react";
import { SessionWithAnalysis } from "@/lib/types";

interface AdviceDisplayProps {
  session: SessionWithAnalysis;
  analysisTimestamp?: string;
}

export default function AdviceDisplay({ session, analysisTimestamp }: AdviceDisplayProps) {
  const handleSaveToJournal = () => {
    // In a real app, this would save the analysis to the user's journal
    console.log("Saving to journal:", session);
  };

  const handleShare = () => {
    // In a real app, this would implement sharing functionality
    console.log("Sharing results:", session);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
            <Brain className="text-secondary w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">AI Analysis Results</h2>
            <p className="text-gray-600">
              {analysisTimestamp || "Generated just now"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Root Cause */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Search className="text-red-600 w-4 h-4" />
              <h3 className="font-semibold text-red-800">🧠 Root Cause</h3>
            </div>
            <p className="text-red-700 text-sm">
              {session.rootCause}
            </p>
          </div>

          {/* Quick Fix */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Wrench className="text-blue-600 w-4 h-4" />
              <h3 className="font-semibold text-blue-800">🛠 Quick Fix</h3>
            </div>
            <p className="text-blue-700 text-sm">
              {session.quickFix}
            </p>
          </div>

          {/* New Habit */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <PlusCircle className="text-green-600 w-4 h-4" />
              <h3 className="font-semibold text-green-800">💡 New Habit</h3>
            </div>
            <p className="text-green-700 text-sm">
              {session.newHabit}
            </p>
          </div>

          {/* Mindset Shift */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="text-purple-600 w-4 h-4" />
              <h3 className="font-semibold text-purple-800">🧘 Mindset Shift</h3>
            </div>
            <p className="text-purple-700 text-sm">
              {session.mindsetShift}
            </p>
          </div>
        </div>

        {/* Long-term Advice */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="text-amber-600 w-4 h-4" />
            <h3 className="font-semibold text-amber-800">🔁 Long-Term Strategy</h3>
          </div>
          <p className="text-amber-700 text-sm">
            {session.longTermAdvice}
          </p>
        </div>

        <div className="mt-6 flex space-x-3">
          <Button 
            onClick={handleSaveToJournal}
            className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-medium"
          >
            <Save className="mr-2 w-4 h-4" />
            Save to Journal
          </Button>
          <Button 
            onClick={handleShare}
            variant="outline"
            className="flex-1 border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-medium"
          >
            <Share2 className="mr-2 w-4 h-4" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
}
