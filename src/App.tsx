import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './Components/LandgingPage';

import InfoPage from './Components/InfoPage';
import ExperiencePage from './Components/ExperiencePage';
import EducationPage from './Components/EducationPage';
import ResumePage from './Components/ResumePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/piradi" element={<InfoPage />} />
        <Route path="/gamotsdileba" element={<ExperiencePage />} />
        <Route path="/ganatleba" element={<EducationPage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
