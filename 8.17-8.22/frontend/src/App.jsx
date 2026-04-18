import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import NewBook from './components/NewBook';
import { Routes, Route, Link } from 'react-router-dom';
import Recommended from './components/Recommended';
import { useState } from 'react';
import { useApolloClient } from '@apollo/client/react';
const App = () => {
  const [user, setUser] = useState(localStorage.getItem('user-token'));
  const client = useApolloClient();
  return (
    <div>
      <nav>
        <Link to='/authors'>
          <button>authors</button>
        </Link>
        <Link to='/books'>
          <button>books</button>
        </Link>
        {user && (
          <Link to='/newbook'>
            <button>newBook</button>
          </Link>
        )}
        {!user && (
          <Link to='/login'>
            <button>login</button>
          </Link>
        )}
        {user && (
          <button
            onClick={() => {
              setUser('');
              localStorage.clear();
              client.resetStore();
            }}
          >
            logout
          </button>
        )}
        {user && (
          <Link to='/recommended'>
            <button>recommended</button>
          </Link>
        )}
      </nav>
      <Routes>
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/newbook' element={<NewBook user={user} />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/recommended' element={<Recommended user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
