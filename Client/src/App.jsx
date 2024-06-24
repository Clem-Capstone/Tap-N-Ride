// App.jsx
import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import AdminRegister from './Components/AdminRegister';
import AdminLogin from './Components/AdminLogin';
import Transactions from './Components/Transactions';
import Main from './Components/Main';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';
=======
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import AdminRegister from './Components/AdminRegister';
import AdminLogin from './Components/AdminLogin';
import AdminManagement from './Components/AdminManagement';
import PrivateRoute from './Components/PrivateRoute';
>>>>>>> main

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="dashboard" element={<Main />} />
          <Route path="register" element={<AdminRegister />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
=======
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
>>>>>>> main
    </Router>
  );
}

export default App;
