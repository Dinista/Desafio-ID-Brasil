import React, { useState } from 'react';
import "./Login.css"
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('User');
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
    }else if (name.length < 2) {
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          // required
          // minLength={2}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // required
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // required
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Esconder' : 'Mostrar'} Senha
        </button>
      </div>
      <div>
        <label htmlFor="userRole">Nível de Usuário:</label>
        <select
          id="userRole"
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
        >
          <option value="Admin">Admin</option>
          <option value="User">Usuário</option>
        </select>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
