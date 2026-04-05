import User from '../model/index.js';

export const createUser = async (data) => {
  return await User.create(data);
};

export const getUserByid = async (id) => {
  return await User.findById(id).lean();
};
export const getUserByMobile = async (mobile) => {
  return await User.findOne({ mobile
  }).lean();
};

