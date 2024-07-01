import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import HistoryTable from './HistoryTable';
import './css/history.css';

const History = () => {
  return (
    <>
      <Header />
      <div className="app-layout">
        <SideBar />
        <div className="main-content">
          <h1>History</h1>
          <HistoryTable />
        </div>
      </div>
    </>
  );
};

export default History;
