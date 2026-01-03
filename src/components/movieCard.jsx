function MovieCard({ movie }) {
  return (
    <div style={{
      color: "white",
      border: "1px solid red",
      padding: "10px"
    }}>
      {movie.title}
    </div>
  );
}

export default MovieCard;
