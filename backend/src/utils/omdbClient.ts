import axios from 'axios';
import { IOMDBSearchResponse } from '../types/IMovie';

const omdb = axios.create({
  baseURL: 'http://www.omdbapi.com',
});

export const searchOmdbMovies = async (
  query: string,
  page: number = 1
): Promise<IOMDBSearchResponse> => {
  try {
    const response = await omdb.get('', {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('OMDB search error:', error);
    return { 
      Response: 'False', 
      Error: 'Failed to fetch movies from OMDB' 
    };
  }
};

export const getOmdbMovieById = async (imdbID: string): Promise<any> => {
  try {
    const response = await omdb.get('', {
      params: {
        apikey: process.env.OMDB_API_KEY,
        i: imdbID,
        plot: 'short',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`OMDB fetch error for ${imdbID}:`, error);
    return { 
      Response: 'False', 
      Error: 'Failed to fetch movie details' 
    };
  }
};