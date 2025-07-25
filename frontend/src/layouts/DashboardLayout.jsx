import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiHome, FiGrid, FiMessageSquare, FiCalendar, FiStar, FiSettings, FiLogOut, FiChevronsLeft, FiChevronsRight, FiUser, FiUsers } from 'react-icons/fi';
import '../styles/Dashboard.css';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/users/me/`;

function DashboardLayout() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(true);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const userMenuRef = useRef(null); 

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuRef]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) { navigate('/login'); return; }
      try {
        const response = await axios.get(API_URL, { headers: { 'Authorization': `Bearer ${token}` } });
        setUser(response.data);
      } catch (error) {
        console.error('Sessão inválida:', error);
        localStorage.removeItem('accessToken');
        navigate('/login');
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="dashboard-layout">
      <aside className={`sidebar ${isMenuOpen ? '' : 'collapsed'}`}>
        <div className="logo-section">
            <Link to="/dashboard" className="logo-link">
                LOGO
            </Link>
        </div>

        <ul className="sidebar-menu">
          <li><Link to="/dashboard"><FiHome /> <span>Dashboard</span></Link></li>
          <li><Link to="/users"><FiUsers /> <span>Gerenciar Usuários</span></Link></li> 
        </ul>

        <button className="menu-toggle-button" onClick={() => setMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <><FiChevronsLeft /> <span>Fechar</span></> : <FiChevronsRight />}
        </button>
      </aside>

      <div className="main-content">
        <header className="main-content-header">
          <div /> 
          
          <div className="user-menu" ref={userMenuRef}>
            <button className="user-menu-button" onClick={() => setUserMenuOpen(!isUserMenuOpen)}>
              <img src={`https://api.dicebear.com/8.x/pixel-art/svg?seed=${user.name}`} alt="Avatar" />
              <span>{user.name}</span>
            </button>

            {isUserMenuOpen && (
              <div className="user-menu-dropdown">
                <a href="#"><FiUser /> Meu Perfil</a>
                <button onClick={handleLogout}><FiLogOut /> Sair</button>
              </div>
            )}
          </div>
        </header>
        
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;