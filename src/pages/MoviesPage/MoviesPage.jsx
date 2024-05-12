import { useEffect, useState } from 'react';
import s from './MoviesPage.module.css';
import { IoIosSearch } from 'react-icons/io';
import { fetchMovieByQuery } from '../../services/movie-api';
import { Link, useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getMovieByQuery = async () => {
      try {
        const data = await fetchMovieByQuery(query);

        console.log(data);
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieByQuery();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;

    const queryWord = form.elements.query.value;

    if (queryWord.trim() === '') {
      alert('This field can not be empty!');
      return;
    }

    setQuery(queryWord);

    form.reset();
  };

  return (
    <div>
      <form className={s.wrapper} onSubmit={handleSubmit}>
        <div className={s.formWrapper}>
          <button className={s.btn}>
            <IoIosSearch className={s.icon} size="30" />
          </button>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            placeholder="Enter movie..."
            name="query"
          />
        </div>
      </form>
      <div>
        <ul>
          {movies.map(movie => {
            return (
              <li key={movie.id}>
                <Link className={s.link} to={`/movies/${movie.id.toString()}`}>
                  {movie.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MoviesPage;
