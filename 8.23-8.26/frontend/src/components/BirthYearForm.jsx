import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { EDIT_AUTHOR } from '../../mutations';
import { GET_AUTHORS } from '../../queries';
import Select from 'react-select';
const BirthYearForm = () => {
  const [editBornYear] = useMutation(EDIT_AUTHOR);
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const result = useQuery(GET_AUTHORS);
  if (result.loading) {
    return <p>loading.......</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editBornYear({ variables: { name: name.value, setBornTo: Number(born) } });
    setName('');
    setBorn('');
  };
  const options = result.data.allAuthors.map((a) => {
    return { value: a.name, label: a.name };
  });
  return (
    <>
      <h2>Edit BornYear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Select
            options={options}
            value={name}
            onChange={setName}
            placeholder='Select an author...'
          />
        </div>
        <div>
          <label htmlFor='born'>born</label>
          <input
            type='text'
            name='born'
            id='born'
            value={born}
            onChange={({ target }) => {
              setBorn(target.value);
            }}
          />
        </div>
        <button type='submit'>edit</button>
      </form>
    </>
  );
};
export default BirthYearForm;
