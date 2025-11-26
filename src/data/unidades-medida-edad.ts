export const unidadesMedidaEdad = [
  { id: '7249ea04-1da5-428f-a3ad-698998e5380c', value: '1', label: 'Años' },
  { id: '4738a0d2-5057-44cb-97ab-86818d74bbcc', value: '2', label: 'Meses' },
  { id: 'dc1d7361-d99d-4b17-9aa4-4cf8e325dc8e', value: '3', label: 'Días' }
] as const;

export type UnidadMedidaEdadValue = typeof unidadesMedidaEdad[number]["value"];
