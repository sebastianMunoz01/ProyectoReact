export function runValido(run) {
  if (/^[0-9]{6,8}[0-9Kk]$/.test(run) === false) {
    return false;
  }
  let cuerpo = run.slice(0, -1);
  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma = suma + Number(cuerpo[i]) * multiplo;
    multiplo = multiplo + 1;
    if (multiplo === 8) {
      multiplo = 2;
    }
  }
  let resultado = 11 - (suma % 11);
  let digito = String(resultado);
  if (resultado === 11) {
    digito = "0";
  } else if (resultado === 10) {
    digito = "K";
  }
  return digito === run.slice(-1).toUpperCase();
}

export function correoValido(correo) {
  const formato = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  return formato.test(correo) && correo.length <= 100;
}