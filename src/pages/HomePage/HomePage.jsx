import { useEffect, useState } from 'react';
import s from './HomePage.module.css';
import { fetchTrendingMovies } from '../../services/movie-api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const { results } = await fetchTrendingMovies();
      setMovies(results);
    };

    getMovies();
  }, []);
  return (
    <div className={s.mainWrapper}>
      <h1 className={s.title}>Trending Now</h1>
      <div className={s.listWrapper}>
        <ul className={s.list}>
          {movies.map(movie => {
            return (
              <li className={s.item} key={movie.id}>
                {movie.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
