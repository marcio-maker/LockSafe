import React from "react";

const Header = ({ usuario, onLogout }) => (
  <header className="header">
    <h1>Meu App</h1>
    {usuario && (
      <div className="user-info">
        <span>Olá, {usuario.nome}</span>
        <button onClick={onLogout} className="logout-btn">
          Sair
        </button>
      </div>
    )}
  </header>
);

export default Header;