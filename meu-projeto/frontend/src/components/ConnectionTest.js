import React, { useState, useEffect } from 'react';
import { healthService } from '../services/api';

export default function ConnectionTest() {
  const [status, setStatus] = useState('testing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const data = await healthService.check();
      setStatus('success');
      setMessage(`✅ ${data.message} (${data.timestamp})`);
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