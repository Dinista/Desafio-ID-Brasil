import React from 'react';
import Login from '../components/Login';
import './LoginPage.css'


const LoginPage = () => {
  return (
    <div className='login-page-container'>
      <div className='login-card'>
        <h1>Login</h1>
        <Login/>
      </div>
    </div>
);

}

export default LoginPage;
