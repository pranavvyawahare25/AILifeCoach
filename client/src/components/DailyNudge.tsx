import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, RefreshCw } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { NudgeType } from "@/lib/types";

export default function DailyNudge() {
  const queryClient = useQueryClient();

  const { data: nudgeData, isLoading } = useQuery<{ success: boolean; nudge: NudgeType }>({
    queryKey: ["/api/nudges"],
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  const refreshMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/nudges/random", {});
      return response.json();
    },
    onSuccess: (newNudge) => {
      queryClient.setQueryData(["/api/nudges"], newNudge);
    }
  });

  const nudge = nudgeData?.nudge;

  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
        <div className="animate-pulse">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-muted rounded-lg"></div>
            <div>
              <div className="h-4 bg-muted rounded w-24 mb-1"></div>
              <div className="h-3 bg-muted rounded w-20"></div>
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 mb-4">
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!nudge) {
    return (
      <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
        <div className="text-center text-muted-foreground">
          <Star className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No nudge available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Star className="text-accent w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-card-foreground">Today's Nudge</h3>
          <p className="text-sm text-muted-foreground">{nudge.date}</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-xl p-4 mb-4">
        <p className="text-card-foreground font-medium">
          "{nudge.message}"
        </p>
      </div>
      
      <Button 
        onClick={() => refreshMutation.mutate()}
        disabled={refreshMutation.isPending}
        variant="ghost"
        className="w-full text-accent hover:text-accent/80 font-medium"
      >
        {refreshMutation.isPending ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-accent border-t-transparent rounded-full mr-2" />
            Loading...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 w-4 h-4" />
            Get New Nudge
          </>
        )}
      </Button>
    </div>
  );
}
