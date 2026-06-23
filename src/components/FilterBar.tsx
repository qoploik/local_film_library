import type { Genre, FilterState } from '../types/movie';
import { GENRES } from '../types/movie';

interface FilterBarProps {
  filter: FilterState;
  onTitleChange: (v: string) => void;
  onYearChange: (v: string) => void;
  onGenreChange: (v: Genre | '') => void;
  onReset: () => void;
}

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
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
          Название
        </label>
        <input
          type="text"
          value={filter.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Поиск..."
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors w-44"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">Год</label>
        <input
          type="number"
          value={filter.year}
          onChange={(e) => onYearChange(e.target.value)}
          placeholder="Год..."
          min={1888}
          max={2031}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors w-28"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">Жанр</label>
        <select
          value={filter.genre}
          onChange={(e) => onGenreChange(e.target.value as Genre | '')}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-violet-500 transition-colors w-44"
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
          className="px-3 py-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          Сбросить
        </button>
      )}
    </div>
  );
}
