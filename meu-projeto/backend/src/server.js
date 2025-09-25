import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { supabase } from "./config/supabaseClient.js";

const app = express();

// ✅ CORS - permite TODAS as origens
app.use(cors({ 
  origin: "http://localhost:3000"  // Apenas porta 3000
}));

app.use(express.json());

// ✅ Rotas principais
app.use("/api/auth", authRoutes);

// ✅ Health Check
app.get("/api/health", (req, res) => res.json({ 
  status: "ok", 
  message: "Backend LockSafe operacional",
  timestamp: new Date().toISOString()
}));

// ✅ Rota para listar usuários (para o componente Usuarios.js)
app.get("/api/usuarios", async (req, res) => {
  try {
    console.log("📋 Listando usuários...");
    
    const { data: users, error } = await supabase
      .from('users')
      .select('id, nome, email, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("❌ Erro ao buscar usuários:", error);
      throw error;
    }

    console.log(`✅ ${users.length} usuários encontrados`);
    res.json({ users });

  } catch (error) {
    console.error("❌ Erro na rota /api/usuarios:", error);
    res.status(500).json({ error: "Erro ao buscar usuários: " + error.message });
  }
});

// ✅ Rota de perfil do usuário (para o api.js)
app.get("/api/users/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: "Token de autenticação necessário" });
    }

    // Aqui você pode validar o JWT e buscar o usuário específico
    // Por enquanto, retornamos uma mensagem de sucesso
    res.json({ 
      message: "Perfil do usuário",
      user: { id: "user-id", nome: "Usuário Teste", email: "teste@email.com" }
    });

  } catch (error) {
    console.error("❌ Erro no perfil:", error);
    res.status(500).json({ error: "Erro ao buscar perfil" });
  }
});

// ✅ Rota de redefinição de senha (para o RedefinirForm.js)
app.post("/api/auth/redefinir-senha", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("🔐 Solicitação de redefinição para:", email);

    // Aqui você implementaria o envio de email
    // Por enquanto, retornamos sucesso
    res.json({ 
      message: "Instruções de redefinição enviadas para seu email",
      email: email
    });

  } catch (error) {
    console.error("❌ Erro na redefinição:", error);
    res.status(500).json({ error: "Erro ao processar solicitação" });
  }
});

// ✅ Rota padrão
app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 LockSafe API está rodando!",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      health: "/api/health",
      usuarios: "/api/usuarios",
      profile: "/api/users/profile"
    }
  });
});

// ✅ Middleware de erro global
app.use((error, req, res, next) => {
  console.error("💥 Erro global:", error);
  res.status(500).json({ error: "Erro interno do servidor" });
});

// ✅ Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend LockSafe rodando na porta ${PORT}`);
  console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`👥 Usuários: http://localhost:${PORT}/api/usuarios`);
});