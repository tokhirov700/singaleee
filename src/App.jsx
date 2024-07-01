import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Content from './components/content/Content';
import Singale from './components/singale/Singale';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Content />} />
      <Route path="/show/:id" element={<Singale />} />
    </Routes>
  );
};

export default App;
