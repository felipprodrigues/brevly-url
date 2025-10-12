
import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { links } from "./src/schema/link";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const db = drizzle(pool);

async function seed() {
  await db.insert(links).values({
    originalUrl: "https://example.com",
    shortUrl: "exmpl",
    hits: 0,
    createdAt: new Date()
  });
  console.log("Seed data inserted!");
}

seed().then(() => process.exit(0));
