import { useQuery } from '@apollo/client/react';
import { GET_BOOKS } from '../../queries';
import FilterButtons from './FilterButtons';
import { useState } from 'react';
import { useApolloClient } from '@apollo/client/react';
const Books = () => {
  const client = useApolloClient();
  const [filter, setFilter] = useState('');
  const result = useQuery(GET_BOOKS, {
    variables: { genre: filter },
  });

  if (result.loading) {
    return <p>loading...............</p>;
  }

  const books = result.data.allBooks;
  const cachedBooks = client.readQuery({
    query: GET_BOOKS,
    variables: {
      genre: '',
    },
  });

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <FilterButtons books={cachedBooks.allBooks} setFilter={setFilter} />
    </div>
  );
};

export default Books;
