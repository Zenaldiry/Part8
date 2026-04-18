const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const getUserFromAuthHeader = require('./utils/utils');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = (port) => {
  startStandaloneServer(server, {
    listen: { port: port },
    context: async ({ req }) => {
      const auth = req.headers.authorization;
      const currentUser = await getUserFromAuthHeader(auth);
      return { currentUser };
    },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

module.exports = startServer;
