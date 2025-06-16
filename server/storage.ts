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
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private sessions: Map<number, Session>;
  private journalEntries: Map<number, JournalEntry>;
  private nudges: Map<number, Nudge>;
  private currentUserId: number;
  private currentSessionId: number;
  private currentJournalId: number;
  private currentNudgeId: number;

  constructor() {
    this.users = new Map();
    this.sessions = new Map();
    this.journalEntries = new Map();
    this.nudges = new Map();
    this.currentUserId = 1;
    this.currentSessionId = 1;
    this.currentJournalId = 1;
    this.currentNudgeId = 1;

    // Initialize with some default nudges
    this.initializeNudges();
  }

  private initializeNudges() {
    const defaultNudges = [
      "Small consistent actions create extraordinary results. What one tiny step can you take today?",
      "Progress, not perfection. Every small step forward is a victory worth celebrating.",
      "Your future self is counting on the choices you make today. Make them proud.",
      "The best time to plant a tree was 20 years ago. The second best time is now.",
      "You don't have to be great to get started, but you have to get started to be great.",
      "Every expert was once a beginner. Every pro was once an amateur.",
      "The journey of a thousand miles begins with a single step. Take yours today.",
      "Success is not final, failure is not fatal: it is the courage to continue that counts."
    ];

    defaultNudges.forEach(message => {
      const nudge: Nudge = {
        id: this.currentNudgeId++,
        message,
        category: "motivation",
        createdAt: new Date()
      };
      this.nudges.set(nudge.id, nudge);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = this.currentSessionId++;
    const session: Session = { 
      ...insertSession, 
      id, 
      createdAt: new Date()
    };
    this.sessions.set(id, session);
    return session;
  }

  async getSessionsByUserId(userId: number): Promise<Session[]> {
    return Array.from(this.sessions.values())
      .filter(session => session.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getSession(id: number): Promise<Session | undefined> {
    return this.sessions.get(id);
  }

  async createJournalEntry(insertEntry: InsertJournalEntry): Promise<JournalEntry> {
    const id = this.currentJournalId++;
    const entry: JournalEntry = {
      ...insertEntry,
      id,
      reflection: null,
      microAdvice: null,
      createdAt: new Date()
    };
    this.journalEntries.set(id, entry);
    return entry;
  }

  async getJournalEntriesByUserId(userId: number): Promise<JournalEntry[]> {
    return Array.from(this.journalEntries.values())
      .filter(entry => entry.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateJournalEntry(id: number, updates: Partial<JournalEntry>): Promise<JournalEntry | undefined> {
    const entry = this.journalEntries.get(id);
    if (!entry) return undefined;
    
    const updatedEntry = { ...entry, ...updates };
    this.journalEntries.set(id, updatedEntry);
    return updatedEntry;
  }

  async getTodaysNudge(): Promise<Nudge | undefined> {
    const nudgesArray = Array.from(this.nudges.values());
    if (nudgesArray.length === 0) return undefined;
    
    // Simple daily nudge selection based on date
    const today = new Date().getDate();
    const index = today % nudgesArray.length;
    return nudgesArray[index];
  }

  async createNudge(insertNudge: InsertNudge): Promise<Nudge> {
    const id = this.currentNudgeId++;
    const nudge: Nudge = {
      ...insertNudge,
      id,
      createdAt: new Date()
    };
    this.nudges.set(id, nudge);
    return nudge;
  }

  async getRandomNudge(): Promise<Nudge | undefined> {
    const nudgesArray = Array.from(this.nudges.values());
    if (nudgesArray.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * nudgesArray.length);
    return nudgesArray[randomIndex];
  }
}

export const storage = new MemStorage();
