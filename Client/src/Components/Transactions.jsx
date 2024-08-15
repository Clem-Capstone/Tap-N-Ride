import React, { useEffect, useState } from 'react';
import TransactionTable from './TransactionTable';
import './css/transactions.css';
import Header from './Header'; // Make sure you import the header
import SideBar from './SideBar'; // Make sure you import the sidebar

const Transactions = () => {
  return (
    <>
      <Header />
      <SideBar />
      <div id="main" className="main">
        <h1>Transactions</h1>
        <TransactionTable />
      </div>
    </>
  );
};

export default Transactions;
