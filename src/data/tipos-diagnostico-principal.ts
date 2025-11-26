export const tiposDiagnosticoPrincipal = [
  { id: '889a4bca-bd9b-44ef-b00b-b45ee581e9bf', value: '1', label: 'Impresión diagnóstica' },
  { id: 'a8e45604-c6ee-4b6b-b678-8b19fd92ae0a', value: '2', label: 'Confirmado nuevo' },
  { id: '781f6c3d-6b81-40c2-8225-683cef3341b8', value: '3', label: 'Confirmado repetido' }
] as const;

export type TipoDiagnosticoPrincipalValue = typeof tiposDiagnosticoPrincipal[number]["value"];
