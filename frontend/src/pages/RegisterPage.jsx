import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/users/`;

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(API_URL, { name, email, password });
      
      console.log('Usuário cadastrado com sucesso!', response.data);
      alert('Cadastro realizado com sucesso!');

    } catch (error) {
      if (error.response) {
        console.error('Ocorreu um erro no cadastro:', error.response.data);
        alert(`Erro no cadastro: ${error.response.data.detail}`);
      } else if (error.request) {
        console.error('Erro de rede:', error.message);
        alert('Não foi possível conectar ao servidor. Verifique se a API está rodando.');
      } else {
        console.error('Erro:', error.message);
        alert('Ocorreu um erro inesperado.');
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h2>Página de Cadastro</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;