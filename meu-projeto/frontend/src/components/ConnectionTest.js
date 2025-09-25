import React, { useState, useEffect } from 'react';

export default function ConnectionTest() {
  const [status, setStatus] = useState('testing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/health");
      const data = await res.json();
      setStatus('success');
      setMessage(`✅ Backend conectado (Status: ${data.status})`);
    } catch (error) {
      setStatus('error');
      setMessage(`❌ Erro de conexão: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', margin: '10px', border: '1px solid #ccc' }}>
      <h3>Teste de Conexão Backend</h3>
      <p>Status: <strong>{status}</strong></p>
      <p>{message}</p>
      <button onClick={testConnection}>Testar Novamente</button>
    </div>
  );
}