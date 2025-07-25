// frontend/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Form.css'; 

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/token`;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');   

    try {
      const params = new URLSearchParams();
      params.append('username', email);
      params.append('password', password);

      const response = await axios.post(API_URL, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      localStorage.setItem('accessToken', response.data.access_token);
      navigate('/dashboard');

    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('E-mail ou senha inválidos.');
      } else {
        setError('Ocorreu um erro. Tente novamente mais tarde.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Página de Login</h2>
        
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {/* Mostra a mensagem de erro, se houver */}
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" disabled={loading}>
          {/* Muda o texto do botão durante o loading */}
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="form-footer">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;