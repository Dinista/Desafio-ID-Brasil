import React, { useState } from 'react';
import "./Login.css";
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faUserShield, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('Admin');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
    };

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório.';
    } else if (name.length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório.';
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Email inválido.';
      }
    }

    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória.';
    } else if (password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres.';
    } else {
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
      if (!passwordRegex.test(password)) {
        newErrors.password = 'Senha deve ter um número e um caractere especial.';
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      login({ name, email, userRole });
      navigate('/userlist');
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <div>
        <div className='input-field'>
          <FontAwesomeIcon icon={faUser} />
          <input
            id="name"
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className= {errors.name && "input-error"}
          />
        </div>
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <div className='input-field'>
        <FontAwesomeIcon icon={faEnvelope} />
        <input
          id="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className= {errors.email && "input-error"}
        />
        </div>
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <div className='input-field'>
          <FontAwesomeIcon icon={faLock} />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className= {errors.password && "input-error"}
          />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle"
        >
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </button>
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div className='input-field'>
        
        <FontAwesomeIcon icon={faUserShield} />
        <select
          id="userRole"
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
        >
          <option value="Admin">Admin</option>
          <option value="User">Usuário</option>
        </select>
      </div>
      <button type="submit" className='button-login'>Entrar</button>
    </form>
  );
};

export default Login;
