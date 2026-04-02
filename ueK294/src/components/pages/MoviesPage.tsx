import { useEffect, useState } from "react";
import { getMovies } from "../../movieService";
import type { Movie } from "../../movieService";
import PageLayout from "../organisms/PageLayout";
import PageHeader from "../organisms/PageHeader";
import MovieCard from "../organisms/MovieCard";
import ErrorText from "../atoms/ErrorText";

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
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <PageLayout maxWidth="800px">
      <PageHeader title="Movies" showCreateButton />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </PageLayout>
  );
};

export default MoviesPage;