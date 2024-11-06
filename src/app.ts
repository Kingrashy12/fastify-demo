import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import fastifyPostgres from '@fastify/postgres';
import { dbConfig } from './utils/key';
import fastifyBcrypt from 'fastify-bcrypt';
import fastifyJwt from '@fastify/jwt';

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  void fastify.register(fastifyPostgres, {
    database: dbConfig.database,
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  });

  void fastify.register(fastifyBcrypt, {
    saltWorkFactor: 12,
  });

  void fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string,
  });
};

export default app;
export { app, options };
