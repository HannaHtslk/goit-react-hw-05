import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieById } from '../../services/movie-api';
import s from './MovieDetailsPage.module.css';

// const url = 'https://image.tmdb.org/t/p/';

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    try {
      const getMovieById = async () => {
        const data = await fetchMovieById(movieId);
        console.log(data);
        setMovie(data);
      };
      getMovieById();
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  if (!movie) return <h3>Loading...</h3>;

  return (
    <div className={s.container}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt=""
        width={200}
      />
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.vote_average}</p>
        <h2>Overview</h2>
        <p>{movie.overview}</p>
        <h3>Genres</h3>
        <p></p>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
