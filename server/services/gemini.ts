interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface AnalysisResult {
  rootCause: string;
  quickFix: string;
  newHabit: string;
  mindsetShift: string;
  longTermAdvice: string;
}

interface JournalReflection {
  reflection: string;
  microAdvice: string;
}

export class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
  }

  private async makeRequest(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response from Gemini API');
    }

    return data.candidates[0].content.parts[0].text;
  }

  async analyzeProblem(problem: string, duration: string, impact: string): Promise<AnalysisResult> {
    const prompt = `As an AI life coach, analyze this recurring life issue and provide structured advice.

Problem: "${problem}"
Duration: ${duration}
Impact Level: ${impact}

Please provide your analysis in exactly this JSON format (no additional text):
{
  "rootCause": "Identify the underlying cause of this issue in 1-2 sentences",
  "quickFix": "Suggest an immediate actionable solution in 1-2 sentences", 
  "newHabit": "Recommend a specific new habit to develop in 1-2 sentences",
  "mindsetShift": "Suggest a mental reframing or perspective change in 1-2 sentences",
  "longTermAdvice": "Provide comprehensive long-term strategy in 2-3 sentences"
}

Make the advice practical, specific, and actionable. Focus on evidence-based solutions.`;

    try {
      const response = await this.makeRequest(prompt);
      
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini API');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      
      // Validate required fields
      const requiredFields = ['rootCause', 'quickFix', 'newHabit', 'mindsetShift', 'longTermAdvice'];
      for (const field of requiredFields) {
        if (!analysis[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      return analysis;
    } catch (error) {
      console.error('Error analyzing problem:', error);
      // Fallback response
      return {
        rootCause: "This issue often stems from ingrained patterns and environmental factors that reinforce the current behavior.",
        quickFix: "Start with the smallest possible change you can make today to interrupt the current pattern.",
        newHabit: "Replace the problematic behavior with a positive alternative that serves the same underlying need.",
        mindsetShift: "View this challenge as an opportunity for growth rather than a personal failing.",
        longTermAdvice: "Sustainable change requires patience, consistency, and self-compassion. Focus on progress over perfection and celebrate small wins along the way."
      };
    }
  }

  async reflectOnJournal(content: string): Promise<JournalReflection> {
    const prompt = `As a supportive AI life coach, provide a thoughtful reflection on this journal entry and offer helpful micro-advice.

Journal Entry: "${content}"

Please respond in exactly this JSON format (no additional text):
{
  "reflection": "Offer a compassionate, insightful reflection on their thoughts/feelings in 2-3 sentences",
  "microAdvice": "Provide one small, actionable piece of advice they can implement today in 1-2 sentences"
}

Be encouraging, empathetic, and focus on actionable insights.`;

    try {
      const response = await this.makeRequest(prompt);
      
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini API');
      }

      const reflection = JSON.parse(jsonMatch[0]);
      
      // Validate required fields
      if (!reflection.reflection || !reflection.microAdvice) {
        throw new Error('Missing required fields in journal reflection');
      }

      return reflection;
    } catch (error) {
      console.error('Error reflecting on journal:', error);
      // Fallback response
      return {
        reflection: "Thank you for sharing your thoughts. Self-reflection is a powerful tool for personal growth and awareness.",
        microAdvice: "Take a moment today to acknowledge one thing you're grateful for - it can shift your perspective in a positive way."
      };
    }
  }
}

export const geminiService = new GeminiService();
