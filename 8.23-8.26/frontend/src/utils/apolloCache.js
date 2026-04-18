import { GET_BOOKS } from '../../queries';
export const addBookToCache = (cache, bookToAdd) => {
  cache.updateQuery(
    { query: GET_BOOKS, variables: { genre: '' } },
    ({ allBooks }) => {
      const bookExist = allBooks.some((b) => {
        return b.id === bookToAdd.id;
      });
      if (bookExist) {
        return { allBooks };
      }
      return {
        allBooks: allBooks.concat(bookToAdd),
      };
    },
  );
};
