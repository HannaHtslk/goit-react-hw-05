import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from '../../services/movie-api';
import s from './MovieCast.module.css';
import Loader from '../Loader/Loader';

const MovieCast = () => {
  const { movieId } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    try {
      const getCastInfo = async () => {
        const data = await fetchCast(movieId);

        setTeam(data);
      };

      getCastInfo();
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  if (!team) {
    return <Loader />;
  }

  return (
    <>
      <div className={s.wrapper}>
        <ul className={s.list}>
          {team.cast.slice(0, 5).map(member => {
            return (
              <li className={s.item} key={member.id}>
                <img
                  className={s.img}
                  src={`https://image.tmdb.org/t/p/w92${member.profile_path}`}
                  alt={member.name}
                />
                <h4 className={s.name}>{member.name}</h4>
                <p className={s.char}>{member.character}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default MovieCast;
