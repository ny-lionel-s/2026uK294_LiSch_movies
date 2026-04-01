import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginPage from './loginPage'
import { isLoggedIn } from './authenticationService';
import type { JSX } from 'react';
import MoviesPage from './MoviesPage';
import MovieDetailPage from './movieDetailPage';
import MovieEditPage from './editMoviePage';
import MovieCreatePage from './postMoviePage';



const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/movies/create"
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

        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="*" element={<Navigate to="/movies" />} />
      </Routes>
    </>
  )
}

export default App
