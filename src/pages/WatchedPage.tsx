import { useState } from 'react';
import { useMovieStore } from '../store/movieStore';
import { useFilter } from '../hooks/useFilter';
import { plural } from '../utils/plural';
import FilterBar from '../components/FilterBar';
import MovieList from '../components/MovieList';
import AddMovieModal from '../components/AddMovieModal';

export default function WatchedPage() {
  const movies = useMovieStore((s) => s.movies.filter((m) => m.status === 'watched'));
  const { filter, filtered, setTitle, setYear, setGenre, reset } = useFilter(movies);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Просмотренные</h1>
          <p className="text-sm text-gray-500 mt-1">
            {movies.length} {plural(movies.length, 'фильм', 'фильма', 'фильмов')}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <span className="text-base leading-none">+</span> Добавить фильм
        </button>
      </div>

      <div className="mb-5">
        <FilterBar
          filter={filter}
          onTitleChange={setTitle}
          onYearChange={setYear}
          onGenreChange={setGenre}
          onReset={reset}
        />
      </div>

      {filter.title || filter.year || filter.genre ? (
        <p className="text-xs text-gray-600 mb-3">
          Найдено: {filtered.length} из {movies.length}
        </p>
      ) : null}

      <MovieList movies={filtered} emptyMessage="Нет просмотренных фильмов — добавьте первый!" />

      {showModal && <AddMovieModal status="watched" onClose={() => setShowModal(false)} />}
    </div>
  );
}
