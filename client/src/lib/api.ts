import { useAuth } from '@clerk/clerk-react';

// Base API URL
const API_BASE_URL = '/api';

// API client with authentication
export const useApi = () => {
  const { getToken } = useAuth();

  // Helper function to make authenticated API requests
  const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const token = await getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  };

  return {
    // User
    getCurrentUser: () => fetchWithAuth('/user'),
    
    // Problem analysis
    analyzeProblem: (data: { problem: string; duration: string; impact: string }) => 
      fetchWithAuth('/analyze-problem', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    // Journal
    createJournalEntry: (content: string) => 
      fetchWithAuth('/journal-entry', {
        method: 'POST',
        body: JSON.stringify({ content }),
      }),
    getJournalEntries: () => fetchWithAuth('/journal'),
    
    // Nudges
    getTodaysNudge: () => fetchWithAuth('/nudges'),
    getRandomNudge: () => 
      fetchWithAuth('/nudges/random', {
        method: 'POST',
      }),
    
    // History
    getHistory: () => fetchWithAuth('/history'),
  };
}; 