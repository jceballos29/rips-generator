export const tiposIdentificacion = [
  { id: 'a8288d89-850b-4b0d-bc09-d74c6e0defcb', value: 'CC', label: 'Cédula de Ciudadanía' },
  { id: '97c01048-38ef-4ea5-adc8-9cffb9b47578', value: 'TI', label: 'Tarjeta de Identidad' },
  { id: '58791d61-bcf1-43b7-9015-080080fa46aa', value: 'RC', label: 'Registro Civil' },
  { id: '77df5543-0966-4a7d-a138-cc45b54ec640', value: 'CE', label: 'Cédula de Extranjería' },
  { id: '52838c1a-dc0c-46a7-b863-15fdcd7b25fe', value: 'PA', label: 'Pasaporte' },
  { id: 'ff145d59-4a0a-41c8-9e81-7a26610748c8', value: 'AS', label: 'Adulto sin Identificación' },
  { id: '8ffdab16-06b8-4ffd-80a0-aa79d7062ebf', value: 'MS', label: 'Menor sin Identificación' },
  { id: '84ef74c7-de3a-4dd7-aa28-34a70c34144e', value: 'NU', label: 'Número Único de Identificación Personal' },
  { id: '3e5f8c29-1a4d-4b8e-9f2c-8d7e6a5b4c3d', value: 'NI', label: 'NIT (Número de Identificación Tributaria)' }
] as const;

export type TipoIdentificacionValue = typeof tiposIdentificacion[number]["value"];
