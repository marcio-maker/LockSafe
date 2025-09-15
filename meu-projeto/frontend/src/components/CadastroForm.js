import React, { useState } from "react";

const baseURL = "http://localhost:3001/api/auth"; // CORRIGIDO

export default function CadastroForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    // Validação de senha
    if (senha.trim() !== confirmarSenha.trim()) {
      setMsg("❌ As senhas não coincidem");
      setLoading(false);
      return;
    }

    try {
      console.log("📤 Dados sendo enviados:", { nome, email, senha });

      const res = await fetch(`${baseURL}/register`, { // rota agora é /register
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha: senha.trim() }),
      });

      const data = await res.json();
      console.log("📥 Status HTTP:", res.status, "🎯 Dados da resposta:", data);

      if (res.ok) {
        setMsg("✅ Cadastro realizado com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");
      } else {
        setMsg(`❌ Erro: ${data.error || `Status ${res.status}`}`);
      }
    } catch (error) {
      console.error("💥 Erro completo:", error);
      setMsg("🌐 Erro de conexão. Verifique o console para detalhes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        placeholder="Nome completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type={showSenha ? "text" : "password"}
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type={showSenha ? "text" : "password"}
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
        required
        disabled={loading}
      />

      <label>
        <input
          type="checkbox"
          checked={showSenha}
          onChange={() => setShowSenha(!showSenha)}
        />
        Mostrar senha
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>

      {msg && <p className="msg">{msg}</p>}
    </form>
  );
}
