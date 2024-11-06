import { FastifyInstance } from 'fastify';
import { User } from '../types/user';

export const genAuthToken = (fastify: FastifyInstance, user: User) => {
  const token = fastify.jwt.sign({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  return token;
};
