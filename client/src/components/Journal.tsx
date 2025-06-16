import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pen, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import VoiceRecorder from "./VoiceRecorder";

export default function Journal() {
  const [entry, setEntry] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const journalMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest("POST", "/api/journal-entry", { 
        content,
        userId: 1 // Default user for demo
      });
      return response.json();
    },
    onSuccess: () => {
      setEntry("");
      queryClient.invalidateQueries({ queryKey: ["/api/journal"] });
      toast({
        title: "Journal Entry Added",
        description: "Your reflection has been saved with AI insights!",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to Save Entry",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleVoiceTranscript = (transcript: string) => {
    setEntry(prev => prev ? prev + ' ' + transcript : transcript);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!entry.trim()) {
      toast({
        title: "Empty Entry",
        description: "Please write something before submitting.",
        variant: "destructive",
      });
      return;
    }

    journalMutation.mutate(entry);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
          <Pen className="text-primary w-5 h-5" />
        </div>
        <h3 className="font-bold text-gray-800 dark:text-white">Quick Journal</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Textarea 
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="w-full px-3 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none dark:bg-gray-800 dark:text-white"
            rows={3}
            placeholder="How are you feeling today? Any progress on your goals? Or click the mic to speak!"
          />
          <div className="absolute top-2 right-2">
            <VoiceRecorder 
              onTranscript={handleVoiceTranscript}
              disabled={journalMutation.isPending}
            />
          </div>
        </div>
        <Button 
          type="submit"
          disabled={journalMutation.isPending}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
        >
          {journalMutation.isPending ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
              Adding Entry...
            </>
          ) : (
            <>
              <Plus className="mr-2 w-4 h-4" />
              Add Entry
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
