import axios from 'axios';
import type { Movie } from './types/movie';

const API_URL = 'http://localhost:5000/api'; // Adjust to match your backend

export const getMovies = async (): Promise<Movie[]> => {
  const res = await axios.get<Movie[]>(API_URL);
  return res.data;
};

export const createMovie = async (movie: Omit<Movie, 'id'>): Promise<Movie> => {
  const res = await axios.post<Movie>(API_URL, movie);
  return res.data;
};

export const updateMovie = async (id: number, movie: Omit<Movie, 'id'>): Promise<Movie> => {
  const res = await axios.put<Movie>(`${API_URL}/${id}`, movie);
  return res.data;
};

export const deleteMovie = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
// Define types for auth
interface AuthCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user?: {
    id: number;
    email: string;
    name?: string;
  };
}

// LOGIN API
export const loginUser = async (credentials: AuthCredentials): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(`${API_URL}/auth/login`, credentials);
  return res.data;
};

// REGISTER API
export const registerUser = async (credentials: AuthCredentials): Promise<{ success: boolean }> => {
  const res = await axios.post<{ success: boolean }>(`${API_URL}/auth/register`, credentials);
  return res.data;
};
