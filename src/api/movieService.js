import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/movies";

export const getAllMovies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
