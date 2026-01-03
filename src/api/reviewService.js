import axios from "axios";

const REVIEW_API = "http://localhost:8080/api/v1/reviews";

export const addReview = async (reviewBody, imdbId) => {
  const response = await axios.post(REVIEW_API, {
    reviewBody,
    imdbId
  });
  return response.data;
};
