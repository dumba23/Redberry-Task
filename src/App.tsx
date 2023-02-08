import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './Components/LandgingPage';

import InfoPage from './Components/InfoPage';
import ExperiencePage from './Components/ExperiencePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/piradi" element={<InfoPage />} />
        <Route path="/gamotsdileba" element={<ExperiencePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
