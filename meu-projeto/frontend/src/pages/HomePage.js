import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Buscar informações do usuário
    const buscarUsuario = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/usuario', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUsuario(userData);
        } else {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    buscarUsuario();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!usuario) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="home-page">
      <Header usuario={usuario} onLogout={handleLogout} />
      <div className="container">
        <div className="welcome-section">
          <h1>Bem-vindo, {usuario.nome}!</h1>
          <p>Você está logado no sistema com o email: {usuario.email}</p>
          
          <div className="dashboard-cards">
            <div className="card">
              <h3>Perfil</h3>
              <p>Gerencie suas informações pessoais</p>
              <button onClick={() => navigate('/perfil')}>Acessar Perfil</button>
            </div>
            
            <div className="card">
              <h3>Usuários</h3>
              <p>Visualize todos os usuários do sistema</p>
              <button onClick={() => navigate('/usuarios')}>Ver Usuários</button>
            </div>
            
            <div className="card">
              <h3>Configurações</h3>
              <p>Configure suas preferências</p>
              <button onClick={() => navigate('/configuracoes')}>Configurar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}