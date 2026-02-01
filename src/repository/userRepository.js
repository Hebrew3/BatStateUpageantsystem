import { db } from '../drizzle/db.js';
import { users } from '../drizzle/schema.js';
import { eq, asc, desc } from 'drizzle-orm';

export async function createUser(userData) {
  const [user] = await db.insert(users).values(userData).returning();
  return user;
}

export async function getUserById(id) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user || null;
}

export async function getUserByUsername(username) {
  const [user] = await db.select().from(users).where(eq(users.username, username));
  return user || null;
}

export async function getAllUsers(options = {}) {
  const { orderByDesc = false } = options;
  
  let query = db.select().from(users);
  
  if (orderByDesc) {
    query = query.orderBy(desc(users.createdAt));
  } else {
    query = query.orderBy(asc(users.createdAt));
  }
  
  return await query;
}

export async function updateUser(id, data) {
  const [user] = await db.update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return user || null;
}

export async function deleteUser(id) {
  const result = await db.delete(users).where(eq(users.id, id));
  return (result.rowCount ?? 0) > 0;
}

