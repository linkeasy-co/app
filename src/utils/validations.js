export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePhone(celular) {
  const apenasNumeros = celular.replace(/\D/g, '');
  if (apenasNumeros.length === 11) {
    return true
  } else {
    return false
  }
}

export function formatPhone(celular) {
  const apenasNumeros = celular.replace(/\D/g, '').slice(0, 11); // Limita a 11 dígitos
  let celularFormatado = apenasNumeros;

  if (apenasNumeros.length > 2) {
    celularFormatado = `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}`;
  }

  if (apenasNumeros.length > 7) {
    celularFormatado += `-${apenasNumeros.slice(7, 11)}`;
  }

  return celularFormatado;
}
