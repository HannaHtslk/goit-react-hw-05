import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../../services/movie-api';
import s from './MovieReviews.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../Error/ErrorMessage';
import { FallingLines } from 'react-loader-spinner';

const MovieReviews = () => {
  const { movieId } = useParams();

  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        setIsLoading(true);
        const data = await fetchReviews(movieId);

        setReview(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  //if (isLoading) return <Loader />;
  return (
    <>
      <div className={s.container}>
        {error && <ErrorMessage />}
        {isLoading && (
          <FallingLines
            color="blue"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        )}
        {!!review.length && (
          <ul className={s.list}>
            {review?.slice(0, 5).map(item => {
              return (
                <li className={s.item} key={item.id}>
                  <h4 className={s.name}>{item.author}</h4>
                  <p className={s.text}>{item.content}</p>
                </li>
              );
            })}
          </ul>
        )}

        {!isLoading && !review.length && (
          <h4 className={s.oops}>Oops, no reviews here</h4>
        )}
      </div>
    </>
  );
};

export default MovieReviews;
