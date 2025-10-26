
import { desc, eq, sql } from 'drizzle-orm';
import { db } from '../config/db';
import { links } from '../db/schema';
import { exportLinksToCsv } from './csvExportService';

export async function findAll() {
  return db.select().from(links).orderBy(desc(links.createdAt));
}

type CreateLinkInput = {
  originalUrl: string;
  shortUrl: string;
};

export async function create(data: CreateLinkInput) {
  const exists = await db.select().from(links).where(eq(links.shortUrl, data.shortUrl));
  if (exists.length > 0) throw new Error('Short URL already exists');
  const result = await db.insert(links).values({
    originalUrl: data.originalUrl,
    shortUrl: data.shortUrl,
  }).returning();
  return result[0];
}

export async function findByShortUrl(shortUrl: string) {
  const result = await db.select().from(links).where(eq(links.shortUrl, shortUrl));
  return result[0];
}

export async function remove(shortUrl: string) {
  await db.delete(links).where(eq(links.shortUrl, shortUrl));
}


export async function incrementHits(shortUrl: string) {
  const result = await db.update(links)
    .set({ hits: sql`${links.hits} + 1` })
    .where(eq(links.shortUrl, shortUrl))
    .returning();
  return result[0];
}

export async function exportLinks() {
  const { filename, url } = await exportLinksToCsv();
  return { filename, url };
}
