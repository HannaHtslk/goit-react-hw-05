import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <>
      <div className={s.mainWrapper}>
        <div className={s.listWrapper}>
          <ul className={s.list}>
            {movies.map(movie => {
              return (
                <li className={s.item} key={movie.id}>
                  <Link
                    className={s.link}
                    to={`/movies/${movie.id.toString()}`}
                    state={location}
                  >
                    {movie.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MovieList;
