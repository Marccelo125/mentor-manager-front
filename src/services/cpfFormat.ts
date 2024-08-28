export function cpfFormat(cpf: string): string {
  cpf = cpf.replace(/[^0-9]/g, '')

  return cpf
}
