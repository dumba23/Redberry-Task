import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './Components/LandgingPage';

import InfoPage from './Components/InfoPage';
import ExperiencePage from './Components/ExperiencePage';
import EducationPage from './Components/EducationPage';
import ResumePage from './Components/ResumePage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/piradi" element={<InfoPage />} />
        <Route path="/gamotsdileba" element={<ExperiencePage />} />
        <Route path="/ganatleba" element={<EducationPage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
