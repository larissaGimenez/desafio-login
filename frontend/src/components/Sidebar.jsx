import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        Meu App
      </div>
      <ul className="sidebar-menu">
        <li><Link to="/dashboard">Início</Link></li>
      </ul>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;