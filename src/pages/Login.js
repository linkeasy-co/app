import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.scss';
import { useSnackbar } from '../components/SnackBar';

const Login = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Ativa o loading
    try {
      const firstAcess = localStorage.getItem('first_acess')
      await login({ email, password });
      if (firstAcess === 'true') navigate('/profile');
      else navigate('/dashboard');
      localStorage.removeItem('first_acess');
    } catch (error) {
      showSnackbar('Email ou senha inválidos');
    } finally {
      setLoading(false); // Desativa o loading após o processo de login
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading} // Desativa o campo enquanto carrega
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading} // Desativa o campo enquanto carrega
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <div className="spinner"></div> : 'Entrar'} {/* Mostra o spinner durante o loading */}
        </button>
      </form>
    </div>
  );
};

export default Login;
