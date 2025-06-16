import { Brain, Search, Book, History, Lightbulb, Menu } from "lucide-react";
import { TabType } from "@/lib/types";
import { ThemeToggle } from "./ThemeToggle";

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'analyze' as TabType, label: 'Analyze', icon: Search },
    { id: 'journal' as TabType, label: 'Journal', icon: Book },
    { id: 'history' as TabType, label: 'History', icon: History },
    { id: 'nudges' as TabType, label: 'Nudges', icon: Lightbulb },
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Brain className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">Fix My Life Agent</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex items-center space-x-2 transition-colors ${
                  activeTab === id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
            <ThemeToggle />
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button className="text-gray-600 dark:text-gray-300 hover:text-primary">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
