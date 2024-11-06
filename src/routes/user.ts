import { FastifyPluginAsync } from 'fastify';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/user';

export const user: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/users', async (request, reply) => getUsers(reply));
  fastify.get('/users/:userId', async (request, reply) =>
    getUser(reply, request)
  );
  fastify.patch('/users/:userId/update', async (request, reply) =>
    updateUser(reply, request)
  );
  fastify.delete('/users/:userId/delete', async (request, reply) =>
    deleteUser(reply, request)
  );
};

export default user;
