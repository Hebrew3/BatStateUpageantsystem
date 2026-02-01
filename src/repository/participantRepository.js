import { db } from '../drizzle/db.js';
import { participants } from '../drizzle/schema.js';
import { eq, asc, desc } from 'drizzle-orm';

export async function createParticipant(participantData) {
  const [participant] = await db.insert(participants).values(participantData).returning();
  return participant;
}

export async function getParticipantById(id) {
  const [participant] = await db.select().from(participants).where(eq(participants.id, id));
  return participant || null;
}

export async function getParticipantByNumber(number) {
  const [participant] = await db.select().from(participants).where(eq(participants.number, number));
  return participant || null;
}

export async function getAllParticipants(options = {}) {
  const { orderByDesc = false } = options;
  
  let query = db.select().from(participants);
  
  if (orderByDesc) {
    query = query.orderBy(desc(participants.createdAt));
  } else {
    query = query.orderBy(asc(participants.createdAt));
  }
  
  return await query;
}

export async function getParticipantsByRole(role) {
  return await db
    .select()
    .from(participants)
    .where(eq(participants.role, role))
    .orderBy(asc(participants.number));
}

export async function updateParticipant(id, data) {
  const [participant] = await db.update(participants)
    .set(data)
    .where(eq(participants.id, id))
    .returning();
  return participant || null;
}

export async function deleteParticipant(id) {
  const result = await db.delete(participants).where(eq(participants.id, id));
  return (result.rowCount ?? 0) > 0;
}

