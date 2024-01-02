const { User } = require('../models');
const { TEMP } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async () => {
      if (context.user) {
        return User.findOne({_id: context.user._id})
      }
    },
  },
  Mutation: {
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

module.exports = resolvers;

//This needs to be refactored proper. Use framework, trash the rest.
