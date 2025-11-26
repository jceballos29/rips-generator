export const sexos = [
  { id: 'd18c44fa-56d4-42de-a14c-a1ca47039f23', value: 'M', label: 'Masculino' },
  { id: '414a422b-0bce-4ae0-950a-61d109bd30a5', value: 'F', label: 'Femenino' }
] as const;

export type SexoValue = typeof sexos[number]["value"];
