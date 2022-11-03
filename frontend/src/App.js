
import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() 
{
  return (
    <HashRouter>
    <Routes>
      <Route path="/Login" index element={<LoginPage />} />
      <Route path="/SignUp" index element={<SignUpPage />} />
    </Routes>
  </HashRouter>
);
}
export default App;