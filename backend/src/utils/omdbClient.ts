import axios from 'axios';
import { IOMDBSearchResponse } from '../types/IMovie';

const omdb = axios.create({
  baseURL: 'http://www.omdbapi.com',
});

export const searchOmdbMovies = async (
  query: string,
  page: number = 1
): Promise<IOMDBSearchResponse> => {
  const response = await omdb.get('', {
    params: {
      apikey: process.env.OMDB_API_KEY,
      s: query,
      page,
    },
  });
  return response.data;
};