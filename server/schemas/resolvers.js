const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    findUser: async (parent, args, context) => {
      return await User.findOne({ _id: context.user._id });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
  
        return { token, user };
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user with this email found!');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }
  
        const token = signToken(user);
        return { token, user };
    },
    saveBook: async (parent, args, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: args } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },
    deleteBook: async (parent, {bookId}, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new AuthenticationError('Invalid token! or unknown Id?');
      }
      return updatedUser;
    }
  },
};

module.exports = resolvers;