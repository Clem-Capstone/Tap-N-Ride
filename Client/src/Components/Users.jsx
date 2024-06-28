import React from 'react';
import UsersTable from './UsersTable';
import './css/users.css';
import Header from './Header';
import SideBar from './SideBar';



const Users = () => {
  return (
    <>
      <Header />
      <div className="app-layout">
        <SideBar />
        <div className="main-content">
          <h1>Users</h1>
          <UsersTable />
        </div>
      </div>
    </>
  );
};

export default Users;
