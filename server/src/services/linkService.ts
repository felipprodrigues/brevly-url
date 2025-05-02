import { prisma } from '../config/prisma';
import { exportLinksToCsv } from './csvExportService';

type CreateLinkInput = {
  originalUrl: string;
  shortUrl: string;
};

export async function create(data: CreateLinkInput) {
  const exists = await prisma.link.findUnique({
    where: { shortUrl: data.shortUrl },
  });
  if (exists) throw new Error('Short URL already exists');

  return prisma.link.create({ data });
}

export async function findAll() {
  return prisma.link.findMany();
}

export async function findByShortUrl(shortUrl: string) {
  return prisma.link.findUnique({ where: { shortUrl } });
}

export async function remove(shortUrl: string) {
  await prisma.link.delete({ where: { shortUrl } });
}

export async function incrementHits(shortUrl: string) {
  return prisma.link.update({
    where: { shortUrl },
    data: { hits: { increment: 1 } },
  });
}

export async function exportLinks() {
  const { filename, url } = await exportLinksToCsv();
  return { filename, url };
}
