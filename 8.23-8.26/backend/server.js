const cors = require('cors');
const express = require('express');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { useServer } = require('graphql-ws/use/ws');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const getUserFromAuthHeader = require('./utils/utils');
const { batchBookCounts } = require('./utils/loaders');
const DataLoader = require('dataloader');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');

const startServer = async (port) => {
  const app = express();
  const httpServer = createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  });
  const serverCleanup = useServer({ schema }, wsServer);
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();
  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization;
        const currentUser = await getUserFromAuthHeader(auth);
        return {
          currentUser,
          bookCountLoader: new DataLoader(batchBookCounts),
        };
      },
    }),
  );
  httpServer.listen(port, () =>
    console.log(`Server ready at http://localhost:${port}`),
  );
};

module.exports = startServer;
