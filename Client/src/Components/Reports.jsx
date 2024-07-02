import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReportTable from './ReportTable';
import './css/reports.css';
import Header from './Header';
import SideBar from './SideBar';

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/reports');
        setReports(response.data);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <>
      <Header />
      <SideBar />
      <div id="main" className="main">
        <h1>Travel Details</h1>
        <ReportTable reports={reports} />
      </div>
    </>
  );
};

export default Reports;
