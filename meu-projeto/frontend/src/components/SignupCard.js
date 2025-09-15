import React, { useState } from "react";

const baseURL = "http://localhost:3001/api";

const SignupCard = ({ onClose }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    if (senha !== confirmarSenha) {
      setMsg("As senhas não coincidem");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${baseURL}/cadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setMsg("Cadastro realizado com sucesso!");
        setTimeout(() => onClose(), 2000);
      } else {
        setMsg(data.error || "Erro no cadastro");
      }
    } catch (error) {
      setMsg("Erro no cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      {msg && <p className="msg">{msg}</p>}
      <button className="back" onClick={onClose}>
        Voltar
      </button>
    </div>
  );
};

export default SignupCard;