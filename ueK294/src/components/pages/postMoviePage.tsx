import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../../movieService";
import type { Movie } from "../../movieService";
import PageLayout from "../organisms/PageLayout";
import BackLink from "../atoms/BackLink";
import MovieForm from "../organisms/MovieForm";
import ErrorText from "../atoms/ErrorText";

type MovieFormValues = Omit<Movie, "id">;

const MovieCreatePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const initialValues: MovieFormValues = {
    title: "",
    releaseDate: "",
    mpaaRating: "",
    runningTimeMin: 0,
    majorGenre: "",
    director: "",
    distributor: "",
    imdbRating: 0,
    rottenTomatoesRating: 0,
    posterUrl: "",
  };

  const handleSubmit = async (values: MovieFormValues) => {
    try {
      setError(null);
      const created = await createMovie(values);
      navigate(`/movies/${created.id}`);
    } catch {
      setError("Fehler beim Erstellen des Movies");
    }
  };

  return (
    <PageLayout maxWidth="700px">
      <BackLink to="/movies">← Zurück zur Liste</BackLink>
      <h2>Neuen Movie erstellen</h2>

      {error && <ErrorText>{error}</ErrorText>}

      <MovieForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitButtonText="Erstellen"
      />
    </PageLayout>
  );
};

export default MovieCreatePage;