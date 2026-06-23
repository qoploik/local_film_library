import { useState, useMemo } from 'react';
import type { Movie, FilterState, Genre } from '../types/movie';

const initialFilter: FilterState = { title: '', year: '', genre: '' };

export function useFilter(movies: Movie[]) {
  const [filter, setFilter] = useState<FilterState>(initialFilter);

  const filtered = useMemo(() => {
    return movies.filter((m) => {
      const matchTitle = m.title.toLowerCase().includes(filter.title.toLowerCase());
      const matchYear = filter.year === '' || m.year.toString() === filter.year;
      const matchGenre = filter.genre === '' || m.genre === filter.genre;
      return matchTitle && matchYear && matchGenre;
    });
  }, [movies, filter]);

  const setTitle = (title: string) => setFilter((f) => ({ ...f, title }));
  const setYear = (year: string) => setFilter((f) => ({ ...f, year }));
  const setGenre = (genre: Genre | '') => setFilter((f) => ({ ...f, genre }));
  const reset = () => setFilter(initialFilter);

  return { filter, filtered, setTitle, setYear, setGenre, reset };
}
