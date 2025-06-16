import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = "AI is analyzing your challenge..." }: LoadingStateProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{message}</h3>
        <p className="text-gray-600 mb-4">This usually takes 10-15 seconds</p>
        <div className="max-w-md mx-auto">
          <Progress value={progress} className="h-2" />
        </div>
      </div>
    </div>
  );
}
