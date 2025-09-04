import supabase from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validatePassword } from "../utils/validatePassword.js";

const codes = {};

export const register = async (req, res) => {
  const { nome, email, senha, confirmacao } = req.body;

  if (senha !== confirmacao)
    return res.status(400).json({ error: "Senhas não conferem" });

  if (!validatePassword(senha))
    return res.status(400).json({ error: "Senha fraca. Use 8+ chars, maiúscula, minúscula e número." });

  const hashed = await bcrypt.hash(senha, 10);

  const { error } = await supabase.from("usuarios").insert([
    { nome, email, senha: hashed }
  ]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Usuário cadastrado com sucesso!" });
};

export const login = async (req, res) => {
  const { email, senha } = req.body;

  const { data: user, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) return res.status(404).json({ error: "Usuário não encontrado" });

  const valid = await bcrypt.compare(senha, user.senha);
  if (!valid) return res.status(401).json({ error: "Senha incorreta" });

  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
};
