import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { geminiService } from "./services/gemini";
import { insertSessionSchema, insertJournalEntrySchema } from "@shared/schema";
import { z } from "zod";

const analyzeProblemSchema = z.object({
  problem: z.string().min(1, "Problem description is required"),
  duration: z.string().min(1, "Duration is required"),
  impact: z.string().min(1, "Impact level is required"),
  userId: z.number().optional().default(1), // Default user for demo
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Analyze problem endpoint
  app.post("/api/analyze-problem", async (req, res) => {
    try {
      const { problem, duration, impact, userId } = analyzeProblemSchema.parse(req.body);
      
      // Get AI analysis
      const analysis = await geminiService.analyzeProblem(problem, duration, impact);
      
      // Generate a title from the problem
      const title = problem.length > 50 ? problem.substring(0, 50) + "..." : problem;
      
      // Save session to storage
      const session = await storage.createSession({
        userId,
        title,
        problem,
        duration,
        impact,
        ...analysis
      });

      res.json({
        success: true,
        session,
        analysis
      });
    } catch (error) {
      console.error("Error analyzing problem:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to analyze problem" 
      });
    }
  });

  // Journal entry endpoint
  app.post("/api/journal-entry", async (req, res) => {
    try {
      const entryData = insertJournalEntrySchema.parse({
        ...req.body,
        userId: req.body.userId || 1 // Default user for demo
      });
      
      // Create initial journal entry
      const entry = await storage.createJournalEntry(entryData);
      
      // Get AI reflection
      const reflection = await geminiService.reflectOnJournal(entryData.content);
      
      // Update entry with AI reflection
      const updatedEntry = await storage.updateJournalEntry(entry.id, {
        reflection: reflection.reflection,
        microAdvice: reflection.microAdvice
      });

      res.json({
        success: true,
        entry: updatedEntry,
        reflection
      });
    } catch (error) {
      console.error("Error creating journal entry:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to create journal entry" 
      });
    }
  });

  // Get today's nudge
  app.get("/api/nudges", async (req, res) => {
    try {
      const nudge = await storage.getTodaysNudge();
      
      if (!nudge) {
        return res.status(404).json({ 
          success: false, 
          message: "No nudge available" 
        });
      }

      res.json({
        success: true,
        nudge: {
          ...nudge,
          date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        }
      });
    } catch (error) {
      console.error("Error fetching nudge:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch nudge" 
      });
    }
  });

  // Get random nudge
  app.post("/api/nudges/random", async (req, res) => {
    try {
      const nudge = await storage.getRandomNudge();
      
      if (!nudge) {
        return res.status(404).json({ 
          success: false, 
          message: "No nudge available" 
        });
      }

      res.json({
        success: true,
        nudge: {
          ...nudge,
          date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        }
      });
    } catch (error) {
      console.error("Error fetching random nudge:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch nudge" 
      });
    }
  });

  // Get user's session history
  app.get("/api/history", async (req, res) => {
    try {
      const userId = parseInt(req.query.userId as string) || 1; // Default user for demo
      const sessions = await storage.getSessionsByUserId(userId);

      res.json({
        success: true,
        sessions: sessions.map(session => ({
          ...session,
          date: session.createdAt.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })
        }))
      });
    } catch (error) {
      console.error("Error fetching history:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch history" 
      });
    }
  });

  // Get user's journal entries
  app.get("/api/journal", async (req, res) => {
    try {
      const userId = parseInt(req.query.userId as string) || 1; // Default user for demo
      const entries = await storage.getJournalEntriesByUserId(userId);

      res.json({
        success: true,
        entries: entries.map(entry => ({
          ...entry,
          date: entry.createdAt.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })
        }))
      });
    } catch (error) {
      console.error("Error fetching journal entries:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch journal entries" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
