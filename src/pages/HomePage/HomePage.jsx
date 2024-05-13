import MovieList from '../../components/MovieList/MovieList';
import s from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/movie-api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      const getMovies = async () => {
        const { results } = await fetchTrendingMovies();
        setMovies(results);
      };

      getMovies();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <h1 className={s.title}>Trending Now</h1>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;
