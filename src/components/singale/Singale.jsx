import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Singale = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setShow(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{show.name}</h1>
      <img src={show.image?.original} alt={show.name} />
      <p>{show.summary}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Singale;
