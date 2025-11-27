// src/hooks/useRipsGenerator.ts
import { useCallback } from 'react';
import { format } from 'date-fns';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { Config, Usuario, Consulta } from '../types/rips';

export const useRipsGenerator = () => {

  // Función auxiliar para formatear fechas a dd/mm/yyyy
  const fmtDate = (date: Date | string) => format(new Date(date), 'dd/MM/yyyy');

  // Función auxiliar para formatear número de factura con ceros a la izquierda (6 dígitos)
  const formatNumFactura = (numFactura: string) => numFactura.padStart(6, '0');

  const generateRIPS = useCallback(async (
    config: Config,
    usuarios: Usuario[],
    consultas: Consulta[]
  ) => {
    const zip = new JSZip();
    const numFacturaFormatted = formatNumFactura(config.numFactura);

    // ------------------------------------------
    // 1. GENERAR AC (Consultas)
    // ------------------------------------------
    const acLines = consultas.map(c => {
      // Array con el orden EXACTO de las columnas según Resolución 3374/2000
      const columns = [
        `FVE${config.numFactura}`,       // 1. Número de factura
        c.codPrestador,                  // 2. Código prestador
        c.tipoIdUsuario,                 // 3. Tipo ID usuario
        c.numIdUsuario,                  // 4. Número ID usuario
        fmtDate(c.fechaConsulta),        // 5. Fecha de consulta
        c.numAutorizacion,               // 6. Número autorización
        c.codConsulta,                   // 7. Código consulta (CUPS)
        c.finalidad,                     // 8. Finalidad consulta
        c.causaExterna,                  // 9. Causa externa
        c.codDiagPrincipal,              // 10. Diagnóstico principal
        c.codDiagRel1,                   // 11. Diagnóstico relacionado 1
        c.codDiagRel2,                   // 12. Diagnóstico relacionado 2
        c.codDiagRel3,                   // 13. Diagnóstico relacionado 3
        c.tipoDiagPrincipal,             // 14. Tipo diagnóstico principal
        Math.round(c.valorConsulta),     // 15. Valor consulta
        Math.round(c.cuotaModeradora),   // 16. Cuota moderadora
        Math.round(c.valorNeto),         // 17. Valor neto
      ];
      return columns.join(',');
    });

    const acContent = acLines.join('\r\n'); // Salto de línea Windows
    const acFileName = `AC${numFacturaFormatted}.txt`;
    zip.file(acFileName, acContent);

    // ------------------------------------------
    // 2. GENERAR US (Usuarios)
    // ------------------------------------------
    const usLines = usuarios.map(u => {
      return [
        u.tipoId,           //1. Tipo ID usuario
        u.numId,          //2. Número ID usuario 
        u.codEntidad,     //3. Código entidad
        u.tipoUsuario,    //4. Tipo usuario
        u.apellido1,      //5. Primer apellido
        u.apellido2,      //6. Segundo apellido
        u.nombre1,        //7. Primer nombre
        u.nombre2,        //8. Segundo nombre
        u.edad,           //9. Edad
        u.unidadMedida,   //10. Unidad de medida
        u.sexo,           //11. Sexo
        u.codDepto,       //12. Código departamento
        u.codMuni,        //13. Código municipio
        u.zona            //14. Zona
      ].join(',');
    });

    const usFileName = `US${numFacturaFormatted}.txt`;
    zip.file(usFileName, usLines.join('\r\n'));

    // ------------------------------------------
    // 3. GENERAR AF (Factura) - Cálculo Automático
    // ------------------------------------------
    // Sumar valores de todas las consultas
    const totalNeto = consultas.reduce((sum, item) => sum + item.valorNeto, 0);
    const totalCopago = consultas.reduce((sum, item) => sum + item.copago, 0);
    const totalComision = consultas.reduce((sum, item) => sum + item.comision, 0);
    const totalDescuento = consultas.reduce((sum, item) => sum + item.descuento, 0);

    // Calcular fechas de inicio y fin del periodo (min y max de consultas)
    const fechasConsultas = consultas.map(c => new Date(c.fechaConsulta));
    const fechaInicio = new Date(Math.min(...fechasConsultas.map(f => f.getTime())));
    const fechaFin = new Date(Math.max(...fechasConsultas.map(f => f.getTime())));

    const afLine = [
      config.codPrestador,              // 1. Código prestador
      config.razonSocial,               // 2. Razón social
      'NI',                             // 3. Tipo ID prestador (NI = NIT)
      config.nitPrestador,              // 4. NIT del prestador
      `FVE${config.numFactura}`,        // 5. Número de factura
      fmtDate(config.fechaRemision),    // 6. Fecha de expedición
      fmtDate(fechaInicio),             // 7. Fecha inicio (calculada)
      fmtDate(fechaFin),                // 8. Fecha fin (calculada)
      config.codEntidad,                // 9. Código entidad
      config.nombreEntidad,             // 10. Nombre entidad
      "", "", "",                       // 11-13. Contrato, Plan, Póliza (vacíos)
      Math.round(totalCopago),          // 14. Valor copago
      Math.round(totalComision),        // 15. Valor comisión
      Math.round(totalDescuento),       // 16. Valor descuento
      Math.round(totalNeto)             // 17. Valor neto a pagar
    ].join(',');

    const afFileName = `AF${numFacturaFormatted}.txt`;
    zip.file(afFileName, afLine);

    // ------------------------------------------
    // 4. GENERAR CT (Control)
    // ------------------------------------------
    // Los nombres de archivo en CT deben ir SIN la extensión .txt
    const afFileNameNoExt = afFileName.replace('.txt', '');
    const usFileNameNoExt = usFileName.replace('.txt', '');
    const acFileNameNoExt = acFileName.replace('.txt', '');

    const ctLines = [
      `${config.codPrestador},${fmtDate(config.fechaRemision)},${afFileNameNoExt},1`,
      `${config.codPrestador},${fmtDate(config.fechaRemision)},${usFileNameNoExt},${usuarios.length}`,
      `${config.codPrestador},${fmtDate(config.fechaRemision)},${acFileNameNoExt},${consultas.length}`
    ];

    const ctFileName = `CT${numFacturaFormatted}.txt`;
    zip.file(ctFileName, ctLines.join('\r\n'));

    // ------------------------------------------
    // DESCARGAR ZIP
    // ------------------------------------------
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `RIPS.zip`);

  }, []);

  return { generateRIPS };
};