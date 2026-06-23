import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  emptyMessage?: string;
}

export default function MovieList({ movies, emptyMessage = 'Фильмов нет' }: MovieListProps) {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-600">
        <span className="text-5xl mb-3 opacity-40">🎬</span>
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
