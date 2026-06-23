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

export default function AddMovieModal({ status, onClose }: AddMovieModalProps) {
  const addMovie = useMovieStore((s) => s.addMovie);

  const [title, setTitle] = useState('');
  const [year, setYear] = useState(String(CURRENT_YEAR));
  const [genre, setGenre] = useState<Genre>('drama');
  const [errors, setErrors] = useState<{ title?: string; year?: string }>({});

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
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
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-100">Добавить фильм</h2>
            <p className="text-xs text-gray-500 mt-1">{STATUS_LABELS[status]}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-300 transition-colors p-1"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
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
              className={`w-full bg-gray-800 border rounded-lg px-3 py-2.5 text-sm text-gray-100 placeholder-gray-600 focus:outline-none transition-colors ${
                errors.title ? 'border-red-500 focus:border-red-400' : 'border-gray-700 focus:border-violet-500'
              }`}
            />
            {errors.title && (
              <p className="text-xs text-red-400 mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
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
              className={`w-full bg-gray-800 border rounded-lg px-3 py-2.5 text-sm text-gray-100 focus:outline-none transition-colors ${
                errors.year ? 'border-red-500 focus:border-red-400' : 'border-gray-700 focus:border-violet-500'
              }`}
            />
            {errors.year && (
              <p className="text-xs text-red-400 mt-1">{errors.year}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Жанр</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value as Genre)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-violet-500 transition-colors"
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
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-gray-200 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-gray-600 rounded-lg transition-colors"
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
