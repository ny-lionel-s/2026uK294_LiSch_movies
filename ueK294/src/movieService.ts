import  api  from "./api"

export type Movie = {
  id: number
  title: string
  releaseDate: string
  mpaaRating: string
  runningTimeMin: number
  majorGenre: string
  director: string
  distributor: string
  imdbRating: number
  rottenTomatoesRating: number
  posterUrl: string
}

export const getMovies = async (): Promise<Movie[]> => {
  const response = await api.get<Movie[]>("/movies")
  return response.data
}

export const getMovieById = async (id: number): Promise<Movie> => {
  const response = await api.get<Movie>(`/movies/${id}`)
  return response.data
}

export const createMovie = async (
  movie: Omit<Movie, "id">
): Promise<Movie> => {
  const response = await api.post<Movie>("/movies", movie)
  return response.data
}

export const updateMovie = async (
  id: number,
  movie: Omit<Movie, "id">
): Promise<Movie> => {
  const response = await api.put<Movie>(`/movies/${id}`, movie)
  return response.data
}

export const deleteMovie = async (id: number): Promise<void> => {
  await api.delete(`/movies/${id}`)
}