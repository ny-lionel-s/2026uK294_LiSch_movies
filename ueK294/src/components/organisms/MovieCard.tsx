import React from "react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../../MovieService";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movies/${movie.id}`)}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        width: "200px",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        style={{ width: "100%", borderRadius: "4px" }}
      />
      <h3 style={{ fontSize: "16px", margin: "10px 0" }}>{movie.title}</h3>
      <p style={{ margin: "5px 0", color: "#666" }}>ID: {movie.id}</p>
      <p style={{ margin: "5px 0", color: "#666" }}>{movie.majorGenre}</p>
      <p style={{ margin: "5px 0", color: "#666" }}>
        Release Date: {movie.releaseDate}
      </p>
      <p style={{ margin: "5px 0", fontWeight: "bold" }}>
        IMDB: {movie.imdbRating}
      </p>
    </div>
  );
};

export default MovieCard;
