import React, { useEffect, useState } from 'react';
import type { Movie } from '../types/movie';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import { getMovies, createMovie, updateMovie, deleteMovie } from '../api';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editing, setEditing] = useState<Movie | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddOrUpdate = async (movieData: Omit<Movie, 'id'>) => {
    if (editing) {
      await updateMovie(editing.id, movieData);
    } else {
      await createMovie(movieData);
    }
    setEditing(null);
    setShowForm(false);
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await deleteMovie(id);
    fetchData();
  };

  const handleEdit = (movie: Movie) => {
    setEditing(movie);
    setShowForm(true);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Favorite Movies & Shows</h1>
        {showForm ? (
          <button
            onClick={() => {
              setShowForm(false);
              setEditing(null);
            }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Back to List
          </button>
        ) : (
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Add New
          </button>
        )}
      </div>

      {showForm ? (
        <MovieForm
          initialData={editing}
          onSubmit={handleAddOrUpdate}
          onCancel={() => {
            setEditing(null);
            setShowForm(false);
          }}
        />
      ) : (
        <MovieTable
          movies={movies}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Home;
