import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionTable from './TransactionTable';
import './css/transactions.css';
import Header from './Header'; // Make sure you import the header
import SideBar from './SideBar'; // Make sure you import the sidebar

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transactions'); // Update the API endpoint if necessary
        setTransactions(response.data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <>
      <Header />
      <SideBar />
      <div id="main" className="main">
        <h1>Transactions</h1>
        <TransactionTable transactions={transactions} />
      </div>
    </>
  );
};

export default Transactions;
