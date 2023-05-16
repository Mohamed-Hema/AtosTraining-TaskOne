import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import QuestionBankPage from './pages/QuestionBankPage';
import Navbar from './components/Navbar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/questionbank"
          element={<QuestionBankPage isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
