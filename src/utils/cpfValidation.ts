export function validarCPF(cpf: string): boolean {
  // Remove caracteres especiais do CPF (pontos e traço)
  const cpfLimpo = cpf.replace(/[^\d]/g, '');

  // Verifica se o CPF tem 11 dígitos
  if (cpfLimpo.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1{10}$/.test(cpfLimpo)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  const primeiroDigitoVerificador = resto >= 10 ? 0 : resto;

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  const segundoDigitoVerificador = resto >= 10 ? 0 : resto;

  // Verifica se os dígitos verificadores estão corretos
  if (
    parseInt(cpfLimpo.charAt(9)) !== primeiroDigitoVerificador ||
    parseInt(cpfLimpo.charAt(10)) !== segundoDigitoVerificador
  ) {
    return false;
  }

  return true;
}