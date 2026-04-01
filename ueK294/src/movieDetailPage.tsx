// src/pages/MovieDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById } from "./movieService";
import type { Movie } from "./movieService";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);

        if (!id) {
          setError("Keine ID gefunden");
          return;
        }

        const data = await getMovieById(Number(id));
        setMovie(data);
      } catch (err) {
        setError("Fehler beim Laden des Movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Lädt...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!movie) return <div>Movie nicht gefunden</div>;

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto" }}>
      <Link to="/movies">← Zurück zur Liste</Link>

      <h2>{movie.title}</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <img
          src={movie.posterUrl}
          alt={movie.title}
          style={{ width: "250px", borderRadius: "8px" }}
        />

        <div>
          <p>
            <strong>Release Date:</strong> {movie.releaseDate}
          </p>
          <p>
            <strong>Genre:</strong> {movie.majorGenre}
          </p>
          <p>
            <strong>MPAA Rating:</strong> {movie.mpaaRating}
          </p>
          <p>
            <strong>Running Time:</strong> {movie.runningTimeMin} min
          </p>
          <p>
            <strong>Director:</strong> {movie.director}
          </p>
          <p>
            <strong>Distributor:</strong> {movie.distributor}
          </p>
          <p>
            <strong>IMDB Rating:</strong> {movie.imdbRating}
          </p>
          <p>
            <strong>Rotten Tomatoes:</strong> {movie.rottenTomatoesRating}%
          </p>

          <div style={{ marginTop: "20px" }}>
            <Link to={`/movies/${movie.id}/edit`}>
              <button>Bearbeiten</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;