import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema";

neonConfig.webSocketConstructor = ws;

let pool: Pool;
let db: ReturnType<typeof drizzle>;

// Initialize database connection lazily
export function initializeDB() {
  if (pool && db) {
    return { pool, db };
  }

  // Get DATABASE_URL from environment variables
  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  // Clean up the DATABASE_URL by removing any newlines
  pool = new Pool({ connectionString: DATABASE_URL.replace(/\n/g, '') });
  db = drizzle({ client: pool, schema });
  
  return { pool, db };
}

// Export getters that initialize on first access
export const getPool = () => {
  const { pool } = initializeDB();
  return pool;
};

export const getDB = () => {
  const { db } = initializeDB();
  return db;
};