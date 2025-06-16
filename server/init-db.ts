import { db } from "./db";
import { users, nudges } from "@shared/schema";
import { eq } from "drizzle-orm";

async function initializeDatabase() {
  try {
    console.log("Initializing database...");

    // Create default user if it doesn't exist
    const existingUser = await db.select().from(users).where(eq(users.id, 1));
    if (existingUser.length === 0) {
      await db.insert(users).values({
        username: "demo_user",
        password: "demo_password", // In production, this should be hashed
      });
      console.log("Created default user");
    }

    // Check if nudges exist
    const existingNudges = await db.select().from(nudges);
    if (existingNudges.length === 0) {
      const defaultNudges = [
        "Small consistent actions create extraordinary results. What one tiny step can you take today?",
        "Progress, not perfection. Every small step forward is a victory worth celebrating.",
        "Your future self is counting on the choices you make today. Make them proud.",
        "The best time to plant a tree was 20 years ago. The second best time is now.",
        "You don't have to be great to get started, but you have to get started to be great.",
        "Every expert was once a beginner. Every pro was once an amateur.",
        "The journey of a thousand miles begins with a single step. Take yours today.",
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "The only way to do great work is to love what you do. Find your passion and pursue it.",
        "Believe you can and you're halfway there. Confidence is the first step to achievement.",
        "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        "The future belongs to those who believe in the beauty of their dreams."
      ];

      for (const message of defaultNudges) {
        await db.insert(nudges).values({
          message,
          category: "motivation",
        });
      }
      console.log(`Created ${defaultNudges.length} default nudges`);
    }

    console.log("Database initialization complete");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

export { initializeDatabase };