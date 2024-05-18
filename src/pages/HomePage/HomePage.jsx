import MovieList from '../../components/MovieList/MovieList';
import s from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/movie-api';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/Error/ErrorMessage';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true)
        const { results } = await fetchTrendingMovies();
        setMovies(results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, []);
  return (
    <>
      <h1 className={s.title}>Trending Now</h1>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
