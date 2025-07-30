import React, { useState, useMemo } from 'react';
import type { Movie } from '../types/movie';

interface Props {
  movies: Movie[];
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

const MovieTable: React.FC<Props> = ({ movies, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'All' || movie.type === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [movies, searchTerm, filterType]);

  // Extract unique types for dropdown
  const movieTypes = useMemo(() => ['All', ...new Set(movies.map((m) => m.type))], [movies]);

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="px-4 py-2 border rounded-md w-full md:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-md w-full md:w-1/5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {movieTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs uppercase tracking-wider shadow-sm">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Director</th>
              <th className="px-4 py-3">Budget</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredMovies.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No movies or shows found.
                </td>
              </tr>
            ) : (
              filteredMovies.map((movie) => (
                <tr
                  key={movie.id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-4 py-2">{movie.title}</td>
                  <td className="px-4 py-2">{movie.type}</td>
                  <td className="px-4 py-2">{movie.director}</td>
                  <td className="px-4 py-2">{movie.budget}</td>
                  <td className="px-4 py-2">{movie.location}</td>
                  <td className="px-4 py-2">{movie.duration}</td>
                  <td className="px-4 py-2">{movie.year}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => onEdit(movie)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(movie.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieTable;
