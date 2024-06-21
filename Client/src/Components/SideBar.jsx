import React from 'react';
import './css/sideBar.css';

function SideBar() {
    return <aside id='sidebar' className='sidebar'>
        <ul className='sidebar-nav' id='sidebar-nav'>
            <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                    <i className="bi bi-grid"></i>
                    <span>Dashboard</span>
                </a>
            </li>

            <li className="nav-item">
                <a 
                    className="nav-link collapsed"
                    data-bs-target="#components-nav"
                    data-bs-toggle="collapse"
                    href="#"
                >
                    <i className="bi bi-menu-button-wide"></i>
                    <span>Documents</span>
                    <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul
                    id="components-nav"
                    className="nav-content collapse"
                    data-bs-parents="#sidebar-nav"
                >
                    {/* <li>
                        <a href="#">
                            <i className="bi bi-circle"></i>
                            <span>Admins</span>
                        </a>
                    </li> */}
                </ul>
            </li>

            <li className="nav-item">
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
            </li>

        </ul>
    </aside>;

    
}

export default SideBar;