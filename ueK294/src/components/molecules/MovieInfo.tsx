import React from "react";

type MovieInfoProps = {
  label: string;
  value: string | number;
};

const MovieInfo: React.FC<MovieInfoProps> = ({ label, value }) => {
  return (
    <p style={{ marginBottom: "10px" }}>
      <strong>{label}:</strong> {value}
    </p>
  );
};

export default MovieInfo;
