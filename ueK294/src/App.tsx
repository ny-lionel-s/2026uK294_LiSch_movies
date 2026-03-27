import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import MoviesPage from "./MoviesPage";
import LoginPage from './loginPage'
import { isLoggedIn } from './authenticationService';
import type { JSX } from 'react';


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/movies"
          element={
            <PrivateRoute>
              <MoviesPage/>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/movies" />} />
      </Routes>
    </>
  )
}

export default App
