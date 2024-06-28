// SideBar.jsx
import React from 'react';
import './css/sideBar.css';

function SideBar() {
    return <aside id='sidebar' className='sidebar'>
        <ul className='sidebar-nav' id='sidebar-nav'>
            <li className="nav-item">
                <a className="nav-link" href="/">
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
                    <i className="bi bi-person-lock"></i>
                    <span>Admins</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/users">
                    <i className="bi bi-people"></i>
                    <span>Users/Card Holders</span>
                </a>
            </li>
             
            

        </ul>
    </aside>;
  
}

export default SideBar;
