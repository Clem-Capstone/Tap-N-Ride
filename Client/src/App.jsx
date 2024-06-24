import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import Transactions from './Components/Transactions';
import AdminRegister from './Components/AdminRegister';
import AdminLogin from './Components/AdminLogin';
import AdminManagement from './Components/AdminManagement';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<AdminRegister />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/admins" element={<AdminManagement />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
