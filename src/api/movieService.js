import axios from "axios";

const API_URL = "https://movie-review-backend-1r30.onrender.com/api/v1/movies";

export const getAllMovies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
