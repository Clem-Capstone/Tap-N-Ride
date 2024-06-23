// Dashboard.jsx
import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

//import icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

//import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="app-layout">
        <SideBar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
