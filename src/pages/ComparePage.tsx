import { useState } from 'react';
import { useMovieStore } from '../store/movieStore';
import { useFilter } from '../hooks/useFilter';
import type { MovieStatus } from '../types/movie';
import FilterBar from '../components/FilterBar';
import MovieList from '../components/MovieList';
import AddMovieModal from '../components/AddMovieModal';

function Column({
  title,
  status,
  onAdd,
}: {
  title: string;
  status: MovieStatus;
  onAdd: (s: MovieStatus) => void;
}) {
  const movies = useMovieStore((s) => s.movies.filter((m) => m.status === status));
  const { filter, filtered, setTitle, setYear, setGenre, reset } = useFilter(movies);

  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-100">{title}</h2>
          <p className="text-xs text-gray-600 mt-0.5">{movies.length} фильмов</p>
        </div>
        <button
          onClick={() => onAdd(status)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium rounded-lg transition-colors"
        >
          + Добавить
        </button>
      </div>

      <FilterBar
        filter={filter}
        onTitleChange={setTitle}
        onYearChange={setYear}
        onGenreChange={setGenre}
        onReset={reset}
      />

      {(filter.title || filter.year || filter.genre) && (
        <p className="text-xs text-gray-600 -mt-2">
          Найдено: {filtered.length} из {movies.length}
        </p>
      )}

      <MovieList
        movies={filtered}
        emptyMessage={status === 'watched' ? 'Нет просмотренных фильмов' : 'Список пуст'}
      />
    </div>
  );
}

export default function ComparePage() {
  const [modalStatus, setModalStatus] = useState<MovieStatus | null>(null);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-100 mb-8">Сравнение</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Column title="Просмотренные" status="watched" onAdd={setModalStatus} />
        <Column title="К просмотру" status="to-watch" onAdd={setModalStatus} />
      </div>

      {modalStatus && (
        <AddMovieModal status={modalStatus} onClose={() => setModalStatus(null)} />
      )}
    </div>
  );
}
