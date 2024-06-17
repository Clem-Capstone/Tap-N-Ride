import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import AdminRegister from './Components/AdminRegister';
import AdminLogin from './Components/AdminLogin';

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<AdminRegister />} />
          <Route path="/" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
