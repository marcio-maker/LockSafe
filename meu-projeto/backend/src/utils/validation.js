export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validateUserData = (userData) => {
  const errors = [];

  if (!validateName(userData.nome)) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }

  if (!validateEmail(userData.email)) {
    errors.push('Email inválido');
  }

  if (!validatePassword(userData.senha)) {
    errors.push('Senha deve ter pelo menos 6 caracteres');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};