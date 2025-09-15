// src/services/api.js
import { API_BASE_URL } from "../config/api";

// Função utilitária para requisições
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Erro na requisição:", error);
    throw error;
  }
};

// Serviços de autenticação
export const authService = {
  async cadastrar(usuario) {
    return apiRequest("/auth/register", {
      method: "POST",
      body: usuario,
    });
  },

  async login(credenciais) {
    return apiRequest("/auth/login", {
      method: "POST",
      body: credenciais,
    });
  },

  async logout() {
    return apiRequest("/auth/logout", {
      method: "POST",
    });
  },
};

// Serviço de saúde da API
export const healthService = {
  async check() {
    return apiRequest("/health");
  },
};

export default apiRequest;
