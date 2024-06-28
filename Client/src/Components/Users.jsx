import React from 'react';
import UsersTable from './UsersTable';
import './css/users.css';
import Header from './Header';
import SideBar from './SideBar';



const Users = () => {
  return (
    <>
      <Header />
        <SideBar />
        <div id= "main" className="main">
          <h1>Users</h1>
          <UsersTable />
        </div>
     
    </>
  );
};

export default Users;
