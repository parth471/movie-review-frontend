import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./movieDetails.css";

function MovieDetails() {
  const { imdbId } = useParams();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  // 🔹 Convert YouTube URL to embed URL
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // 🔹 Load movie details
  useEffect(() => {
    axios
      .get(`https://movie-review-backend-1r30.onrender.com/api/v1/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch(() => console.error("Failed to load movie"));
  }, [id]);

  // 🔹 Load reviews AFTER movie is loaded
  useEffect(() => {
    if (!movie?.imdbId) return;
    fetchReviews(movie.imdbId);
  }, [movie]);

  // 🔹 Fetch reviews by imdbId
  const fetchReviews = async (imdbId) => {
    try {
      const res = await fetch(
        `https://movie-review-backend-1r30.onrender.com/api/v1/reviews/${imdbId}`
      );
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Failed to load reviews");
    }
  };

  // 🔹 Submit review (optimistic UI)
  const submitReview = async () => {
    if (!reviewText.trim()) return;

    const newReview = {
      body: reviewText,
      createdAt: new Date().toISOString()
    };

    // 1️⃣ Update UI instantly
    setReviews((prev) => [newReview, ...prev]);

    // 2️⃣ Clear textarea
    setReviewText("");

    // 3️⃣ Save to backend
    try {
      await fetch("https://movie-review-backend-1r30.onrender.com/api/v1/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reviewBody: newReview.body,
          imdbId: movie.imdbId
        })
      });
    } catch {
      console.error("Review save failed");
    }
  };

  if (!movie) return <div style={{ color: "white" }}>Loading...</div>;

  return (
    <div className="movie-page">

      {/* HERO SECTION */}
      <div className="movie-hero">

        <div className="media-row">
          {/* Poster */}
          <img
            src={movie.poster}
            alt={movie.title}
            className="movie-poster"
          />

          {/* Trailer */}
          <div className="trailer-box">
            <iframe
              src={getYoutubeEmbedUrl(movie.trailerLink)}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Movie Info */}
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p className="release-date">{movie.releaseDate}</p>

          <div className="genres">
            {movie.genres.map((g, i) => (
              <span key={i}>{g}</span>
            ))}
          </div>
        </div>
      </div>

      {/* REVIEW SECTION */}
      <div className="review-section">
        <h2>Add a Review</h2>

        <textarea
          placeholder="Write your thoughts..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <button onClick={submitReview}>Submit Review</button>

        <div className="review-list">
          {reviews.length === 0 && (
            <p style={{ opacity: 0.7 }}>No reviews yet</p>
          )}

          {reviews.map((review, index) => (
            <div
              className="review-card"
              key={review.id || review._id || `${index}-${review.body}`}
            >
              <p>{review.body}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default MovieDetails;
