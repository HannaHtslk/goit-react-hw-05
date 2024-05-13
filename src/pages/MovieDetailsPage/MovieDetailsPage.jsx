import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { fetchMovieById } from '../../services/movie-api';
import s from './MovieDetailsPage.module.css';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Loader from '../../components/Loader/Loader';

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  const location = useLocation();
  const goBackRef = useRef(location.state || '/movies');

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

  if (!movie) return <Loader />;

  const year = movie.release_date.split('-')[0];

  return (
    <>
      <div className={s.container}>
        <Link className={s.goBack} to={goBackRef.current}>
          <IoIosArrowRoundBack className={s.icon} size="30" />
          back
        </Link>
        <div className={s.wrapper}>
          <img
            className={s.img}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className={s.content}>
            <div>
              <h1 className={s.title}>
                {movie.title} ({year})
              </h1>
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
        <nav className={s.navigation}>
          <NavLink className={s.link} to="cast">
            Cast
          </NavLink>
          <NavLink className={s.link} to="reviews">
            Reviews
          </NavLink>
        </nav>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default MovieDetailsPage;
