import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById, updateMovie } from "../../movieService";
import type { Movie } from "../../movieService";
import PageLayout from "../organisms/PageLayout";
import BackLink from "../atoms/BackLink";
import MovieForm from "../organisms/MovieForm";
import ErrorText from "../atoms/ErrorText";

type MovieFormValues = Omit<Movie, "id">;

const MovieEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<MovieFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (!id) {
          setError("Keine ID gefunden");
          return;
        }

        const movie = await getMovieById(Number(id));

        setInitialValues({
          title: movie.title,
          releaseDate: movie.releaseDate,
          mpaaRating: movie.mpaaRating,
          runningTimeMin: movie.runningTimeMin,
          majorGenre: movie.majorGenre,
          director: movie.director,
          distributor: movie.distributor,
          imdbRating: movie.imdbRating,
          rottenTomatoesRating: movie.rottenTomatoesRating,
          posterUrl: movie.posterUrl,
        });
      } catch {
        setError("Fehler beim Laden des Movies");
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (values: MovieFormValues) => {
    try {
      setError(null);

      if (!id) {
        setError("Keine ID gefunden");
        return;
      }

      await updateMovie(Number(id), values);
      navigate(`/movies/${id}`);
    } catch {
      setError("Fehler beim Speichern");
    }
  };

  if (error) return <ErrorText>{error}</ErrorText>;
  if (!initialValues) return <div>Lädt...</div>;

  return (
    <PageLayout maxWidth="700px">
      <BackLink to={`/movies/${id}`}>← Zurück</BackLink>
      <h2>Movie bearbeiten</h2>

      <MovieForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitButtonText="Speichern"
      />
    </PageLayout>
  );
};

export default MovieEditPage;