import React, { useState } from 'react';
import UserModal from './UserModal';

const UserList = ({ users, onFilter }) => {
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
    <div>
      <div>
        <input
          type="text"
          placeholder="Filtrar por nome, usuário ou email"
          value={filter}
          onChange={handleFilterChange}
        />
        <button onClick={handleCreate}>Criar Novo Usuário</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Usuário</th>
            <th>Email</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {!(filter != '' && users.length == 0) ? users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{`${user.address.street}, ${user.address.suite}, ${user.address.city}`}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Editar</button>
                <button onClick={() => handleDelete(user)}>Excluir</button>
              </td>
            </tr>
          )): <p>Usuário não encontrado :(</p>}
        </tbody>
      </table>
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
