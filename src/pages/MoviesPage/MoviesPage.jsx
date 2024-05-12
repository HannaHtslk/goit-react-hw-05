import { useEffect, useState } from 'react';
import s from './MoviesPage.module.css';
import { IoIosSearch } from 'react-icons/io';
import { fetchMovieByQuery } from '../../services/movie-api';
import { Link, useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovieByQuery = async () => {
      try {
        const queryWord = searchParams.get('query');

        if (!queryWord) return;
        const data = await fetchMovieByQuery(queryWord);
        console.log(data);
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieByQuery();
  }, [searchParams]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;

    const query = form.elements.title.value;

    if (query.trim() === '') {
      alert('This field can not be empty!');
      return;
    }

    setSearchParams({ query });

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
            name="title"
          />
        </div>
      </form>
      <div className={s.mainWrapper}>
        <div className={s.listWrapper}>
          <ul className={s.list}>
            {movies.map(movie => {
              return (
                <li key={movie.id}>
                  <Link
                    className={s.link}
                    to={`/movies/${movie.id.toString()}`}
                  >
                    {movie.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
