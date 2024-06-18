// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CupomPage from './CupomPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cupom/:cupom" element={<CupomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
