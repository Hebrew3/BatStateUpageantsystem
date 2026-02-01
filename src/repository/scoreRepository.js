import { db } from '../drizzle/db.js';
import { scores } from '../drizzle/schema.js';
import { eq, asc, desc, and } from 'drizzle-orm';

export default async function createScore(scoreData) {
  const [score] = await db.insert(scores).values(scoreData).returning();
  return score;
}

export default async function getScoreById(id) {
  const [score] = await db.select().from(scores).where(eq(scores.id, id));
  return score || null;
}

export default async function getAllScores(options = {}) {
  const { orderByDesc = false } = options;
  
  let query = db.select().from(scores);
  
  if (orderByDesc) {
    query = query.orderBy(desc(scores.createdAt));
  } else {
    query = query.orderBy(asc(scores.createdAt));
  }
  
  return await query;
}

export default async function getScoresByParticipantId(participantId) {
  return await db
    .select()
    .from(scores)
    .where(eq(scores.participantId, participantId))
    .orderBy(asc(scores.segmentId));
}

export default async function getScoresBySegmentId(segmentId) {
  return await db
    .select()
    .from(scores)
    .where(eq(scores.segmentId, segmentId))
    .orderBy(asc(scores.participantId));
}

export default async function getScoreByParticipantAndSegment(participantId, segmentId) {
  const [score] = await db
    .select()
    .from(scores)
    .where(and(
      eq(scores.participantId, participantId),
      eq(scores.segmentId, segmentId)
    ));
  return score || null;
}

export default async function updateScore(id, data) {
  const [score] = await db.update(scores)
    .set(data)
    .where(eq(scores.id, id))    .returning();
  return score || null;
}

export default async function upsertScore(participantId, segmentId, score) {
  const [result] = await db.insert(scores)
    .values({ participantId, segmentId, score })
    .onConflictDoUpdate({
      target: [scores.participantId, scores.segmentId],
      set: { score },
    })
    .returning();
  return result;
}

export default async function deleteScore(id) {
  const result = await db.delete(scores).where(eq(scores.id, id));
  return (result.rowCount ?? 0) > 0;
}

export default async function deleteScoresByParticipantId(participantId) {
  const result = await db.delete(scores).where(eq(scores.participantId, participantId));
  return result.rowCount ?? 0;
}

export default async function deleteScoresBySegmentId(segmentId) {
  const result = await db.delete(scores).where(eq(scores.segmentId, segmentId));
  return result.rowCount ?? 0;
}

