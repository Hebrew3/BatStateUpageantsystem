import { db } from '../drizzle/db.js';
import { segments } from '../drizzle/schema.js';
import { eq, asc, desc } from 'drizzle-orm';

export async function createSegment(segmentData) {
  const [segment] = await db.insert(segments).values(segmentData).returning();
  return segment;
}

export async function getSegmentById(id) {
  const [segment] = await db.select().from(segments).where(eq(segments.id, id));
  return segment || null;
}

export async function getAllSegments(options = {}) {
  const { orderByDesc = false } = options;

  let query = db.select().from(segments);

  if (orderByDesc) {
    query = query.orderBy(desc(segments.createdAt));
  } else {
    query = query.orderBy(asc(segments.createdAt));
  }

  return await query;
}

export async function getSegmentByEvent(event) {
  const [segment] = await db.select().from(segments).where(eq(segments.event, event));
  return segment || null;
}

export async function updateSegment(id, data) {
  const [segment] = await db.update(segments)
    .set(data)
    .where(eq(segments.id, id))
    .returning();
  return segment || null;
}

export async function deleteSegment(id) {
  const result = await db.delete(segments).where(eq(segments.id, id));
  return (result.rowCount ?? 0) > 0;
}

export default {
  createSegment,
  getSegmentById,
  getAllSegments,
  getSegmentByEvent,
  updateSegment,
  deleteSegment,
};

