import API from "../../service/axios";
import userEndpoint from "../../types/endpoints/userEndpoint";

export const getMovies = async (query: string, page: number = 1) => {
  try {
    const response = await API.get(`${userEndpoint.getAllMovies}`, {
      params: { q: query, page }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await API.get(`${userEndpoint.getPopularMovies}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFavourites = async () => {
  try {
    const response = await API.get(`${userEndpoint.getFavouriteMovies}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toggleFavourite = async (imdbID: string) => {
  try {
    const response = await API.post(`${userEndpoint.toggleFavouriteMovie}`, { 
      imdbID 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};