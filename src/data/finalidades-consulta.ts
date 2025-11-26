export const finalidadesConsulta = [
  { id: '7428485c-bd16-49c7-9efa-1451825b09f1', value: '01', label: 'Atención del parto (Puerperio)' },
  { id: '0afb3efe-2d59-4885-8d28-7d9ed094db19', value: '02', label: 'Atención del recién nacido' },
  { id: 'e8d7ff3e-b0e8-4902-aa75-951da1c20aad', value: '03', label: 'Atención planificación familiar' },
  { id: '42d19b88-8dc0-4d0e-9d3c-c8e3ea242bda', value: '04', label: 'Detección alteración crecimiento y desarrollo (Menor 10 años)' },
  { id: '8b765b83-d76d-4389-80c1-5a69f537a7d6', value: '05', label: 'Detección alteración desarrollo joven (10-29 años)' },
  { id: '0dc28cbd-6ac6-4b7a-a0e0-cddcb7a14ff8', value: '06', label: 'Detección alteración embarazo' },
  { id: '4854719e-ec6d-48c0-be72-29edf1bb161e', value: '07', label: 'Detección alteración adulto (Mayor 45 años)' },
  { id: 'a838383a-46d8-4691-9525-cea589942736', value: '08', label: 'Detección alteración agudeza visual' },
  { id: 'ae2b4510-ab1a-470d-91ca-1100200f7af7', value: '09', label: 'Detección enfermedad profesional' },
  { id: 'ed8dade0-4878-48b6-8fae-984244f8d56b', value: '10', label: 'No aplica' },
] as const;

export type FinalidadConsultaValue = typeof finalidadesConsulta[number]["value"];
