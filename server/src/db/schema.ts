import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: serial('id').primaryKey(),
  originalUrl: varchar('original_url', { length: 2048 }),
  shortUrl: varchar('short_url', { length: 255 }).unique(),
  hits: integer('hits').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});
