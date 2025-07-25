import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Form.css'; 

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/users/`;

function RegisterPage() {
  const [name, setName] = useState('');
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
      await axios.post(API_URL, { name, email, password });
      
      alert('Cadastro realizado com sucesso! Agora você pode fazer o login.');
      navigate('/login'); 

    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Este e-mail já está cadastrado.');
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
        <h2>Página de Cadastro</h2>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          minLength={6} 
          required
        />
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="form-footer">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;