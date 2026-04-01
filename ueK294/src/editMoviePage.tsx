// MovieEditPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { getMovieById, updateMovie } from "./movieService";
import type { Movie } from "./movieService";

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

  const validate = (values: MovieFormValues) => {
    const errors: Partial<Record<keyof MovieFormValues, string>> = {};

    if (!values.title) errors.title = "Titel ist erforderlich";
    if (!values.releaseDate) errors.releaseDate = "Release Date ist erforderlich";
    if (!values.mpaaRating) errors.mpaaRating = "MPAA Rating ist erforderlich";
    if (!values.majorGenre) errors.majorGenre = "Genre ist erforderlich";
    if (!values.director) errors.director = "Director ist erforderlich";
    if (!values.distributor) errors.distributor = "Distributor ist erforderlich";
    if (!values.posterUrl) errors.posterUrl = "Poster URL ist erforderlich";

    if (!values.runningTimeMin || values.runningTimeMin <= 0)
      errors.runningTimeMin = "Running Time muss > 0 sein";

    if (values.imdbRating < 0 || values.imdbRating > 10)
      errors.imdbRating = "IMDB Rating muss zwischen 0 und 10 sein";

    if (values.rottenTomatoesRating < 0 || values.rottenTomatoesRating > 100)
      errors.rottenTomatoesRating = "Rotten Tomatoes muss zwischen 0 und 100 sein";

    return errors;
  };

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

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!initialValues) return <div>Lädt...</div>;

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto" }}>
      <Link to={`/movies/${id}`}>← Zurück</Link>
      <h2>Movie bearbeiten</h2>

      <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit} enableReinitialize>
        {({ errors, touched }) => (
          <Form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div>
              <label>Titel</label>
              <Field name="title" />
              {errors.title && touched.title && <div style={{ color: "red" }}>{errors.title}</div>}
            </div>

            <div>
              <label>Release Date</label>
              <Field name="releaseDate" />
              {errors.releaseDate && touched.releaseDate && (
                <div style={{ color: "red" }}>{errors.releaseDate}</div>
              )}
            </div>

            <div>
              <label>MPAA Rating</label>
              <Field name="mpaaRating" />
              {errors.mpaaRating && touched.mpaaRating && (
                <div style={{ color: "red" }}>{errors.mpaaRating}</div>
              )}
            </div>

            <div>
              <label>Running Time (min)</label>
              <Field name="runningTimeMin" type="number" />
              {errors.runningTimeMin && touched.runningTimeMin && (
                <div style={{ color: "red" }}>{errors.runningTimeMin}</div>
              )}
            </div>

            <div>
              <label>Genre</label>
              <Field name="majorGenre" />
              {errors.majorGenre && touched.majorGenre && (
                <div style={{ color: "red" }}>{errors.majorGenre}</div>
              )}
            </div>

            <div>
              <label>Director</label>
              <Field name="director" />
              {errors.director && touched.director && (
                <div style={{ color: "red" }}>{errors.director}</div>
              )}
            </div>

            <div>
              <label>Distributor</label>
              <Field name="distributor" />
              {errors.distributor && touched.distributor && (
                <div style={{ color: "red" }}>{errors.distributor}</div>
              )}
            </div>

            <div>
              <label>IMDB Rating</label>
              <Field name="imdbRating" type="number" step="0.1" />
              {errors.imdbRating && touched.imdbRating && (
                <div style={{ color: "red" }}>{errors.imdbRating}</div>
              )}
            </div>

            <div>
              <label>Rotten Tomatoes Rating</label>
              <Field name="rottenTomatoesRating" type="number" />
              {errors.rottenTomatoesRating && touched.rottenTomatoesRating && (
                <div style={{ color: "red" }}>{errors.rottenTomatoesRating}</div>
              )}
            </div>

            <div>
              <label>Poster URL</label>
              <Field name="posterUrl" />
              {errors.posterUrl && touched.posterUrl && (
                <div style={{ color: "red" }}>{errors.posterUrl}</div>
              )}
            </div>

            <button type="submit">Speichern</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MovieEditPage;