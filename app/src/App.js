import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import PrivacyPolicy from './components/PrivacyPolicy'; // Adjust the path as necessary
import RefundPolicy from './components/RefundPolicy'; // Adjust the path as necessary
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
