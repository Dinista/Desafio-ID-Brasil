import React from 'react';
import { useAuth } from '../context/Auth';

const Navbar = () => {
  const { user, logout} = useAuth();
  
  return (
    <nav>
      <p>{user.name} </p>
      <p>{user.email}</p>
      <button onClick={logout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
