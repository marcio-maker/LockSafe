import { supabase } from '../config/supabaseClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authController = {
  // Registro de usuário
  async register(req, res) {
    try {
      console.log('📥 Dados recebidos:', req.body);
      
      const { nome, email, senha } = req.body;

      // Verificar se usuário já existe
      console.log('🔍 Verificando usuário existente...');
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Erro na verificação:', checkError);
        throw checkError;
      }

      if (existingUser) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }

      // Criptografar senha
      const hashedPassword = await bcrypt.hash(senha, 10);

      // Criar usuário no Supabase
      console.log('📝 Criando usuário...');
      const { data: user, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            nome,
            email,
            senha: hashedPassword
          }
        ])
        .select()
        .single();

      if (insertError) {
        console.error('Erro ao criar usuário:', insertError);
        throw insertError;
      }

      console.log('✅ Usuário criado:', user);

      // Gerar token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'seu-segredo-aqui',
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email
        },
        token
      });

    } catch (error) {
      console.error('❌ Erro no registro:', error);
      res.status(500).json({ error: 'Erro interno do servidor: ' + error.message });
    }
  },

  // Login de usuário
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      // Buscar usuário no Supabase
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (userError || !user) {
        return res.status(400).json({ error: 'Credenciais inválidas' });
      }

      // Verificar senha
      const validPassword = await bcrypt.compare(senha, user.senha);
      if (!validPassword) {
        return res.status(400).json({ error: 'Credenciais inválidas' });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'seu-segredo-aqui',
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email
        },
        token
      });

    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};

export { authController };