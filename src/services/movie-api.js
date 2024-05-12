import axios from 'axios';

const API_KEY = '9576f3677d599accae6f298fbbc21dc2';

const baseUrl = 'https://api.themoviedb.org/3';

const trendingUrl = `${baseUrl}/trending/movie/day?api_key=${API_KEY}`;

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(trendingUrl);

  return data;
};

export const fetchMovieById = async id => {
  const movieUrl = `${baseUrl}/movie/${id}?api_key=${API_KEY}`;
  const { data } = await axios.get(movieUrl);

  return data;
};

export const fetchCast = async id => {
  const castUrl = `${baseUrl}/movie/${id}/credits?api_key=${API_KEY}`;
  const { data } = await axios.get(castUrl);

  return data;
};

export const fetchReviews = async id => {
  const reviewUrl = `${baseUrl}/movie/${id}/reviews?api_key=${API_KEY}`;

  const { data } = await axios.get(reviewUrl);

  return data;
};

export const fetchMovieByQuery = async query => {
  const queryUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
  const { data } = await axios.get(queryUrl);

  return data.results;
};
