import { useState } from "react";
import { registerUser } from "../api/api";

export default function RegisterForm() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);
    setMsg(res.message || res.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro</h2>
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="senha"
        placeholder="Senha"
        value={form.senha}
        onChange={handleChange}
      />
      <button type="submit">Cadastrar</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
