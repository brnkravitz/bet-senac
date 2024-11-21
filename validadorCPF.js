// CPF validation function (this is the custom validation logic)
const isValidCPF = (cpf) => {
  // Remove any non-digit characters (e.g., '.', '-', spaces)
  cpf = cpf.replace(/[^\d]+/g, '');

  // CPF must be 11 digits long
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false; // Reject if CPF is all the same digits (like 111.111.111-11)
  }

  // Calculate the first verification digit
  let sum = 0;
  let weight = 10;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * weight--;
  }

  let firstVerificationDigit = (sum * 10) % 11;
  if (firstVerificationDigit === 10 || firstVerificationDigit === 11) {
    firstVerificationDigit = 0;
  }

  // Calculate the second verification digit
  sum = 0;
  weight = 11;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * weight--;
  }

  let secondVerificationDigit = (sum * 10) % 11;
  if (secondVerificationDigit === 10 || secondVerificationDigit === 11) {
    secondVerificationDigit = 0;
  }

  // Verify that the two calculated digits match the CPF's last two digits
  return cpf[9] == firstVerificationDigit && cpf[10] == secondVerificationDigit;
};

// Express-validator custom validator
const validarCPF = (value) => {
  if (!isValidCPF(value)) {
    throw new Error('Invalid CPF number');
  }
  return true;
};

module.exports = validarCPF;
