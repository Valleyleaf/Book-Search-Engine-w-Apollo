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

      console.log('Logged in user is:', user);

      return {token, user};
      //Ensure above works. Mutations are weird. As their name implies
    },
    
    //login function here

    //savebook function here

    //remove book function here

  },
};

module.exports = resolvers;

//This needs to be refactored proper. Use framework, trash the rest.
