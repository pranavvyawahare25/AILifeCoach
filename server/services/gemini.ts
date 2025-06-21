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
      console.error("GEMINI_API_KEY environment variable is not set");
    }
    console.log("Gemini API Key:", this.apiKey ? "Set" : "Not set");
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
    const prompt = `As an expert AI life coach with deep knowledge of psychology, behavioral science, and personal development, provide a comprehensive analysis of this recurring life issue with detailed, evidence-based advice.

Problem: "${problem}"
Duration: ${duration}
Impact Level: ${impact}

Please provide your in-depth analysis in exactly this JSON format (no additional text):
{
  "rootCause": "Provide a detailed analysis of the underlying psychological, behavioral, and environmental factors contributing to this issue. Include both conscious and subconscious patterns, potential cognitive biases, and how these factors interact to maintain the current situation. (4-6 sentences)",
  
  "quickFix": "Offer a specific, immediately actionable solution with detailed implementation steps. Explain the psychological mechanism for why this approach works and how it disrupts existing patterns. Include potential obstacles and how to overcome them. (4-5 sentences)", 
  
  "newHabit": "Recommend a specific new habit to develop with clear guidelines on frequency, duration, and implementation. Explain the neurological and psychological benefits of this habit, how it addresses the root cause, and provide a concrete plan for building this habit successfully. (4-5 sentences)",
  
  "mindsetShift": "Provide a comprehensive reframing of the situation that challenges existing thought patterns. Include specific cognitive restructuring techniques, perspective-taking exercises, and evidence-based approaches to shift mental models. Explain how this new perspective transforms the experience of the problem. (4-5 sentences)",
  
  "longTermAdvice": "Deliver a detailed strategic roadmap for sustainable change with multiple interconnected approaches. Include milestone markers, ways to measure progress, strategies for maintaining motivation during setbacks, and how to integrate these changes into a cohesive lifestyle transformation. (5-7 sentences)"
}

Make all advice highly specific, practical, and actionable. Focus on evidence-based approaches from psychology, neuroscience, and behavioral science. Tailor the advice to the specific problem, duration, and impact level provided.`;

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
      // Fallback response with more detailed content
      return {
        rootCause: "This issue likely stems from a complex interplay of ingrained neural pathways, environmental triggers, and reinforcement patterns that have developed over time. Your brain has formed strong associations between specific situations and your current response behaviors, creating an automatic reaction cycle. Additionally, underlying psychological factors such as past experiences, belief systems, and emotional regulation strategies are likely maintaining this pattern despite your conscious desire for change.",
        
        quickFix: "Implement a pattern-interruption technique by consciously introducing a 90-second pause whenever you notice the problematic behavior beginning. During this pause, practice deep diaphragmatic breathing (4 counts in, 6 counts out) while mentally labeling your emotions without judgment. This activates your prefrontal cortex, reducing amygdala reactivity and creating space for conscious choice. Follow this pause with a pre-planned alternative response that you've rehearsed mentally at least 5 times before encountering the situation.",
        
        newHabit: "Establish a daily 10-minute mindfulness practice specifically focused on body awareness and emotional recognition related to this issue. Begin each morning by scanning your body for tension patterns associated with the problem, then practice naming and accepting any emotions that arise without attempting to change them. Research shows this builds the neural pathways for emotional regulation and self-awareness. Pair this practice with a specific environmental change that removes triggers or creates friction against the unwanted behavior, such as rearranging your physical space or creating accountability through daily check-ins with a trusted person.",
        
        mindsetShift: "Reframe this challenge as a valuable data-gathering experiment about your own psychology rather than a personal failing or character flaw. Each instance of the behavior provides crucial information about your triggers, needs, and response patterns. Adopt a scientist's perspective by keeping a structured observation journal documenting antecedents, behaviors, and consequences. This cognitive restructuring technique creates psychological distance from the problem, reducing shame and self-criticism while engaging your analytical abilities. Remember that behavioral patterns develop for adaptive reasons - understanding the original purpose of this behavior can reveal the legitimate need it's attempting to meet.",
        
        longTermAdvice: "Sustainable transformation requires a comprehensive approach addressing cognitive, emotional, behavioral, and environmental dimensions simultaneously. Begin by mapping your complete behavior cycle, identifying at least three potential intervention points where you can apply different strategies. Develop specific implementation intentions in the format 'When X happens, I will do Y' for each intervention point, and rehearse these mentally daily. Establish a progressive measurement system tracking both process metrics (how consistently you apply new strategies) and outcome metrics (changes in frequency/intensity of the issue). Build in regular reflection periods every two weeks to assess progress, adjust strategies, and celebrate small improvements to maintain motivation. Create environmental scaffolding by enlisting appropriate social support, modifying your physical environment, and establishing routines that naturally reinforce your desired behaviors. Remember that setbacks are an informative part of the change process rather than failures."
      };
    }
  }

  async reflectOnJournal(content: string): Promise<JournalReflection> {
    const prompt = `As a supportive AI life coach with expertise in psychology and personal development, provide a thoughtful, insightful reflection on this journal entry with meaningful, personalized advice.

Journal Entry: "${content}"

Please respond in exactly this JSON format (no additional text):
{
  "reflection": "Offer a compassionate, psychologically-informed reflection that demonstrates deep understanding of the emotions, thoughts, and patterns expressed. Validate their experience while gently highlighting insights they may have missed. Include specific references to content from their entry. (3-5 sentences)",
  
  "microAdvice": "Provide one specific, actionable piece of advice tailored to their situation that they can implement today. Include clear implementation steps and explain the psychological benefit of this approach. (2-3 sentences)"
}

Be empathetic, insightful, and focus on practical wisdom that acknowledges the complexity of their situation.`;

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
      // Fallback response with more detailed content
      return {
        reflection: "Thank you for sharing your thoughts with such honesty and vulnerability. I notice how you're navigating complex emotions around this situation, balancing your desire for progress with natural feelings of uncertainty. The self-awareness you demonstrate in recognizing your patterns is a significant strength that will serve you well in this journey. Your reflection shows a deep capacity for insight even amid challenging circumstances.",
        
        microAdvice: "Consider taking 10 minutes today to write down three specific instances when you've successfully navigated similar challenges in the past, focusing on the exact strategies and internal resources you used. This practice activates your brain's pattern recognition for solution-finding rather than problem-focusing, and research shows that recalling past successes increases self-efficacy for current challenges."
      };
    }
  }
}

export const geminiService = new GeminiService();
