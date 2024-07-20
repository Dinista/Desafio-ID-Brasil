import React, { useState, useEffect } from 'react';
import { createUser, updateUser, deleteUser } from '../services/ApiUsers';

const UserModal = ({ type, user, onClose }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState(null); // erro ações


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
                alert("Foi criado com sucesso!")
                onClose();

        } else if (type === 'edit') {
                await updateUser(user.id, newUser);
                // Editou Usuário
                alert("Foi editado com sucesso!")
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
    
    const handleSubmit = (e) => {
        e.preventDefault();
  

        if(validateModalForm()){
          handleSave();
        }
    };



  return (
    <div>
      <div>
        <h2>{type === 'create' ? 'Criar Usuário' : type === 'edit' ? 'Editar Usuário' : 'Excluir Usuário'}</h2>
        {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
        {type !== 'delete' ? (
          <form onSubmit={handleSubmit}> 
            <div>
              <label>Nome:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {formErrors.name && <p className="error">{formErrors.name}</p>}
            </div>
            <div>
              <label>Nome de Usuário:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                //required={type === 'create'} // obrigatorio para criação
                //minLength={2}
              />
              {formErrors.username && <p className="error">{formErrors.username}</p>}
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                //required={type === 'create'} // obrigatorio para criação
              />
              {formErrors.email && <p className="error">{formErrors.email}</p>}
            </div>
            <div>
              <label>Rua:</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                //required={type === 'create'} // obrigatorio para criação
              />
              {formErrors.address.street && <p className="error">{formErrors.address.street}</p>}
            </div>
            <div>
              <label>Número:</label>
              <input
                type="text"
                value={suite}
                onChange={(e) => setSuite(e.target.value)}
                //required={type === 'create'} // obrigatorio para criação
              />
              {formErrors.address.suite && <p className="error">{formErrors.address.suite}</p>}
            </div>
            <div>
              <label>Cidade:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                //required={type === 'create'} // obrigatorio para criação
              />
              {formErrors.address.city && <p className="error">{formErrors.address.city}</p>}
            </div>
            <div>
              <button type="submit">
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
