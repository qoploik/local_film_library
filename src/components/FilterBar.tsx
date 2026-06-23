import type { Genre, FilterState } from '../types/movie';
import { GENRES } from '../types/movie';

interface FilterBarProps {
  filter: FilterState;
  onTitleChange: (v: string) => void;
  onYearChange: (v: string) => void;
  onGenreChange: (v: Genre | '') => void;
  onReset: () => void;
}

const inputClass =
  'border rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors ' +
  'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-violet-500 ' +
  'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-600 dark:focus:border-violet-500';

export default function FilterBar({
  filter,
  onTitleChange,
  onYearChange,
  onGenreChange,
  onReset,
}: FilterBarProps) {
  const hasFilter = filter.title !== '' || filter.year !== '' || filter.genre !== '';

  return (
    <div className="flex flex-wrap gap-2 items-end">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 dark:text-gray-500 font-medium uppercase tracking-wider">
          Название
        </label>
        <input
          type="text"
          value={filter.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Поиск..."
          className={`${inputClass} w-44`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 dark:text-gray-500 font-medium uppercase tracking-wider">
          Год
        </label>
        <input
          type="number"
          value={filter.year}
          onChange={(e) => onYearChange(e.target.value)}
          placeholder="Год..."
          min={1888}
          max={2031}
          className={`${inputClass} w-28`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 dark:text-gray-500 font-medium uppercase tracking-wider">
          Жанр
        </label>
        <select
          value={filter.genre}
          onChange={(e) => onGenreChange(e.target.value as Genre | '')}
          className={`${inputClass} w-44`}
        >
          <option value="">Все жанры</option>
          {(Object.entries(GENRES) as [Genre, string][]).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {hasFilter && (
        <button
          onClick={onReset}
          className="px-3 py-2 text-sm text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
        >
          Сбросить
        </button>
      )}
    </div>
  );
}
