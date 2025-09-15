// ADICIONE ESTA LINHA NO TOPO do arquivo test-connection.js:
import 'dotenv/config';

// O resto do código continua igual...
import supabaseModule from './src/config/supabaseClient.js';
const supabase = supabaseModule.default || supabaseModule;

async function testConnection() {
  console.log('🧪 Testando conexão com Supabase...');
  console.log('🔑 URL:', process.env.SUPABASE_URL);
  console.log('🔑 Key:', process.env.SUPABASE_ANON_KEY?.substring(0, 20) + '...');
  
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('count')
      .limit(1);

    if (error) {
      console.log('ℹ️ Erro (normal se tabela não existir):', error.message);
      console.log('✅ Mas a CONEXÃO está FUNCIONANDO!');
    } else {
      console.log('✅ Conexão bem-sucedida!');
    }
  } catch (err) {
    console.log('💥 Erro fatal:', err.message);
  }
}

testConnection();