import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { Movie, Genre, MovieStatus } from '../types/movie';

interface MovieStore {
  movies: Movie[];
  addMovie: (title: string, year: number, genre: Genre, status: MovieStatus) => void;
  removeMovie: (id: string) => void;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set) => ({
      movies: [],
      addMovie: (title, year, genre, status) => {
        set((state) => ({
          movies: [
            ...state.movies,
            { id: nanoid(), title, year, genre, status, addedAt: Date.now() },
          ],
        }));
      },
      removeMovie: (id) => {
        set((state) => ({ movies: state.movies.filter((m) => m.id !== id) }));
      },
    }),
    { name: 'movie-tracker' }
  )
);
