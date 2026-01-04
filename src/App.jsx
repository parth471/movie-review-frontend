import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import MovieDetails from "./pages/movieDetails";

/* Scroll to top on route change (mobile-friendly) */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:imdbId" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
