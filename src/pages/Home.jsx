import { useEffect, useState } from "react";
import { getAllMovies } from "../api/movieService";
import movieCard from "../components/movieCard";
import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllMovies().then(setMovies);
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">
      <h1 className="page-title">🎬 Movies</h1>

      {/* SEARCH BAR */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="movie-grid">
        {filteredMovies.map(movie => (
          <movieCard key={movie.imdbId} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
