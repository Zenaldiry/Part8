import { GET_BOOKS, ME } from '../../queries';
import { useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';
const Recommended = ({ user }) => {
  const meResult = useQuery(ME);
  const navigate = useNavigate();
  const booksResult = useQuery(GET_BOOKS, {
    variables: { genre: meResult.data?.me.favoriteGenre },
    skip: !meResult.data?.me,
  });
  if (meResult.loading || booksResult.loading) {
    return <div>loading................</div>;
  }

  if (!user) {
    navigate('/books');
    return <div>please login to see this page</div>;
  }

  const books = booksResult.data?.allBooks || [];
  return (
    <div>
      <div>your favorite genre is: {meResult.data.me.favoriteGenre}</div>
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
    </div>
  );
};
export default Recommended;
