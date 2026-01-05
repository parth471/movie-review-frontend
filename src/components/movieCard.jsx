import { useNavigate } from "react-router-dom";
import "./movieCard.css";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/movie/${movie.imdbId}`);
  };

  return (
    <div
      className="movie-card"
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${movie.title}`}
      onClick={goToDetails}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          goToDetails();
        }
      }}
    >
      <img src={movie.poster} alt={movie.title} />

      <div className="movie-card-info">
        <h3>{movie.title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;
