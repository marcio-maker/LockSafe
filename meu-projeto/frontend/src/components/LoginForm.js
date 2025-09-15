import React, { useState } from "react";

const baseURL = "http://localhost:3001/api/auth";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      console.log("📤 Dados sendo enviados:", { email, senha });

      const res = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: senha.trim() }),
      });

      const data = await res.json();
      console.log("📥 Status HTTP:", res.status, "🎯 Dados da resposta:", data);

      if (res.ok) {
        setMsg("✅ Login realizado com sucesso!");
        localStorage.setItem("token", data.token);
        if (onLogin) onLogin(data.user, data.token);
        setEmail("");
        setSenha("");
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
      
      <label>
        <input
          type="checkbox"
          checked={showSenha}
          onChange={() => setShowSenha(!showSenha)}
        />
        Mostrar senha
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Login"}
      </button>

      {msg && <p className="msg">{msg}</p>}
    </form>
  );
}