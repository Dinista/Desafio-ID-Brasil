import React, { useState, useEffect } from 'react';
import { createUser, updateUser, deleteUser } from '../services/ApiUsers';
import './UserModal.css';
import Loader from './Loader';

const UserModal = ({ type, user, onClose }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState(null); // erro ações

  const [done, setDone] = useState(true) // Verifica se terminou de receber a response da API


  const [formErrors, setformErrors] = useState({
    name : '',
      username : '',
      email : '',
      address: {
        street : '',
        suite: '',
        city : '',
      },
  });

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
                const data = await createUser(newUser);
                // Criou Usuário
                setDone(true);
                alert("Foi criado com sucesso!");
                onClose();
                

        } else if (type === 'edit') {
                await updateUser(user.id, newUser);
                // Editou Usuário
                setDone(true);
                alert("Foi editado com sucesso!")
                onClose();
        }
    }catch (error) {
        setDone(true);
        setError(error.message);
    }
};

// Handle de deletar Usuário

  const handleDelete = async () => {
        setDone(false);
        try {
            await deleteUser(user.id);
            // Deletou Usuário
            setDone(true);
            alert("O usuário foi deletado com sucesso!")
            onClose();
        } catch (error) {
            setDone(true);
            setError(error.message);
        }
    };

  // Validação do Forms de edição e criação

    const validateModalForm = () => {
      const newErrors = {
      name : '',
      username : '',
      email : '',
      address: {
        street : '',
        suite: '',
        city : '',
      },
    }

    const pascalCaseRegex = /^[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]+)*$/;

    // Verifica Nome
      
    if (!name.trim() && type === 'create' ) {
      newErrors.name = 'Nome é obrigatório.';
    }else if (name.length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres.';
    }else{
      
      if(!pascalCaseRegex.test(name)){
        newErrors.name = 'Nome deve estar em Pascal Case';
      }
    }

    // Verifica UserName

    if (!username.trim() && type === 'create' ) {
      newErrors.username = 'Nome de usuário é obrigatório.';
    }else if (username.length < 2) {
      newErrors.username = 'Nome deve ter pelo menos 2 caracteres.';
    }

    // Verifica E-mail

    if (!email.trim() && type === 'create' ) {
      newErrors.email = 'Email é obrigatório.';
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Email inválido.';
      }
    }

    // Verifica Rua
    
    
    if (!street.trim() && type === 'create' ) {
      newErrors.address.street = 'É obrigatório informar a rua.';
    } else if(!pascalCaseRegex.test(street)){
      newErrors.address.street = 'Rua deve estar em Pascal Case';
    }

    // Verifica Numero

    if (!suite.trim() && type === 'create' ) {
      newErrors.address.suite = 'É obrigatório informar o número.';
    } else if(suite.length < 1){
      newErrors.address.suite = 'Numero deve ter pelo menos 1 caracter';
    }

    // Verifica Cidade

    if (!city.trim() && type === 'create' ) {
      newErrors.address.city = 'É obrigatório informar a cidade.';
    } else if(!pascalCaseRegex.test(city)) {
      newErrors.address.city = 'Cidade deve estar em Pascal Case';
    }
      
      setformErrors(newErrors);

      return !hasErrors(newErrors);
    };

    // Função recursiva verificando erros em objeto aninhado

    function hasErrors(errors) {
      return Object.values(errors).some(value => {
        if (typeof value === 'object' && value !== null) {
          return hasErrors(value);
        }
        return !!value; // verifica se existe erro.
      });
    }

    // Handle de verificação Forms
    
    const handleSubmit = (e) => {
        e.preventDefault();
        

        if(validateModalForm()){
          setDone(false)
          handleSave();
        }
    };



  return (
    <div className='modal-container'>
      <div className='modal-window'>
        <h2>{type === 'create' ? 'Criar Usuário' : type === 'edit' ? 'Editar Usuário' : 'Excluir Usuário'}</h2>
        {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
        {type !== 'delete' ? (
          <form onSubmit={handleSubmit} className='form-modal'> 
            <div className="input-modal">
                <label>Nome</label>
                <input
                  className={formErrors.name ? "input-modal-it input-modal-it-error" : "input-modal-it"}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Informe o nome...'
                />
            </div>
            {formErrors.name && <p className="error-modal">{formErrors.name}</p>}
            <div className="input-modal">
              <label>Nome de Usuário</label>
              <input
                className= {formErrors.username ? "input-modal-it input-modal-it-error" : "input-modal-it"}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Informa o nome de usuário...'
              />
            </div>
            {formErrors.username && <p className="error-modal">{formErrors.username}</p>}
              <div className="input-modal">
                <label>Email</label>
                <input
                  className={formErrors.email ? "input-modal-it input-modal-it-error" : "input-modal-it"}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Infome um e-mail...'
                />
              </div>
              {formErrors.email && <p className="error-modal">{formErrors.email}</p>}
              <div className="input-modal">
                <label>Rua</label>
                <input
                  className={formErrors.address.street ? "input-modal-it input-modal-it-error" : "input-modal-it"}
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder='Infome a rua...'
                />
              </div>
              {formErrors.address.street && <p className="error-modal">{formErrors.address.street}</p>}
              <div className="input-modal">
                <label>Número</label>
                <input
                  className={formErrors.address.suite ? "input-modal-it input-modal-it-error" : "input-modal-it"}
                  type="text"
                  value={suite}
                  onChange={(e) => setSuite(e.target.value)}
                  placeholder='Infome o número...'
                />
              </div>
              {formErrors.address.suite && <p className="error-modal">{formErrors.address.suite}</p>}
              <div className="input-modal">
                <label>Cidade</label>
                <input
                  className= {formErrors.address.city ? "input-modal-it input-modal-it-error" : "input-modal-it"}
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder='Infome a cidade...'
                />
              </div>
              {formErrors.address.city && <p className="error-modal">{formErrors.address.city}</p>}
            <div className='btn-modal-container'>
              <button type="submit" className='btn-submit-edit'>
                {done ? 'Gravar' : <Loader/>}
              </button>
              <button type="button" onClick={onClose} className='btn-delete-edit'>
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p>Você tem certeza que quer <strong>excluir</strong> o usuário <strong>{user.name}</strong>?</p>
            <button onClick={handleDelete} className='btn-subimit-delete'>{done ? 'Confirmar' : <Loader/>}</button>
            <button onClick={onClose}>Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModal;
