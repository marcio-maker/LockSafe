import { useEffect, useState } from 'react'

function App() {
  const [health, setHealth] = useState(null)
  const [registerResult, setRegisterResult] = useState(null)

  // Teste da rota health
  const testHealth = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/health')
      const data = await response.json()
      setHealth(data)
      console.log('✅ Health:', data)
    } catch (error) {
      console.error('❌ Health error:', error)
    }
  }

  // Teste de registro COM O CAMPO CORRETO "senha"
  const testRegister = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: 'Usuario Teste',
          email: `teste${Math.random().toString(36).substring(7)}@email.com`, // Email único
          senha: 'senha123' // ✅ Campo CORRETO: "senha" (não "password")
        })
      })
      const data = await response.json()
      setRegisterResult(data)
      console.log('✅ Register:', data)
    } catch (error) {
      console.error('❌ Register error:', error)
    }
  }

  useEffect(() => {
    testHealth()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>🔒 LockSafe - Teste de Conexão</h1>
      
      <button onClick={testHealth} style={{ margin: '10px', padding: '10px' }}>
        🩺 Testar Health
      </button>

      <button onClick={testRegister} style={{ margin: '10px', padding: '10px' }}>
        📝 Testar Registro
      </button>

      {health && (
        <div style={{ color: 'green', margin: '10px' }}>
          <h3>✅ Health Check:</h3>
          <pre>{JSON.stringify(health, null, 2)}</pre>
        </div>
      )}

      {registerResult && (
        <div style={{ 
          color: registerResult.message ? 'green' : 'red', 
          margin: '10px' 
        }}>
          <h3>📝 Resultado Registro:</h3>
          <pre>{JSON.stringify(registerResult, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App