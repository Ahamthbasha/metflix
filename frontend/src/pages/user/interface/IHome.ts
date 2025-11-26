export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  isFavorite?: boolean;
}

export interface PaginationInfo {
  currentPage: number;
  totalResults: number;
  resultsPerPage: number;
  hasMore: boolean;
}