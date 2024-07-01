import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Content = () => {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleShows, setVisibleShows] = useState(12);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = () => {
    fetch('https://api.tvmaze.com/shows')
      .then(response => response.json())
      .then(data => {
        setShows(data.slice(0, 100));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchSearchResults = (query) => {
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then(response => response.json())
      .then(data => {
        setShows(data.map(item => item.show));
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    if (query) {
      fetchSearchResults(query);
    } else {
      fetchShows();
    }
  };

  const loadMoreShows = () => {
    setVisibleShows((prev) => prev + 4);
  };

  const filteredShows = shows.slice(0, visibleShows);

  return (
    <div className="App">
      <h1>TV Shows</h1>
      <input
        type="text"
        placeholder="Search shows..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="show-list">
        {filteredShows.map((show) => (
          <Link key={show.id} to={`/show/${show.id}`} className="show-item">
            <h2>{show.name}</h2>
            <p dangerouslySetInnerHTML={{ __html: show.summary }}></p>
            <img src={show.image?.medium} alt={show.name} />
          </Link>
        ))}
      </div>
      {visibleShows < shows.length && (
        <button onClick={loadMoreShows}>Show More</button>
      )}
    </div>
  );
};

export default Content;

