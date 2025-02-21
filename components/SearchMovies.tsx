import React, { useState } from 'react';

interface Props {
  apiKey: string;
}

const SearchMovies: React.FC<Props> = ({ apiKey }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.myanimelist.net/v2/anime?q=${searchTerm}&limit=10&fields=title,mean,rank,popularity`, {
        headers: {
          'X-MAL-CLIENT-ID': apiKey
        }
      });
      const data = await response.json();
      console.log(data);
      setMovies(data.data);
  
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Sök filmer"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2">Sök</button>
      <ul className="mt-4">
        {movies.map((movie: any, index) => (
          <li key={index} className="mb-2">
            {movie.title} - {movie.mean} ({movie.rank})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchMovies;

//npm install axios
/*import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  apiKey: string;
}

const SearchMovies: React.FC<Props> = ({ apiKey }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://api.myanimelist.net/v2/anime', {
        params: {
          q: searchTerm,
          limit: 10,
          fields: 'title,mean,rank,popularity',
          apiKey: apiKey,
        },
      });
      setMovies(response.data.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Sök filmer"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Sök</button>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            {movie.title} - {movie.mean} ({movie.rank})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchMovies;*/
