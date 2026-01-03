const BASE_URL = "https://movie-review-backend-1r30.onrender.com";

export const getAllMovies = async () => {
  const res = await fetch(`${BASE_URL}/api/v1/movies`);
  return res.json();
};
