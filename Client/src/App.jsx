import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import AdminRegister from './Components/AdminRegister';
import AdminLogin from './Components/AdminLogin';
import AdminManagement from './Components/AdminManagement';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/register">Admin Register</Link>
            </li>
            <li>
              <Link to="/admin/login">Admin Login</Link>
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/register" element={<AdminRegister />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admins" element={<AdminManagement />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
