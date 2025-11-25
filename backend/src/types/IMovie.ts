export interface IMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface IOMDBSearchResponse {
  Search?: IMovie[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}