import React from "react";
import { Formik, Form } from "formik";
import type { MovieFormValues } from "../../MovieService";
import Button from "../Atoms/Button";
import FormField from "../Molecules/FormField";

type MovieFormProps = {
  initialValues: MovieFormValues;
  onSubmit: (values: MovieFormValues) => Promise<void> | void;
  submitButtonText?: string;
};

const MovieForm: React.FC<MovieFormProps> = ({
  initialValues,
  onSubmit,
  submitButtonText = "Speichern",
}) => {
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

  return (
    <Formik<MovieFormValues>
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ errors, touched }) => (
        <Form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <FormField
            name="title"
            label="Titel"
            error={errors.title}
            touched={touched.title}
          />
          <FormField
            name="releaseDate"
            label="Release Date"
            error={errors.releaseDate}
            touched={touched.releaseDate}
          />
          <FormField
            name="mpaaRating"
            label="MPAA Rating"
            error={errors.mpaaRating}
            touched={touched.mpaaRating}
          />
          <FormField
            name="runningTimeMin"
            label="Running Time (min)"
            type="number"
            error={errors.runningTimeMin}
            touched={touched.runningTimeMin}
          />
          <FormField
            name="majorGenre"
            label="Genre"
            error={errors.majorGenre}
            touched={touched.majorGenre}
          />
          <FormField
            name="director"
            label="Director"
            error={errors.director}
            touched={touched.director}
          />
          <FormField
            name="distributor"
            label="Distributor"
            error={errors.distributor}
            touched={touched.distributor}
          />
          <FormField
            name="imdbRating"
            label="IMDB Rating"
            type="number"
            step="0.1"
            error={errors.imdbRating}
            touched={touched.imdbRating}
          />
          <FormField
            name="rottenTomatoesRating"
            label="Rotten Tomatoes Rating"
            type="number"
            error={errors.rottenTomatoesRating}
            touched={touched.rottenTomatoesRating}
          />
          <FormField
            name="posterUrl"
            label="Poster URL"
            error={errors.posterUrl}
            touched={touched.posterUrl}
          />
          <Button type="submit" variant="primary">
            {submitButtonText}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default MovieForm;
