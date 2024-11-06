import { FastifyPluginAsync } from 'fastify';
import { signIn, signUp } from '../controllers/auth';
import { signInOpts, signUpOpts } from '../types/auth';

const auth: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post('/signup', signUpOpts, async (request, reply) => {
    return signUp(fastify, request, reply);
  });
  fastify.post('/signin', signInOpts, async (request, reply) => {
    return signIn(fastify, request, reply);
  });
};

export default auth;
