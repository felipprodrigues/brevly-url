import fastifyCors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import Fastify from 'fastify';

import { swaggerOptions } from './config/swagger';

import linkRoutes from './routes/linkRoutes';

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
  });
  app.register(rateLimit, { max: 100, timeWindow: '1 minute' });
  app.register(fastifySwagger, swaggerOptions);
  app.register(fastifySwaggerUI, { routePrefix: '/docs' });
  app.register(linkRoutes, { prefix: '/links' });

  app.get('/health', async (request, reply) => {
    request.log.info('Health check endpoint hit');
    reply.status(200).send({ status: 'ok' });
  });

  return app;
}
