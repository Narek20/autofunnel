export function validateName(name: string) {
  const nameRegex = /^[A-Za-z]+( [A-Za-z]+)?$/;
  
  return nameRegex.test(name);
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}