import { useEffect, useState } from "react";
import { getMovies } from "./movieService";
import type { Movie } from "./movieService";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getMovies();
        setMovies(data);
      } catch (err: any) {
        setError("Fehler beim Laden der Movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div>Lädt...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h2>Movies</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              width: "200px",
            }}
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "4px" }}
            />
            <h3>{movie.title}</h3>
            <p>{movie.majorGenre}</p>
            <p>{movie.releaseDate}</p>
            <p>IMDB: {movie.imdbRating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;