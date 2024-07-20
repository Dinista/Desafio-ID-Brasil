import React, { useState, useEffect } from 'react';
import { createUser, updateUser, deleteUser } from '../services/ApiUsers';

const UserModal = ({ type, user, onClose }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setUsername(user.username || '');
      setEmail(user.email || '');
      setStreet(user.address.street || '');
      setSuite(user.address.suite || '');
      setCity(user.address.city || '');
    }
  }, [user]);


  
  // Handle de criação e edição


  const handleSave = async () => {
    const newUser = {
      name,
      username,
      email,
      address: {
        street,
        suite,
        city,
      },
    };
    try {
        if (type === 'create') {
                // console.log(newUser)
                const data = await createUser(newUser);
                // Criou Usuário
                console.log(data)
                onClose();

        } else if (type === 'edit') {
                await updateUser(user.id, newUser);
                // Editou Usuário
                onClose();
        }
    }catch (error) {
        setError(error.message);
    }
};


  const handleDelete = async () => {
        try {
            await deleteUser(user.id);
            // Deletou Usuário
            alert("O usuário foi deletado com sucesso!")
            onClose();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        handleSave();
    }


  return (
    <div>
      <div>
        <h2>{type === 'create' ? 'Criar Usuário' : type === 'edit' ? 'Editar Usuário' : 'Excluir Usuário'}</h2>
        {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
        {type !== 'delete' ? (
          <form>
            <div>
              <label>Nome:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={type === 'create'} // obrigatorio para criação
                minLength={2}
              />
            </div>
            <div>
              <label>Nome de Usuário:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={type === 'create'} // obrigatorio para criação
                minLength={2}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={type === 'create'} // obrigatorio para criação
              />
            </div>
            <div>
              <label>Rua:</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required={type === 'create'} // obrigatorio para criação
              />
            </div>
            <div>
              <label>Número:</label>
              <input
                type="text"
                value={suite}
                onChange={(e) => setSuite(e.target.value)}
                required={type === 'create'} // obrigatorio para criação
              />
            </div>
            <div>
              <label>Cidade:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required={type === 'create'} // obrigatorio para criação
              />
            </div>
            <div>
              <button type="button" onClick={handleSave}>
                Gravar
              </button>
              <button type="button" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p>Você tem certeza que quer excluir o usuário {user.name}?</p>
            <button onClick={handleDelete}>Confirmar</button>
            <button onClick={onClose}>Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModal;
