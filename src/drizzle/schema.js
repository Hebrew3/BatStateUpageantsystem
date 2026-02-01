import { pgTable, serial, varchar, timestamp, integer, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('organizer'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const participants = pgTable('participants', {
  id: serial('id').primaryKey(),
  number: integer('number').notNull().unique(),
  fullname: varchar('fullname', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('MR'),
  note: text('note'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const scores = pgTable('scores', {
  id: serial('id').primaryKey(),
  participantId: integer('participant_id')
    .notNull()
    .references(() => participants.id),
  segmentId: integer('segment_id')
    .notNull()
    .references(() => segments.id),
  score: integer('score').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const segments = pgTable('segments', {
  id: serial('id').primaryKey(),
  event: varchar('event', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export default {
  users,
  participants,
  scores,
  segments,
};

