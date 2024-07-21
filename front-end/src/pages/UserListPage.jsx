import React, { useState, useEffect } from 'react';
import './UserListPage.css'
import Navbar from '../components/Navbar';
import { useAuth } from '../context/Auth';
import UserList from '../components/UserList';
import { getUsers } from '../services/ApiUsers';


const UserListPage = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        setError(error.message);
      }
    };
    
    fetchUsers();
  
  }, []);

  // Definição dos filtros
  // filterInput: String
  
  const handleFilter = (filterInput) => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(filterInput.toLowerCase()) ||
      user.username.toLowerCase().includes(filterInput.toLowerCase()) ||
      user.email.toLowerCase().includes(filterInput.toLowerCase())
    );
    setFilteredUsers(filtered);
  };
  
  console.log(isAdmin());

  return (
    <section className='list-page-padding'>
      <Navbar />
      <div className='list-page-container'>
        { error ? <div className='error error-userlist-load'>{error}</div> :
            <UserList users={filteredUsers} onFilter={handleFilter} isAdmin = {isAdmin()}/>
        }
      </div>
      
      </section>
  );
}

export default UserListPage;

