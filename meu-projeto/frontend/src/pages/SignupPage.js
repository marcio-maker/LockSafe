import React, { useEffect } from 'react';
import Header from '../components/Header';
import CadastroForm from '../components/CadastroForm';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se já está logado
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSignupSuccess = () => {
    // Redirecionar para login após cadastro bem-sucedido
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="signup-page">
      <Header />
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <h2>Criar Conta</h2>
            <CadastroForm onSignupSuccess={handleSignupSuccess} />
            <div className="auth-links">
              <p>
                Já tem uma conta?{' '}
                <span 
                  onClick={() => navigate('/login')} 
                  className="link"
                >
                  Faça login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}