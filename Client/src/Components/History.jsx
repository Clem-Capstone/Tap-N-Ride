import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import HistoryTable from './HistoryTable';
import './css/history.css';

const History = () => {
  return (
    <>
      <Header />
      <SideBar />
      <div id="main" className="main">
          <h1>History</h1>
          <HistoryTable />
        </div>
    </>
  );
};

export default History;
