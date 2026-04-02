import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteMovie, getMovieById } from "../../MovieService";
import type { Movie } from "../../MovieService";
import BackLink from "../Atoms/BackLink";
import Button from "../Atoms/Button";
import ErrorText from "../Atoms/ErrorText";
import MovieInfo from "../Molecules/MovieInfo";
import PageLayout from "../Organisms/PageLayout";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      } catch {
        setError("Fehler beim Laden des Movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;

    const confirmed = window.confirm(`Möchten Sie "${movie?.title}" wirklich löschen?`);
    if (!confirmed) return;

    try {
      await deleteMovie(Number(id));
      navigate("/movies");
    } catch {
      setError("Fehler beim Löschen des Movies");
    }
  };

  if (loading) return <div>Lädt...</div>;
  if (error) return <ErrorText>{error}</ErrorText>;
  if (!movie) return <div>Movie nicht gefunden</div>;

  return (
    <PageLayout>
      <BackLink to="/movies">← Zurück zur Liste</BackLink>

      <h2>{movie.title}</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <img
          src={movie.posterUrl}
          alt={movie.title}
          style={{ width: "250px", borderRadius: "8px" }}
        />

        <div>
          <MovieInfo label="ID" value={movie.id} />
          <MovieInfo label="Release Date" value={movie.releaseDate} />
          <MovieInfo label="Genre" value={movie.majorGenre} />
          <MovieInfo label="MPAA Rating" value={movie.mpaaRating} />
          <MovieInfo label="Running Time" value={`${movie.runningTimeMin} min`} />
          <MovieInfo label="Director" value={movie.director} />
          <MovieInfo label="Distributor" value={movie.distributor} />
          <MovieInfo label="IMDB Rating" value={movie.imdbRating} />
          <MovieInfo label="Rotten Tomatoes" value={`${movie.rottenTomatoesRating}%`} />

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <Link to={`/movies/${movie.id}/edit`}>
              <Button variant="secondary">Bearbeiten</Button>
            </Link>
            <Button onClick={handleDelete} variant="danger">
              Löschen
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MovieDetailPage;
