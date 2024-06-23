// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import AdminRegister from './Components/AdminRegister';
import AdminLogin from './Components/AdminLogin';
import Transactions from './Components/Transactions';
import Main from './Components/Main';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="dashboard" element={<Main />} />
          <Route path="register" element={<AdminRegister />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
