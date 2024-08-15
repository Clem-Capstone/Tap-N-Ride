import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import RoutesTable from './RoutesTable';
import './css/routes.css';

const RoutesArea = () => {
  return (
    <>
      <Header />
      <SideBar />
      <div id="main" className="main">
        <h1>Routes Management</h1>
        <RoutesTable />
      </div>
    </>
  );
};

export default RoutesArea;
