// frontend/src/pages/UsersPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import '../styles/UsersPage.css';

const API_URL = import.meta.env.VITE_API_BASE_URL;

function UsersPage() {
  const [users, setUsers] = useState([]);
  
  const fetchUsers = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(`${API_URL}/users/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      alert("Não foi possível carregar a lista de usuários.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      const token = localStorage.getItem('accessToken');
      try {
        await axios.delete(`${API_URL}/users/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        alert('Usuário excluído com sucesso!');
        fetchUsers();
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        alert('Falha ao excluir usuário.');
      }
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Gerenciar Usuários</h1>
        <button className="add-user-btn" onClick={() => alert('Funcionalidade de Adicionar não implementada. Use a página de Cadastro.')}>
          <FiPlus /> Adicionar Usuário
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="action-btn edit-btn" onClick={() => alert('Funcionalidade de Editar não implementada.')}>
                    <FiEdit />
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(user.id)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersPage;