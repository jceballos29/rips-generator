export const tiposUsuario = [
  { id: '94a8b699-fbd4-4236-a6b2-db74f7a59237', value: '1', label: 'Contributivo' },
  { id: 'a617cf5b-640d-4dab-bb08-fbea04e448ca', value: '2', label: 'Subsidiado' },
  { id: '1bfa3a6c-faba-4567-a2ed-dc8169ffa06f', value: '3', label: 'Vinculado' },
  { id: '81e5e4b4-4b21-43eb-9608-ad04d116c5d1', value: '4', label: 'Particular' },
  { id: '0a267f11-981b-4d26-9706-0715aa261689', value: '5', label: 'Otro' }
] as const;

export type TipoUsuarioValue = typeof tiposUsuario[number]["value"];
