import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../../services/movie-api';
import s from './MovieReviews.module.css';
import Loader from '../Loader/Loader';

const MovieReviews = () => {
  const { movieId } = useParams();

  const [review, setReview] = useState(null);

  useEffect(() => {
    try {
      const fetchMovieReviews = async () => {
        const data = await fetchReviews(movieId);

        setReview(data);
      };

      fetchMovieReviews();
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  if (!review) return <Loader />;

  return (
    <>
      <div className={s.container}>
        {review.results.length ? (
          <ul className={s.list}>
            {review.results.slice(0, 5).map(item => {
              return (
                <li className={s.item} key={item.id}>
                  <h4 className={s.name}>{item.author}</h4>
                  <p className={s.text}>{item.content}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <h4 className={s.oops}>Oops, no reviews here</h4>
        )}
      </div>
    </>
  );
};

export default MovieReviews;
