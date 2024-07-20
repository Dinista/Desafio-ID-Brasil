import React from 'react';
import './Navbar.css';
import { useAuth } from '../context/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faUserShield } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className='nav-container'>
    <nav>
      <h1 className='nav-title'>Listagem</h1>
        <div className='nav-info'>
          <div className='nav-user'>
            <FontAwesomeIcon icon={faUser} />
            <p>{user.name}</p>
          </div>
          <div className='nav-email'>
            <FontAwesomeIcon icon={faEnvelope} />
            <p>{user.email}</p>
          </div>
          <div className='nav-role'>
            <FontAwesomeIcon icon={faUserShield} />
            <p>{user.userRole}</p>
          </div>
          <button className = 'logout-btn' onClick={logout}>
            Logout
          </button>
        </div>
    </nav>
    </div>
  );
};

export default Navbar;
