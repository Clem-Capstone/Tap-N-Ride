// SideBar.jsx
import React from 'react';
import './css/sideBar.css';

function SideBar() {
    
  return (
    <aside id='sidebar' className='sidebar'>
      <ul className='sidebar-nav' id='sidebar-nav'>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/transactions">
            <i className="bi bi-cash-coin"></i>
            <span>Transactions</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/admins">
            <i className="bi bi-person"></i>
            <span>Admins</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default SideBar;
