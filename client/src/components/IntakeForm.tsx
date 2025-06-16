import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, ArrowRight } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import VoiceRecorder from "./VoiceRecorder";

interface FormData {
  problem: string;
  duration: string;
  impact: string;
}

interface IntakeFormProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (result: any) => void;
}

export default function IntakeForm({ onAnalysisStart, onAnalysisComplete }: IntakeFormProps) {
  const [formData, setFormData] = useState<FormData>({
    problem: "",
    duration: "",
    impact: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const analyzeMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/analyze-problem", data);
      return response.json();
    },
    onMutate: () => {
      onAnalysisStart();
    },
    onSuccess: (result) => {
      onAnalysisComplete(result);
      queryClient.invalidateQueries({ queryKey: ["/api/history"] });
      toast({
        title: "Analysis Complete",
        description: "Your AI-powered life coaching analysis is ready!",
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze your problem. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleVoiceTranscript = (transcript: string) => {
    setFormData(prev => ({ 
      ...prev, 
      problem: prev.problem ? prev.problem + ' ' + transcript : transcript 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.problem.trim()) {
      toast({
        title: "Problem Required",
        description: "Please describe the issue you'd like help with.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.duration || !formData.impact) {
      toast({
        title: "Missing Information",
        description: "Please select both duration and impact level.",
        variant: "destructive",
      });
      return;
    }

    analyzeMutation.mutate(formData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center">
          <Search className="text-primary w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Analyze Your Challenge</h2>
          <p className="text-gray-600 dark:text-gray-300">Describe a recurring issue you'd like to overcome</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="problem" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            What's bothering you?
          </Label>
          <div className="relative">
            <Textarea 
              id="problem"
              value={formData.problem}
              onChange={(e) => setFormData(prev => ({ ...prev, problem: e.target.value }))}
              className="w-full px-4 py-3 pr-14 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none dark:bg-gray-800 dark:text-white"
              rows={4}
              placeholder="e.g., I sleep too late every night and feel tired the next day... Or click the mic to speak!"
            />
            <div className="absolute top-3 right-3">
              <VoiceRecorder 
                onTranscript={handleVoiceTranscript}
                disabled={analyzeMutation.isPending}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How long has this been happening?
            </Label>
            <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
              <SelectTrigger className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less-than-month">Less than a month</SelectItem>
                <SelectItem value="1-3-months">1-3 months</SelectItem>
                <SelectItem value="3-6-months">3-6 months</SelectItem>
                <SelectItem value="6-plus-months">6+ months</SelectItem>
                <SelectItem value="years">Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Impact Level
            </Label>
            <Select value={formData.impact} onValueChange={(value) => setFormData(prev => ({ ...prev, impact: value }))}>
              <SelectTrigger className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white">
                <SelectValue placeholder="Select impact" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minor">Minor annoyance</SelectItem>
                <SelectItem value="moderate">Moderate impact</SelectItem>
                <SelectItem value="significant">Significant disruption</SelectItem>
                <SelectItem value="major">Major life impact</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={analyzeMutation.isPending}
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg"
        >
          {analyzeMutation.isPending ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              Get AI Analysis
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
