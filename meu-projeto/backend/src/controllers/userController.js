import supabase from '../config/supabaseClient.js';

export const getProfile = async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('usuarios')
      .select('id, nome, email, created_at')
      .eq('id', req.user.userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { nome } = req.body;
    
    if (!nome || nome.trim().length < 2) {
      return res.status(400).json({ error: 'Nome deve ter pelo menos 2 caracteres' });
    }

    const { data: updatedUser, error } = await supabase
      .from('usuarios')
      .update({ nome: nome.trim() })
      .eq('id', req.user.userId)
      .select('id, nome, email, created_at')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    res.json({
      message: 'Perfil atualizado com sucesso',
      user: updatedUser
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
