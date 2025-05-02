import { env } from '@/env';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import type { Link } from '@prisma/client';
import { prisma } from '../config/prisma';
import { r2 } from '../config/r2';

export async function exportLinksToCsv() {
  const links = await prisma.link.findMany();
  const csv = generateCsv(links);
  const filename = generateFileName();

  const upload = new PutObjectCommand({
    Bucket: env.CLOUDFLARE_BUCKET,
    Key: filename,
    Body: Buffer.from(csv),
    ContentType: 'text/csv',
  });

  await r2.send(upload);
  const url = `${env.CLOUDFLARE_PUBLIC_URL}/${filename}`;
  return { filename, url };
}
function generateCsv(links: Link[]) {
  const header = 'Original URL,Short URL,Hits,Created At\n';
  const rows = links
    .map((link) =>
      [
        link.originalUrl,
        link.shortUrl,
        link.hits,
        link.createdAt.toISOString(),
      ].join(',')
    )
    .join('\n');
  return header + rows;
}

function generateFileName() {
  return `links-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 10)}.csv`;
}
