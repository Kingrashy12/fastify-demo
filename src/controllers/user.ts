import { FastifyReply, FastifyRequest } from 'fastify';
import User from '../../db/models/user';
import { useError } from '../utils/useError';

export const getUsers = async (reply: FastifyReply) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    reply.status(200).send(users);
  } catch (error) {
    return useError(reply, 500, error as string);
  }
};

export const getUser = async (reply: FastifyReply, request: FastifyRequest) => {
  const { userId } = request.params as { userId: number };

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      return useError(reply, 404, 'User not found');
    }
    reply.status(200).send(user);
  } catch (error) {
    return useError(reply, 500, error as string);
  }
};

export const updateUser = async (
  reply: FastifyReply,
  request: FastifyRequest
) => {
  const { userId } = request.params as { userId: number };
  const { body } = request;

  try {
    // Validate body
    if (!body || Object.keys(body).length === 0) {
      return useError(reply, 400, 'Update data required');
    }

    // Update user and get the updated count and user details
    const [updatedCount, updatedUsers] = await User.update(body, {
      where: { id: userId },
      returning: true,
    });

    if (updatedCount === 0) {
      return useError(reply, 404, 'User not found.');
    }

    // Exclude password from the response
    const updatedUser = updatedUsers[0].get({ plain: true });
    const { password, ...userWithoutPassword } = updatedUser;

    return reply.status(200).send(userWithoutPassword);
  } catch (error) {
    console.error((error as Error).message);
    return useError(reply, 500, error as string);
  }
};

export const deleteUser = async (
  reply: FastifyReply,
  request: FastifyRequest
) => {
  const { userId } = request.params as { userId: number };

  try {
    const deletedCount = await User.destroy({ where: { id: userId } });
    if (deletedCount === 0) {
      return useError(reply, 404, 'User not found.');
    }
    reply.status(200).send('User deleted successfully.');
  } catch (error) {
    console.error((error as Error).message);
    return useError(reply, 500, error as string);
  }
};
