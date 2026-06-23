import type { Movie } from '../types/movie';
import { GENRES } from '../types/movie';
import { useMovieStore } from '../store/movieStore';

const genreColors: Record<string, string> = {
  horror:
    'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800/50',
  thriller:
    'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800/50',
  comedy:
    'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-800/50',
  drama:
    'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800/50',
  action:
    'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-800/50',
  'sci-fi':
    'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/40 dark:text-cyan-300 dark:border-cyan-800/50',
  animation:
    'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/40 dark:text-pink-300 dark:border-pink-800/50',
  documentary:
    'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800/50',
  romance:
    'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/40 dark:text-fuchsia-300 dark:border-fuchsia-800/50',
  adventure:
    'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800/50',
  fantasy:
    'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800/50',
};

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const removeMovie = useMovieStore((s) => s.removeMovie);
  const colorClass =
    genreColors[movie.genre] ??
    'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';

  return (
    <div className="group relative flex items-center gap-3 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:bg-gray-800/80 dark:border-gray-700/60 dark:hover:border-gray-600 dark:hover:bg-gray-800 rounded-xl px-4 py-3 transition-all duration-150">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{movie.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{movie.year}</p>
      </div>

      <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${colorClass}`}>
        {GENRES[movie.genre]}
      </span>

      <button
        onClick={() => removeMovie(movie.id)}
        className="shrink-0 opacity-0 group-hover:opacity-100 ml-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 dark:text-red-400 dark:hover:text-red-300 dark:bg-red-950/30 dark:hover:bg-red-950/60 dark:border-red-800/40 dark:hover:border-red-700/60"
        aria-label={`Удалить ${movie.title}`}
      >
        Delete
      </button>
    </div>
  );
}
