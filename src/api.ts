import axios from 'axios';
import type { Movie } from './types/movie';

const API_URL = 'http://localhost:5000/api'; 



export const getMovies = async () => {
  const res = await fetch(`${API_URL}/movies`);
  if (!res.ok) throw new Error('Failed to fetch movies');
  return await res.json();
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
export const registerUser = async (data: { email: string; password: string }) => {
  const res = await fetch('http://localhost:5000/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Signup failed');
  }

  return res.json();
};
