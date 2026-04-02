import type { JSX } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MovieCreatePage from "./Components/Pages/MovieCreatePage";
import MovieDetailPage from "./Components/Pages/MovieDetailPage";
import MovieEditPage from "./Components/Pages/MovieEditPage";
import MoviesPage from "./Components/Pages/MoviesPage";
import { isLoggedIn } from "./AuthenticationService";
import LoginPage from "./LoginPage";
import "./App.css";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/movies/new"
        element={
          <PrivateRoute>
            <MovieCreatePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/movies/:id/edit"
        element={
          <PrivateRoute>
            <MovieEditPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/movies/:id"
        element={
          <PrivateRoute>
            <MovieDetailPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/movies"
        element={
          <PrivateRoute>
            <MoviesPage />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/movies" replace />} />
      <Route path="*" element={<Navigate to="/movies" replace />} />
    </Routes>
  );
};

export default App;
