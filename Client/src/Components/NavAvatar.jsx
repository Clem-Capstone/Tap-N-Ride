import React from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from '../img/profile.png';

function NavAvatar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <li className="nav-item dropdown pe-3">
      <a 
        className="nav-link nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        <img src={profileImg} alt="Couldn't load image." className="rounded-circle" />
        <span className="d-none d-md-block dropdown-toggle ps-2">J.C Rubiato</span>
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li className="dropdown-header">
          <h6>Rubiato</h6>
          <span>Admin</span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a
            className="dropdown-item d-flex align-items-center" 
            href="/admin/profile"
          >
            <i className="bi bi-person"></i>
            <span>My Profile</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a 
            className="dropdown-item d-flex align-items-center"
            href="/profile">
            <i className="bi bi-gear"></i>
            <span>Account Settings</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a 
            className="dropdown-item d-flex align-items-center"
            href="/faqs">
            <i className="bi bi-question"></i>
            <span>Need Help?</span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a 
            className="dropdown-item d-flex align-items-center"
            href="#"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Log Out</span>
          </a>
        </li>
      </ul>
    </li>
  );
}

export default NavAvatar;
