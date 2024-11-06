import { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { message: 'Hello Fest' };
  });
};

export default root;
