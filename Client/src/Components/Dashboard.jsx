import React, { useEffect, useState } from 'react';
import axios from 'axios';

//import icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

//import Bootsrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Header from './Header';
import SideBar from './SideBar';
import Main from './Main';


const Dashboard = () => {
  return (
    <>
      <Header />
      <SideBar />
      <Main />
    </>
  );
};

export default Dashboard;
