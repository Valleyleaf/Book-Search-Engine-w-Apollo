const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = { 
  AuthenticationError: new GraphQLError('Unauthenticated user detected. Access Denied.', {

    extensions: {
      code: 'UNAUTHENTICATED',
    },

  }),

  authMiddleware: function ({req}) {
    console.log('authMiddleware function HIT')
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      return req;
    }
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    return req;
  },

  signToken: function ({ username, email, _id }) {
    console.log('signToken function HIT')
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

};

//This is not confirmed to be working yet. Need to fix Front-End so I can test properly.