import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';  //theme
import 'primereact/resources/primereact.min.css';          //core css
import 'primeicons/primeicons.css';                        //icons
import Dashboard from './Components/Dashboard';
import AdminRegister from './Components/AdminRegister';
import AdminLogin from './Components/AdminLogin';
import PrivateRoute from './Components/PrivateRoute';
import Admins from './Components/Admins';

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
            <Route path="/admins" element={<Admins />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
