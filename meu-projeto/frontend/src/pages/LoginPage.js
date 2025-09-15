import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Verificar se já está logado
    const token = localStorage.getItem('token');
    const usuarioSalvo = localStorage.getItem('usuario');
    
    if (token && usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
      navigate('/');
    }
  }, [navigate]);

  const handleLoginSuccess = (userData) => {
    // Redirecionar para home após login bem-sucedido
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
  };

  return (
    <div className="login-page">
      <Header usuario={usuario} onLogout={handleLogout} />
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <h2>Login</h2>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            <div className="auth-links">
              <p>
                Não tem uma conta?{' '}
                <span 
                  onClick={() => navigate('/signup')} 
                  className="link"
                  style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}
                >
                  Cadastre-se
                </span>
              </p>
              <p>
                <span 
                  onClick={() => navigate('/redefinir-senha')} 
                  className="link"
                  style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}
                >
                  Esqueci minha senha
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}