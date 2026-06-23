import { useState, useEffect, useRef } from 'react';
import type { Genre, MovieStatus } from '../types/movie';
import { GENRES } from '../types/movie';
import { useMovieStore } from '../store/movieStore';

interface AddMovieModalProps {
  status: MovieStatus;
  onClose: () => void;
}

const CURRENT_YEAR = new Date().getFullYear();

const STATUS_LABELS: Record<MovieStatus, string> = {
  watched: 'в просмотренные',
  'to-watch': 'в список к просмотру',
};

const inputBase =
  'w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors ' +
  'bg-white border-gray-300 text-gray-900 placeholder-gray-400 ' +
  'dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-600';

export default function AddMovieModal({ status, onClose }: AddMovieModalProps) {
  const addMovie = useMovieStore((s) => s.addMovie);

  const [title, setTitle] = useState('');
  const [year, setYear] = useState(String(CURRENT_YEAR));
  const [genre, setGenre] = useState<Genre>('drama');
  const [errors, setErrors] = useState<{ title?: string; year?: string }>({});

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const validate = (): boolean => {
    const next: { title?: string; year?: string } = {};
    if (!title.trim()) next.title = 'Введите название фильма';
    const y = parseInt(year, 10);
    if (isNaN(y) || y < 1888 || y > CURRENT_YEAR + 5) {
      next.year = `Введите год от 1888 до ${CURRENT_YEAR + 5}`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addMovie(title.trim(), parseInt(year, 10), genre, status);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Добавить фильм
            </h2>
            <p className="text-xs text-gray-500 mt-1">{STATUS_LABELS[status]}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Название фильма
            </label>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((er) => ({ ...er, title: undefined }));
              }}
              placeholder="Например: Интерстеллар"
              className={`${inputBase} ${
                errors.title
                  ? 'border-red-400 focus:border-red-500 dark:border-red-500 dark:focus:border-red-400'
                  : 'focus:border-violet-500 dark:border-gray-700 dark:focus:border-violet-500'
              }`}
            />
            {errors.title && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Год выпуска
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                if (errors.year) setErrors((er) => ({ ...er, year: undefined }));
              }}
              min={1888}
              max={CURRENT_YEAR + 5}
              className={`${inputBase} ${
                errors.year
                  ? 'border-red-400 focus:border-red-500 dark:border-red-500 dark:focus:border-red-400'
                  : 'focus:border-violet-500 dark:border-gray-700 dark:focus:border-violet-500'
              }`}
            />
            {errors.year && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.year}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Жанр
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value as Genre)}
              className={`${inputBase} focus:border-violet-500 dark:border-gray-700 dark:focus:border-violet-500`}
            >
              {(Object.entries(GENRES) as [Genre, string][]).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-300 hover:border-gray-400 dark:text-gray-400 dark:hover:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:hover:border-gray-600"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors"
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
