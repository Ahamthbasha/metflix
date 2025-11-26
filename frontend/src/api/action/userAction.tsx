// src/api/action/userAction.ts
import { API } from "../../service/axios";
import userEndpoint from "../../types/endpoints/userEndpoint";

export const getMovies = async (query: string, page: number = 1) => {
  try {
    const response = await API.get(`${userEndpoint.movieRoutes.getAllMovies}`, {
      params: { q: query, page }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await API.get(`${userEndpoint.movieRoutes.getPopularMovies}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFavourites = async () => {
  try {
    const response = await API.get(`${userEndpoint.movieRoutes.getFavouriteMovies}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toggleFavourite = async (imdbID: string) => {
  try {
    const response = await API.post(`${userEndpoint.movieRoutes.toggleFavouriteMovie}`, { 
      imdbID 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};