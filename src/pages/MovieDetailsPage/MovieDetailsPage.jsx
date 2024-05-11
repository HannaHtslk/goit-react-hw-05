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
      <div className={s.wrapper}>
        <img
          className={s.img}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
          width={260}
        />
        <div className={s.content}>
          <div>
            <h1 className={s.title}>{movie.title}</h1>
            <p className={s.text}>
              Rating: {Math.round(movie.vote_average)}/10
            </p>
          </div>
          <div>
            <h2 className={s.subTitle}>Overview</h2>
            <p className={s.text}>{movie.overview}</p>
          </div>
          <div>
            <h3 className={s.genreTitle}>Genres</h3>
            <ul className={s.list}>
              {movie.genres.map(genre => {
                return (
                  <li className={s.item} key={genre.id}>
                    {genre.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
