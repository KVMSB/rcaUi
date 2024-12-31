import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Investigations from './pages/Investigations';
import EventInformation from './pages/EventInformation';
import Header from './componants/Header';

function App() {
  return (
    <>


    <Router>
      <Routes>
        <Route path="/" element={<Investigations />} />
        <Route path="/event/:eventNo" element={<EventInformation />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
