import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import UserListPage from './pages/UserListPage.jsx';
import { AuthProvider, useAuth } from './context/Auth.jsx';

const App = () => {
  const { user } = useAuth();
  return (
      <Routes>
          <Route 
          index
          element={ user ? <Navigate to="/userlist" /> : <Navigate to="/login" />}
          />
        <Route path="/login" element={user ? <Navigate to="/userlist" /> : <LoginPage />} />
        <Route path="/userlist" element={user ? <UserListPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
  );
};

export default App;


