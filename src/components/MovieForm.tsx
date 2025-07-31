import React, { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';

interface MovieFormProps {
  initialData?: Movie | null;
  onSubmit: (movie: Omit<Movie, 'id'>) => void;
  onCancel?: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Movie, 'id'>>({
    title: '',
    type: 'Movie',
    director: '',
    budget: '',
    location: '',
    duration: '',
    year: '',
  });

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setFormData(rest);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onSubmit(formData);


  setFormData({
    title: '',
    type: 'Movie',
    director: '',
    budget: '',
    location: '',
    duration: '',
    year: '',
  });
};

useEffect(() => {
  if (initialData) {
    const { id, ...rest } = initialData;
    setFormData(rest);
  } else {
    setFormData({
      title: '',
      type: 'Movie',
      director: '',
      budget: '',
      location: '',
      duration: '',
      year: '',
    });
  }
}, [initialData]);



  return (
    <div  className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 rounded-2xl shadow-md max-w-4xl mx-auto px-4 mb-10">
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto mt-8 p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200 rounded-2xl shadow-xl"
    >
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        {initialData ? 'Edit Favorite' : 'Add New Favorite'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Interstellar"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Movie</option>
            <option>TV Show</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Director</label>
          <input
            name="director"
            value={formData.director}
            onChange={handleChange}
            placeholder="e.g. Christopher Nolan"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
          <input
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g. $160M"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Iceland"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g. 2h 49m"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year/Time</label>
          <input
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="e.g. 2014"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex justify-end mt-8 space-x-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
        >
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg transition duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
    </div>
  );
};

export default MovieForm;
