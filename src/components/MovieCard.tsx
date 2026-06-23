import type { Movie } from '../types/movie';
import { GENRES } from '../types/movie';
import { useMovieStore } from '../store/movieStore';

const genreColors: Record<string, string> = {
  horror: 'bg-red-900/40 text-red-300 border-red-800/50',
  thriller: 'bg-orange-900/40 text-orange-300 border-orange-800/50',
  comedy: 'bg-yellow-900/40 text-yellow-300 border-yellow-800/50',
  drama: 'bg-blue-900/40 text-blue-300 border-blue-800/50',
  action: 'bg-rose-900/40 text-rose-300 border-rose-800/50',
  'sci-fi': 'bg-cyan-900/40 text-cyan-300 border-cyan-800/50',
  animation: 'bg-pink-900/40 text-pink-300 border-pink-800/50',
  documentary: 'bg-green-900/40 text-green-300 border-green-800/50',
  romance: 'bg-fuchsia-900/40 text-fuchsia-300 border-fuchsia-800/50',
  adventure: 'bg-emerald-900/40 text-emerald-300 border-emerald-800/50',
  fantasy: 'bg-purple-900/40 text-purple-300 border-purple-800/50',
};

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const removeMovie = useMovieStore((s) => s.removeMovie);
  const colorClass = genreColors[movie.genre] ?? 'bg-gray-700 text-gray-300 border-gray-600';

  return (
    <div className="group relative flex items-center gap-3 bg-gray-800/80 border border-gray-700/60 rounded-xl px-4 py-3 hover:border-gray-600 hover:bg-gray-800 transition-all duration-150">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-100 truncate">{movie.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{movie.year}</p>
      </div>

      <span
        className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${colorClass}`}
      >
        {GENRES[movie.genre]}
      </span>

      <button
        onClick={() => removeMovie(movie.id)}
        className="shrink-0 opacity-0 group-hover:opacity-100 ml-1 px-2.5 py-1 text-xs font-medium text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 border border-red-800/40 hover:border-red-700/60 rounded-md transition-all duration-150"
        aria-label={`Удалить ${movie.title}`}
      >
        Delete
      </button>
    </div>
  );
}
