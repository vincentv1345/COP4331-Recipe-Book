
import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() 
{
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" index element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);
}
export default App;