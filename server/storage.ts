import { 
  users, 
  sessions, 
  journalEntries, 
  nudges,
  type User, 
  type InsertUser,
  type Session,
  type InsertSession,
  type JournalEntry,
  type InsertJournalEntry,
  type Nudge,
  type InsertNudge
} from "../shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createSession(session: InsertSession): Promise<Session>;
  getSessionsByUserId(userId: number): Promise<Session[]>;
  getSession(id: number): Promise<Session | undefined>;
  
  createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry>;
  getJournalEntriesByUserId(userId: number): Promise<JournalEntry[]>;
  updateJournalEntry(id: number, updates: Partial<JournalEntry>): Promise<JournalEntry | undefined>;
  
  getTodaysNudge(): Promise<Nudge | undefined>;
  createNudge(nudge: InsertNudge): Promise<Nudge>;
  getRandomNudge(): Promise<Nudge | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const [session] = await db
      .insert(sessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async getSessionsByUserId(userId: number): Promise<Session[]> {
    return await db
      .select()
      .from(sessions)
      .where(eq(sessions.userId, userId))
      .orderBy(sessions.createdAt);
  }

  async getSession(id: number): Promise<Session | undefined> {
    const [session] = await db.select().from(sessions).where(eq(sessions.id, id));
    return session || undefined;
  }

  async createJournalEntry(insertEntry: InsertJournalEntry): Promise<JournalEntry> {
    const [entry] = await db
      .insert(journalEntries)
      .values(insertEntry)
      .returning();
    return entry;
  }

  async getJournalEntriesByUserId(userId: number): Promise<JournalEntry[]> {
    return await db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.userId, userId))
      .orderBy(journalEntries.createdAt);
  }

  async updateJournalEntry(id: number, updates: Partial<JournalEntry>): Promise<JournalEntry | undefined> {
    const [updatedEntry] = await db
      .update(journalEntries)
      .set(updates)
      .where(eq(journalEntries.id, id))
      .returning();
    return updatedEntry || undefined;
  }

  async getTodaysNudge(): Promise<Nudge | undefined> {
    const allNudges = await db.select().from(nudges);
    if (allNudges.length === 0) return undefined;
    
    // Simple daily nudge selection based on date
    const today = new Date().getDate();
    const index = today % allNudges.length;
    return allNudges[index];
  }

  async createNudge(insertNudge: InsertNudge): Promise<Nudge> {
    const [nudge] = await db
      .insert(nudges)
      .values(insertNudge)
      .returning();
    return nudge;
  }

  async getRandomNudge(): Promise<Nudge | undefined> {
    const allNudges = await db.select().from(nudges);
    if (allNudges.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * allNudges.length);
    return allNudges[randomIndex];
  }
}

export const storage = new DatabaseStorage();
