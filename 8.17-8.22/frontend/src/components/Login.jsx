import { useState } from 'react';
import { LOGIN } from '../../mutations';
import { useMutation } from '@apollo/client/react';
const Login = ({ setUser }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem('user-token', data.login.value);
      setUser(data.login.value);
    },
  });
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(password);
    console.log(name);
    login({ variables: { username: name, password: password } });
    setName('');
    setPassword('');
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>username</label>
          <input
            type='text'
            name='username'
            id='username'
            value={name}
            onChange={({ target }) => {
              setName(target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};
export default Login;
