import type { FastifyReply, FastifyRequest } from 'fastify';
import * as linkService from '../services/linkService';

type LinkInput = {
  shortUrl: string;
};

type CreateLinkInput = LinkInput & {
  originalUrl: string;
};

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const link = await linkService.create(req.body as CreateLinkInput);
  reply.code(201).send(link);
}

export async function findAll(_req: FastifyRequest, reply: FastifyReply) {
  const links = await linkService.findAll();
  reply.send(links);
}

export async function findOne(req: FastifyRequest, reply: FastifyReply) {
  const { shortUrl } = req.params as LinkInput;
  const link = await linkService.findByShortUrl(shortUrl);
  if (!link) {
    reply.code(404).send({ message: 'Link not found' });
    return;
  }
  reply.send(link);
}

export async function remove(req: FastifyRequest, reply: FastifyReply) {
  const { shortUrl } = req.params as LinkInput;
  await linkService.remove(shortUrl);
  reply.code(204).send();
}

export async function hit(req: FastifyRequest, reply: FastifyReply) {
  const { shortUrl } = req.params as LinkInput;
  const link = await linkService.incrementHits(shortUrl);
  reply.send(link);
}

export async function exportCsv(_req: FastifyRequest, reply: FastifyReply) {
  const result = await linkService.exportLinks();
  reply.send(result);
}
