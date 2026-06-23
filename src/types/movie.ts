export const GENRES = {
  horror: 'Хоррор',
  thriller: 'Триллер',
  comedy: 'Комедия',
  drama: 'Драма',
  action: 'Боевик',
  'sci-fi': 'Фантастика',
  animation: 'Анимация',
  documentary: 'Документальный',
  romance: 'Романтика',
  adventure: 'Приключения',
  fantasy: 'Фэнтези',
} as const;

export type Genre = keyof typeof GENRES;
export type MovieStatus = 'watched' | 'to-watch';

export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: Genre;
  status: MovieStatus;
  addedAt: number;
}

export interface FilterState {
  title: string;
  year: string;
  genre: Genre | '';
}
