export function validatePassword(password) {
  // Min 8 chars, 1 maiúscula, 1 minúscula, 1 número
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}
