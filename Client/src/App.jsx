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
import Transactions from './Components/Transactions';
import Users from './Components/Users';
import TopUp from './Components/TopUp';
import  History from './Components/History';
import Reports from './Components/Reports';
import RoutesArea from './Components/RoutesArea';

function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          <Route path="/register" element={<AdminRegister />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/users" element={<Users />} />
            <Route path="/topup" element={<TopUp />} />
            <Route path="/history" element={<History />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/routes" element={<RoutesArea />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
