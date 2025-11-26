// src/types/rips.ts
import type {
  TipoIdentificacionValue,
  SexoValue,
  ZonaValue,
  TipoUsuarioValue,
  UnidadMedidaEdadValue,
  FinalidadConsultaValue,
  CausaExternaValue,
  TipoDiagnosticoPrincipalValue,
  DepartamentoValue,
  MunicipioCode,
  DiagnosticoCode,
  EntidadValue
} from '../data';

export interface Config {
  codPrestador: string;
  razonSocial: string;
  nitPrestador: string; // NIT del prestador
  tipoId: TipoIdentificacionValue;
  numId: string;
  numFactura: string;
  fechaRemision: string; // YYYY-MM-DD
  codEntidad: EntidadValue;
  nombreEntidad: string;
}

export interface Usuario {
  tipoId: TipoIdentificacionValue;
  numId: string;
  codEntidad: EntidadValue;
  tipoUsuario: TipoUsuarioValue;
  apellido1: string;
  apellido2: string;
  nombre1: string;
  nombre2: string;
  edad: number;
  unidadMedida: UnidadMedidaEdadValue;
  sexo: SexoValue;
  codDepto: DepartamentoValue;
  codMuni: MunicipioCode;
  zona: ZonaValue;
}

export interface Consulta {
  // Relacional
  numFactura: string;
  codPrestador: string;
  tipoIdUsuario: TipoIdentificacionValue;
  numIdUsuario: string;

  // Datos clínicos
  fechaConsulta: Date;
  numAutorizacion: string;
  codConsulta: string; // CUPS
  finalidad: FinalidadConsultaValue;
  causaExterna: CausaExternaValue;
  codDiagPrincipal: DiagnosticoCode;
  codDiagRel1: string;
  codDiagRel2: string;
  codDiagRel3: string;
  tipoDiagPrincipal: TipoDiagnosticoPrincipalValue;

  // Valores
  valorConsulta: number;
  cuotaModeradora: number;
  valorNeto: number;
  copago: number;
  comision: number;
  descuento: number;
}