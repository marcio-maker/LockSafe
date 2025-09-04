import supabase from "../config/db.js";

export const getUsers = async (req, res) => {
  const { data, error } = await supabase.from("usuarios").select("id, nome, email, created_at");

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};
