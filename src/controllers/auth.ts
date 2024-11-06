import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { SignInBody, SignUpBody } from '../types/auth';
import { comparePassword, hashPassword } from '../utils/bcrypt';
import { validateUser } from '../utils/user';
import { genAuthToken } from '../utils/genAuthToken';
import User from '../../db/models/user';
import { useError } from '../utils/useError';

export const signUp = async (
  fastify: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { email, firstName, lastName, password } = request.body as SignUpBody;

  const hashedPassword = await hashPassword(fastify, password);
  try {
    const userExits = await validateUser(email);
    if (userExits) {
      return useError(reply, 400, 'User already exists');
    }
    const user = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    reply.status(201).send({ token: genAuthToken(fastify, user) });
  } catch (error) {
    fastify.log.error(error);
    return useError(reply, 500, error as string);
  }
};

export const signIn = async (
  fastify: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { email, password } = request.body as SignInBody;

  try {
    const user = await validateUser(email);
    if (!user) {
      return useError(reply, 400, 'User not found');
    }
    const isPasswordValid = await comparePassword(
      password,
      user.password,
      fastify
    );
    if (!isPasswordValid) {
      return useError(reply, 400, 'Invalid password');
    }
    reply.status(200).send({ token: genAuthToken(fastify, user) });
  } catch (error) {
    fastify.log.error(error);
    return useError(reply, 500, error as string);
  }
};
