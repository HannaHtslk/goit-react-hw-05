import { useEffect, useState } from 'react';
import s from './MoviesPage.module.css';
import { IoIosSearch } from 'react-icons/io';
import { fetchMovieByQuery } from '../../services/movie-api';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/Error/ErrorMessage';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovieByQuery = async () => {
      try {
        setIsLoading(true);
        const queryWord = searchParams.get('query');

        if (!queryWord) return;
        const data = await fetchMovieByQuery(queryWord);

        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieByQuery();
  }, [searchParams]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;

    const query = form.elements.title.value;

    if (query.trim() === '') {
      toast.error('This field can not be empty!');
      return;
    }

    setSearchParams({ query });

    form.reset();
  };
  if (!movies) return <Loader />;

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
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
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
