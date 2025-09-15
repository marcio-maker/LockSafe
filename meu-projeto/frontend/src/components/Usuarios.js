import React, { useEffect, useState } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsuarios = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3001/api/usuarios", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (res.ok) {
          setUsuarios(data.users);
        } else {
          setMsg(`❌ Erro: ${data.error}`);
        }
      } catch (err) {
        console.error(err);
        setMsg("🌐 Erro de conexão");
      }
    };

    fetchUsuarios();
  }, [token]);

  return (
    <div>
      <h3>Lista de Usuários</h3>
      {msg && <p>{msg}</p>}
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.nome} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
