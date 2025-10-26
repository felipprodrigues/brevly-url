import { sql } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: text('id').primaryKey().notNull().default(sql`gen_random_uuid()`),
  originalUrl: text('original_url').notNull(),
  shortUrl: text('short_url').notNull(),
  hits: integer('hits').default(0).notNull(),
  createdAt: timestamp('created_at', { precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});
