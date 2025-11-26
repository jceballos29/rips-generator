import { z } from 'zod';
import {
  tiposIdentificacion,
  sexos,
  zonas,
  tiposUsuario,
  unidadesMedidaEdad,
  finalidadesConsulta,
  causasExternas,
  tiposDiagnosticoPrincipal,
  departamentos,
  municipios,
  diagnosticos,
  entidades
} from '../data';

// Crear enums a partir de los arrays de data
const tipoIdValues = tiposIdentificacion.map(t => t.value) as [string, ...string[]];
const sexoValues = sexos.map(s => s.value) as [string, ...string[]];
const zonaValues = zonas.map(z => z.value) as [string, ...string[]];
const tipoUsuarioValues = tiposUsuario.map(t => t.value) as [string, ...string[]];
const unidadMedidaValues = unidadesMedidaEdad.map(u => u.value) as [string, ...string[]];
const finalidadValues = finalidadesConsulta.map(f => f.value) as [string, ...string[]];
const causaExternaValues = causasExternas.map(c => c.value) as [string, ...string[]];
const tipoDiagValues = tiposDiagnosticoPrincipal.map(t => t.value) as [string, ...string[]];
const deptoValues = departamentos.map(d => d.value) as [string, ...string[]];
const municipioValues = municipios.map(m => m.value) as [string, ...string[]];
const diagnosticoValues = diagnosticos.map(d => d.value) as [string, ...string[]];
const entidadValues = entidades.map(e => e.value) as [string, ...string[]];

// 1. Esquema solo para la parte CLÍNICA (AC)
export const detalleConsultaSchema = z.object({
  fechaConsulta: z.string().min(1, "Requerido"),
  numAutorizacion: z.string().optional(),
  codConsulta: z.string().length(6, "Debe ser de 6 caracteres"), // CUPS
  codDiagPrincipal: z.enum(diagnosticoValues),
  finalidad: z.enum(finalidadValues),
  causaExterna: z.enum(causaExternaValues),
  valorConsulta: z.number().min(0),
  cuotaModeradora: z.number().min(0),
  valorNeto: z.number().min(0),
  copago: z.number().min(0),
  comision: z.number().min(0),
  descuento: z.number().min(0),
  // Datos diagnóstico
  tipoDiagPrincipal: z.enum(tipoDiagValues),
  codDiagRel1: z.string().optional(),
  codDiagRel2: z.string().optional(),
  codDiagRel3: z.string().optional(),
});

// 2. Esquema para el PACIENTE (US) que contiene múltiples consultas
export const pacienteSchema = z.object({
  tipoIdUsuario: z.enum(tipoIdValues),
  numIdUsuario: z.string().min(3, "Requerido"),
  codEntidad: z.enum(entidadValues),
  tipoUsuario: z.enum(tipoUsuarioValues),
  apellido1: z.string().min(1, "Requerido"),
  apellido2: z.string().optional(),
  nombre1: z.string().min(1, "Requerido"),
  nombre2: z.string().optional(),
  edad: z.number().min(0),
  unidadMedida: z.enum(unidadMedidaValues),
  sexo: z.enum(sexoValues),
  codDepto: z.enum(deptoValues),
  codMuni: z.enum(municipioValues),
  zona: z.enum(zonaValues),

  // AQUÍ ESTÁ LA MAGIA: Array anidado
  consultas: z.array(detalleConsultaSchema).min(1, "Agregue al menos una consulta")
});

// 3. Esquema Principal
export const ripsFormSchema = z.object({
  codPrestador: z.string().length(12),
  razonSocial: z.string().min(1),
  numFactura: z.string().min(1),
  fechaRemision: z.string(),
  // Lista de Pacientes
  pacientes: z.array(pacienteSchema).min(1, "Agregue al menos un paciente")
});

export type RipsFormData = z.infer<typeof ripsFormSchema>;