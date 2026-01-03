import axios from "axios";

const REVIEW_API = "https://movie-review-backend-1r30.onrender.com/api/v1/reviews";

export const addReview = async (reviewBody, imdbId) => {
  const response = await axios.post(REVIEW_API, {
    reviewBody,
    imdbId
  });
  return response.data;
};
