export const causasExternas = [
  { id: '3559f8be-2c70-4461-9708-60f35abf6e4c', value: '01', label: 'Accidente de trabajo' },
  { id: 'ca349667-47ff-4eac-95b4-b50178859658', value: '02', label: 'Accidente de tránsito' },
  { id: 'd4a66335-7d31-41a1-b5da-e96bafae1c44', value: '03', label: 'Accidente rábico' },
  { id: '182bf704-3094-4384-b942-bdf315e4f6c8', value: '04', label: 'Accidente ofídico' },
  { id: '7e52b9ee-d2da-4d4f-97e1-ff287568afde', value: '05', label: 'Otro tipo de accidente' },
  { id: 'f5937c34-d8b0-4c6f-87c4-c41d67d99110', value: '06', label: 'Evento catastrófico' },
  { id: 'eaf7d728-0a39-48cd-a0da-be1bfdbad545', value: '07', label: 'Lesión por agresión' },
  { id: 'b68c94c5-1da0-40a2-8560-d98ea23b363b', value: '08', label: 'Lesión auto-infligida' },
  { id: '67178cdd-4aa9-4edf-bc29-3f4623b645f2', value: '09', label: 'Sospecha de maltrato físico' },
  { id: '7591a2bc-acc3-463c-b47a-483e83dc84ad', value: '10', label: 'Sospecha de abuso sexual' },
  { id: '5fb19827-79a7-4f38-821e-4223d4aa8340', value: '11', label: 'Sospecha de violencia sexual' },
  { id: 'd32bfda7-5621-4780-8f0b-a4cae9efe249', value: '12', label: 'Sospecha de maltrato emocional' },
  { id: 'cd038c5b-38e3-4bee-a2eb-dddbed99f1e8', value: '13', label: 'Enfermedad General' },
  { id: '9dd9362d-be48-41e5-a50c-f82da16ead7f', value: '14', label: 'Enfermedad profesional' },
  { id: 'b28e5c4a-9fdb-4fee-a7f9-95422fd66e9c', value: '15', label: 'Otra' }
] as const;

export type CausaExternaValue = typeof causasExternas[number]["value"];
