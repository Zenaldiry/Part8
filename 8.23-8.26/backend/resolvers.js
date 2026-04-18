const jwt = require('jsonwebtoken');
const Book = require('./models/book');
const User = require('./models/user');
const Author = require('./models/author');
const { GraphQLError } = require('graphql/error');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const resolvers = {
  Author: {
    bookCount: async (root, _, context) =>
      context.bookCountLoader.load(root._id),
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      const filter = {};
      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) return [];
        filter.author = author._id;
      }
      const result = await Book.find(filter).populate('author');

      return result;
    },
    allAuthors: async () => Author.find({}),
    me: (_root, _args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    addBook: async (_, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('unauthorized', {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }
      const book = { ...args };
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        try {
          author = new Author({
            name: args.author,
          });
          await author.save();
        } catch (error) {
          throw new GraphQLError(`Saving author failed: ${error.message}`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
            },
          });
        }
      }
      try {
        const newBook = new Book({ ...book, author: author._id });
        const addedbook = await newBook.save();
        pubsub.publish('BOOK_ADDED', {
          bookAdded: addedbook.populate('author'),
        });
        return newBook.populate('author');
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
          },
        });
      }
    },
    editAuthor: async (_, args, context) => {
      const { name, setBornTo } = args;
      if (!context.currentUser) {
        throw new GraphQLError('unauthorized', {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }
      const author = await Author.findOne({ name });
      if (!author) {
        return null;
      }
      author.born = setBornTo;
      return await author.save();
    },
    createUser: async (_, args) => {
      const { username, favoriteGenre } = args;
      const user = new User({
        username,
        favoriteGenre,
      });
      try {
        return await user.save();
      } catch (error) {
        throw new GraphQLError(`error happened ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
          },
        });
      }
    },
    login: async (_, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });
      if (!user) {
        throw new GraphQLError('user not found, please create an account', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
          },
        });
      }
      if (password !== 'secret') {
        throw new GraphQLError('password not correct', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.password,
          },
        });
      }
      const token = jwt.sign(
        { name: user.username, id: user.id },
        process.env.JWT_SECRET,
      );
      return { value: token };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => {
        return pubsub.asyncIterableIterator(['BOOK_ADDED']);
      },
    },
  },
};
module.exports = resolvers;
