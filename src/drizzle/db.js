import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema.js';

const connectionString = import.meta.env.VITE_DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined. Please set VITE_DATABASE_URL in your .env file');
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });

export default db;

