function stringToReal(valor: string | number){
  const response = Number(valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  return response;
}

export {
  stringToReal
}