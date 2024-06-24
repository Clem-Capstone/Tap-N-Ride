// SideBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './css/sideBar.css';

function SideBar() {
    return (
        <aside id='sidebar' className='sidebar'>
            <ul className='sidebar-nav' id='sidebar-nav'>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

<<<<<<< HEAD
                {/* Documents Section */}
                <li className="nav-item">
                    <a 
                        className="nav-link collapsed"
                        data-bs-target="#documents-nav"  // Ensure this is unique
                        data-bs-toggle="collapse"
                        href="#"
                        aria-expanded="false"  // Ensures proper ARIA handling
                    >
                        <i className="bi bi-menu-button-wide"></i>
                        <span>Documents</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul
                        id="documents-nav"  // Ensure this is unique
                        className="nav-content collapse"
                        data-bs-parent="#sidebar-nav"
                    >
                        {/* Individual document items here */}
                        <li><a href="#"><i className="bi bi-circle"></i><span>Example Doc 1</span></a></li>
                    </ul>
                </li>

                {/* Transactions Section */}
                <li className="nav-item">
                     <Link className="nav-link" to="/transactions">
                     <i className="bi bi-menu-button-wide"></i>
                     <span>Transactions</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
=======
            <li className="nav-item">
                <a className="nav-link" href="/dashboard">
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


            {/* <li className="nav-item">
                <a 
                    className="nav-link collapsed"
                    data-bs-target="#components-nav"
                    data-bs-toggle="collapse"
                    href="#"
                >
                    <i className="bi bi-menu-button-wide"></i>
                    <span>Transactions</span>
                    <i className="bi bi-chevron-down ms-auto"></i>
                </a>
            </li> */}

        </ul>
    </aside>;

    
>>>>>>> main
}

export default SideBar;
