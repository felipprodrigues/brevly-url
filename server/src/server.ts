import { buildApp } from './app';


import { env } from './env';

const app = buildApp();

app.listen({ port: env.PORT, host: env.HOST }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running at ${address}`);
});
