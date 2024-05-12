import MovieList from '../../components/MovieList/MovieList';
import s from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <h1 className={s.title}>Trending Now</h1>
      <MovieList />
    </>
  );
};

export default HomePage;
