import { PostgresDb } from '@fastify/postgres';
import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    pg: PostgresDb & Record<string, PostgresDb>;
  }
}

export function queryClient(fastify: FastifyInstance): PostgresDb['query'] {
  return fastify.pg.query;
}
