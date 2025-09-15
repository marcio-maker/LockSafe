export const API_BASE_URL = "http://localhost:3001/api";

export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

export const getProfile = async (token) => {
  const res = await fetch(`${API_BASE_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
