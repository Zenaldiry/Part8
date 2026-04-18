const FilterButtons = ({ books, setFilter }) => {
  const genres = new Set();
  [...books].forEach((b) => {
    b.genres.forEach((genre) => genres.add(genre));
  });
  const genresArr = Array.from(genres);
  return (
    <div>
      {genresArr.map((g) => {
        return (
          <button
            onClick={() => {
              setFilter(g);
            }}
            key={g}
          >
            {g}
          </button>
        );
      })}
      <button
        onClick={() => {
          setFilter('');
        }}
      >
        all
      </button>
    </div>
  );
};
export default FilterButtons;
