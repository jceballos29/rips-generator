export const zonas = [
  { id: 'e2507034-b3bf-4873-bce8-b38b7bb4ea72', value: 'U', label: 'Urbana' },
  { id: '978e3f5c-80f1-4196-a65f-fa9610ea0ef0', value: 'R', label: 'Rural' }
] as const;

export type ZonaValue = typeof zonas[number]["value"];
