import React, { useState } from 'react';
import './UserList.css';
import UserModal from './UserModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserList = ({ users, onFilter, isAdmin}) => {
  const [filter, setFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState('');

  //console.log(users)
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    onFilter(e.target.value);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalType('edit');
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setModalType('delete');
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setModalType('create');
  };

  return (
    <div className='user-list-card'>
      <div className='header-list-card'>
        <div className='input-list'>
          <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Filtrar por nome, usuário ou email"
              value={filter}
              onChange={handleFilterChange}
              className='input-list-search'
            />
          
      </div>
        {isAdmin && <button onClick={handleCreate} className='create-user-btn'>Criar Novo Usuário</button>}
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Usuário</th>
            <th>Email</th>
            <th>Endereço</th>
            {isAdmin && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {!(filter != '' && users.length == 0) ? users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{`${user.address.street}, ${user.address.suite}, ${user.address.city}`}</td>
              { isAdmin &&
              <td>
                <button onClick={() => handleEdit(user)} className='btn-edit'><FontAwesomeIcon icon={faEdit} /> Editar</button>
                <button onClick={() => handleDelete(user)} className='btn-delete'><FontAwesomeIcon icon={faTrash} /> Excluir</button>
              </td>
              }
            </tr>
          )): ""}
        </tbody>
      </table>
      {(filter != '' && users.length == 0) ? <p className='user-not-found'>Usuário não encontrado  :( </p> : ""}
      {modalType && (
        <UserModal
          type={modalType}
          user={selectedUser}
          onClose={() => setModalType('')}
      />
    )}
    </div>
  );
};

export default UserList;
