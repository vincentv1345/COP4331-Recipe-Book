
import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import ProfilePage from './pages/ProfilePage.js';
import HomePagePage from './pages/HomepagePage.js';
import ForgotPasswordPage from './pages/ForgotPasswordPage.js';
import ResetPasswordPage from './pages/ResetPasswordPage.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() 
{
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/SignUp" index element={<SignUpPage />} />
      <Route path="/Profile" index element={<ProfilePage />} />
      <Route path="/HomePage" index element={<HomePagePage />} />
      <Route path="/ForgotPassword" index element={<ForgotPasswordPage />} />
      <Route path="/ResetPassword" index element={<ResetPasswordPage />} />
    </Routes>
  </BrowserRouter>
  )
 /*
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
  */
}
export default App;