// frontend/src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/users/me/`;

function DashboardPage() {
  const [user, setUser] = useState(null); // Estado para guardar os dados do usuário
  const navigate = useNavigate();

  // useEffect será executado uma vez, quando o componente carregar
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. Pega o token salvo no localStorage
        const token = localStorage.getItem('accessToken');

        if (!token) {
          // Se não houver token, redireciona para o login
          navigate('/login');
          return;
        }

        // 2. Faz a chamada para a rota protegida, enviando o token no cabeçalho
        const response = await axios.get(API_URL, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // 3. Salva os dados do usuário no estado
        setUser(response.data);

      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        // Se o token for inválido ou expirar, o erro 401 cairá aqui
        alert('Sua sessão expirou. Por favor, faça login novamente.');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]); // O array de dependências com 'navigate'

  // Enquanto os dados não chegam, mostra uma mensagem de carregamento
  if (!user) {
    return <div style={{ padding: '50px' }}>Carregando...</div>;
  }

  // Quando os dados chegarem, mostra a mensagem de boas-vindas
  return (
    <div style={{ padding: '50px' }}>
      <h1>Bem-vindo(a), {user.name}!</h1>
      <p>Seu e-mail cadastrado é: {user.email}</p>
      {/* Aqui poderíamos adicionar um botão de Logout no futuro */}
    </div>
  );
}

export default DashboardPage;