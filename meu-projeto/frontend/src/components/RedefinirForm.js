import React, { useState } from "react";

const baseURL = "http://localhost:3001/api/auth";

export default function RedefinirSenhaForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      console.log("📤 Solicitação de redefinição:", { email });

      const res = await fetch(`${baseURL}/redefinir-senha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("📥 Status HTTP:", res.status, "🎯 Dados da resposta:", data);

      if (res.ok) {
        setMsg("✅ Instruções enviadas para seu email!");
        setEmail("");
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
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Redefinir Senha"}
      </button>

      {msg && (
        <p className={`msg ${msg.includes('✅') ? 'success' : 'error'}`}>
          {msg}
        </p>
      )}
    </form>
  );
}