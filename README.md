# 🏥 Generador de Archivos RIPS

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-6.0.0-blue.svg)](https://ant.design/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Aplicación web moderna para la generación de archivos RIPS (Registro Individual de Prestación de Servicios de Salud) según la **Resolución 3374 de 2000** del Ministerio de Salud de Colombia.

## ✨ Características

### 🎯 Funcionalidades Principales

- **Generación automática de 4 archivos RIPS**:

  - 📄 **US** - Archivo de Usuarios (datos demográficos de pacientes)
  - 💊 **AC** - Archivo de Consultas (detalle clínico de servicios)
  - 💰 **AF** - Archivo de Factura (resumen económico)
  - 📋 **CT** - Archivo de Control (manifiesto de archivos)

- **Interfaz moderna con Ant Design v6**:

  - Diseño responsive y profesional
  - Selects con búsqueda virtual para grandes conjuntos de datos
  - Validación en tiempo real de formularios
  - Tablas interactivas con scroll virtual

- **Cálculos automáticos**:

  - Valor Neto = Valor Consulta - (Cuota Moderadora + Copago)
  - Totales de Copago, Comisión y Descuento
  - Periodos de facturación (fechas de inicio/fin)

- **Datos completos precargados**:
  - 🏥 34 EPS y entidades de salud
  - 📍 33 departamentos y 1,122 municipios de Colombia
  - 🩺 11,268 diagnósticos CIE-10
  - 📋 Códigos de finalidad, causa externa y más

### 🚀 Características Técnicas

- ⚡ **Rendimiento optimizado** con Vite y Rolldown
- 🎨 **Type-safe** con TypeScript 5.9
- ✅ **Validación robusta** con Zod
- 📦 **Exportación ZIP** de archivos RIPS
- 🔍 **Búsqueda inteligente** en selects con virtual scroll
- 📊 **Vista previa del archivo de control** en tiempo real

## 🛠️ Tecnologías

- **Frontend**: React 19.2
- **UI Framework**: Ant Design 6.0
- **Lenguaje**: TypeScript 5.9
- **Validación**: Zod 4.1
- **Build Tool**: Vite 7.2 (Rolldown)
- **Gestión de fechas**: date-fns 4.1, dayjs 1.11
- **Archivos**: JSZip 3.10, FileSaver 2.0

## 📋 Requisitos Previos

- Node.js 18+
- pnpm 8+ (recomendado) o npm/yarn

## 🚀 Instalación

1. **Clonar el repositorio**:

```bash
git clone https://github.com/jceballos29/rips-generator.git
cd rips-generator
```

2. **Instalar dependencias**:

```bash
pnpm install
```

3. **Iniciar el servidor de desarrollo**:

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Inicia el servidor de desarrollo

# Producción
pnpm build        # Compila TypeScript y genera build de producción
pnpm preview      # Vista previa del build de producción

# Calidad de código
pnpm lint         # Ejecuta ESLint
```

## 📖 Uso

### 1. Datos de Facturación

Complete los datos del prestador de servicios:

- Código del prestador
- Razón social
- Número de identificación (NIT)
- Número de factura
- Fecha de remisión

### 2. Datos del Paciente

Ingrese la información demográfica:

- Tipo y número de identificación
- Nombres y apellidos
- Edad, sexo y ubicación geográfica
- EPS y tipo de usuario

### 3. Agregar Consultas

Para cada servicio prestado:

- Fecha de la consulta
- Código CUPS del procedimiento
- Diagnósticos (CIE-10)
- Finalidad y causa externa
- Valores económicos (se calculan automáticamente)

### 4. Vista Previa y Generación

- Revise el archivo de control (CT) en tiempo real
- Verifique que todos los campos estén completos
- Haga clic en "Generar Archivos RIPS"
- Descargue el archivo ZIP con los 4 archivos TXT

## 📂 Estructura del Proyecto

```
rips-generator/
├── src/
│   ├── components/
│   │   ├── RipsForm.tsx              # Formulario principal
│   │   └── DocumentationDrawer.tsx   # Documentación integrada
│   ├── data/
│   │   ├── entidades.ts              # EPS y entidades
│   │   ├── departamentos.ts          # Departamentos de Colombia
│   │   ├── municipios.ts             # 1,122 municipios
│   │   ├── diagnosticos.ts           # 11,268 códigos CIE-10
│   │   └── ...                       # Otros catálogos
│   ├── hooks/
│   │   └── useRipsGenerator.ts       # Lógica de generación RIPS
│   ├── schemas/
│   │   └── ripsSchema.ts             # Esquemas de validación Zod
│   ├── types/
│   │   └── rips.ts                   # Interfaces TypeScript
│   ├── App.tsx                       # Componente raíz
│   └── main.tsx                      # Punto de entrada
├── public/                           # Archivos estáticos
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Cumplimiento Normativo

Esta aplicación genera archivos RIPS que cumplen estrictamente con la **Resolución 3374 de 2000** del Ministerio de Salud de Colombia:

- ✅ Estructura de 4 archivos (US, AC, AF, CT)
- ✅ Formato de campos según especificaciones técnicas
- ✅ Validación de códigos CUPS, CIE-10, DIVIPOLA
- ✅ Cálculos automáticos de totales y periodos
- ✅ Formato de archivo de texto plano con separadores de campo

**Nota**: Esta es la normativa antigua. Para la Resolución 4505 de 2012 (normativa actual), se requiere una implementación diferente.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Juan Ceballos**

- GitHub: [@jceballos29](https://github.com/jceballos29)
- Email: jceballos.dev@gmail.com

## 🙏 Agradecimientos

- [Ant Design](https://ant.design/) por el excelente framework de UI
- [Ministerio de Salud de Colombia](https://www.minsalud.gov.co/) por las especificaciones técnicas
- Comunidad de desarrolladores de software en salud

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias:

- 🐛 [Reportar un bug](https://github.com/jceballos29/rips-generator/issues)
- 💡 [Solicitar una característica](https://github.com/jceballos29/rips-generator/issues)
- 📧 Contacto directo: jceballos.dev@gmail.com

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!
