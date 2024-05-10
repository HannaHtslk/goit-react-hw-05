import axios from 'axios';

const API_KEY = '9576f3677d599accae6f298fbbc21dc2';

const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(url);

  console.log(data);
  return data;
};
