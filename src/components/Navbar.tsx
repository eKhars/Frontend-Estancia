import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      setSearchTerm(query);
    }
  }, [location]);

  const performSearch = useCallback((term: string) => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');

    if (term.trim()) {
      navigate(`/search?query=${encodeURIComponent(term.trim())}${category ? `&category=${category}` : ''}`);
    } else if (category) {
      navigate(`/search?category=${category}`);
    } else {
      navigate('/');
    }
  }, [navigate, location.search]);

  const debouncedSearch = useCallback(
    debounce((term: string) => performSearch(term), 300),
    [performSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchTerm);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">Logo</Link>
        <form onSubmit={handleSubmit} className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </form>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Inicio</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;