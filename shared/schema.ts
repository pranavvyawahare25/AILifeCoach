import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  problem: text("problem").notNull(),
  duration: text("duration").notNull(),
  impact: text("impact").notNull(),
  rootCause: text("root_cause").notNull(),
  quickFix: text("quick_fix").notNull(),
  newHabit: text("new_habit").notNull(),
  mindsetShift: text("mindset_shift").notNull(),
  longTermAdvice: text("long_term_advice").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const journalEntries = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  reflection: text("reflection"),
  microAdvice: text("micro_advice"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const nudges = pgTable("nudges", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  createdAt: true,
});

export const insertJournalEntrySchema = createInsertSchema(journalEntries).omit({
  id: true,
  createdAt: true,
  reflection: true,
  microAdvice: true,
});

export const insertNudgeSchema = createInsertSchema(nudges).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessions.$inferSelect;
export type InsertJournalEntry = z.infer<typeof insertJournalEntrySchema>;
export type JournalEntry = typeof journalEntries.$inferSelect;
export type InsertNudge = z.infer<typeof insertNudgeSchema>;
export type Nudge = typeof nudges.$inferSelect;
