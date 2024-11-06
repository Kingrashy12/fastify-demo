import { FastifyReply } from 'fastify';

export const useError = (
  reply: FastifyReply,
  statusCode: number,
  message: string
) => {
  reply.status(statusCode).send(message);
};
