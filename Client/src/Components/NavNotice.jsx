import React from 'react'

function NavNotice() {
    return (
        <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">2</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                    You have 0 notifications
                    <a href="#">
                        <span className="badge rounded-pill bg-primary p-2 ms-2">
                            View All
                        </span>
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                    <i className="bi bi-exclamation-circle text-warning"></i>
                    <div>
                        <h4>Pabama Testing....</h4>
                        <p>Backend API is currently unavailable. This is a sample text for the pabama dashboard notifications</p>
                        <p>300 years ago</p>
                    </div>
                </li>

                <li>
                    <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                    <i className="bi bi-exclamation-circle text-warning"></i>
                    <div>
                        <h4>Pabama Testing Sample #2....</h4>
                        <p>This data is temporary and should be dynamic in future developments</p>
                        <p>2000 B.C</p>
                    </div>
                </li>

            </ul>
        </li>
    )
}

export default NavNotice