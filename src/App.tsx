import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './Components/LandgingPage';

import InfoPage from './Components/InfoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/piradi" element={<InfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
