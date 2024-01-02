const { User } = require('../models');
const { signToken, AuthenticationError, authMiddleware } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({_id: context.user._id})
      }
    },
  },
  Mutation: {
    addUser: async (_, {username, email, password}) => {
      const user = await User.create({username, email, password});
      const token = signToken(user);

      console.log('Added user is:', user);

      return {token, user};
      //Ensure above works. Mutations are weird. As their name implies
    },
    
    //login function here
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw  AuthenticationError('Incorrect email');
      }
      const correctPw = await user.isCorrectPassword(password);
      console.log('Correct password:', password);
      if (!correctPw) {
        throw  AuthenticationError('Incorrect password');
      }
      const token = signToken(user);
      return { token, user };
    },

    //savebook function here
    saveBook: async (_, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: input } },
          { new: true }
        ).populate('savedBooks');
        return updatedUser;
      }
      throw AuthenticationError('Not logged in');
    },

    //remove book function here
    removeBook: async (_, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: input } },
          { new: true }
        ).populate('savedBooks');
        return updatedUser;
      }
      throw AuthenticationError('Not logged in');
    },

  },
};

module.exports = resolvers;

//This needs to be refactored proper. Use framework, trash the rest.
