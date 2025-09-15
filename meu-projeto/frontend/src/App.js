import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm.js";
import CadastroForm from "./components/CadastroForm.js";
import RedefinirForm from "./components/RedefinirForm.js";
import Usuarios from "./components/Usuarios.js";
import Header from "./components/Header.js";
import "./styles/styles.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("login");
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Verificar autenticação ao carregar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("usuario");
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData, authToken) => {
    setUsuario(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("usuario", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setActiveTab("login");
  };

  return (
    <div className="container" id="mainContainer">
      <Header usuario={usuario} onLogout={handleLogout} />
      
      <div className="content-wrapper">
        <h2>Sistema de Autenticação</h2>
        
        {!token ? (
          <>
            <div className="tabs">
              {["login", "cadastro", "redefinir"].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === "login" && <LoginForm onLogin={handleLogin} />}
            {activeTab === "cadastro" && <CadastroForm />}
            {activeTab === "redefinir" && <RedefinirForm />}
          </>
        ) : (
          <>
            <div className="welcome-section">
              <h3>Bem-vindo, {usuario?.nome}!</h3>
              <div className="tabs">
                <button
                  className={`tab-btn ${activeTab === "usuarios" ? "active" : ""}`}
                  onClick={() => setActiveTab("usuarios")}
                >
                  Ver Usuários
                </button>
              </div>
            </div>
            
            {activeTab === "usuarios" && <Usuarios />}
          </>
        )}
      </div>
    </div>
  );
}