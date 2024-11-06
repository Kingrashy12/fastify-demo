import { FastifyInstance } from 'fastify';

export const hashPassword = (
  fastify: FastifyInstance,
  password: string
): Promise<string> => {
  return fastify.bcrypt.hash(password);
};

export const comparePassword = async (
  password: string,
  hash: string,
  fastify: FastifyInstance
): Promise<boolean> => {
  const ismatched = await fastify.bcrypt.compare(password, hash);
  return ismatched;
};
