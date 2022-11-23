import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Scouts } from '../pages/Scouts';
import Layout from '../styles/Layout';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/scouts" element={<Scouts />} />
      </Route>
    </Routes>
  );
};
export default Router;
