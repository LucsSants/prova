export function validarTelefone(telefone: string): boolean {
  // Remove caracteres especiais do telefone (parênteses, traço e espaço)
  const telefoneLimpo = telefone.replace(/[()\s-]/g, '');

  // Verifica se o telefone tem 10 ou 11 dígitos
  if (telefoneLimpo.length !== 10 && telefoneLimpo.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (telefone inválido)
  if (/^(\d)\1{9,10}$/.test(telefoneLimpo)) {
    return false;
  }

  // Verifica se o DDD é válido (dois dígitos numéricos)
  const ddd = telefoneLimpo.slice(0, 2);
  if (!/^\d{2}$/.test(ddd)) {
    return false;
  }

  // Lista de DDDs válidos no Brasil
  const dddsValidos = [
    "11", "12", "13", "14", "15", "16", "17", "18", "19",
    "21", "22", "24", "27", "28", "31", "32", "33", "34", "35", "37", "38",
    "41", "42", "43", "44", "45", "46", "47", "48", "49",
    "51", "53", "54", "55", "61", "62", "63", "64", "65", "66",
    "67", "68", "69", "71", "73", "74", "75", "77", "79",
    "81", "82", "83", "84", "85", "86", "87", "88", "89",
    "91", "92", "93", "94", "95", "96", "97", "98", "99"
  ];

  if (!dddsValidos.includes(ddd)) {
    return false;
  }

  return true;
}