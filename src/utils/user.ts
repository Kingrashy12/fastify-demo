import User from '../../db/models/user';

export const validateUser = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  return user;
};
