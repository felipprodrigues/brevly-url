import type { FastifyInstance } from 'fastify';
import * as linkController from '../controllers/linkController';
import { linkSchema } from '../schemas/linkSchemas';

export default async function linkRoutes(app: FastifyInstance) {
  app.post('/', { schema: linkSchema }, linkController.create);
  app.get('/', linkController.findAll);
  app.get('/:shortUrl', linkController.findOne);
  app.delete('/:shortUrl', linkController.remove);
  app.post('/:shortUrl/hit', linkController.hit);
  app.post('/export', linkController.exportCsv);
}
