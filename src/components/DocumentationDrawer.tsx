import {
	Drawer,
	Typography,
	Divider,
	Space,
	Card,
	Tag,
	Alert,
	Collapse,
} from 'antd';
import {
	InfoCircleOutlined,
	FileTextOutlined,
	UserOutlined,
	MedicineBoxOutlined,
	DollarOutlined,
	CalendarOutlined,
	BankOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface DocumentationDrawerProps {
	open: boolean;
	onClose: () => void;
}

export const DocumentationDrawer = ({
	open,
	onClose,
}: DocumentationDrawerProps) => {
	return (
		<Drawer
			title={
				<Space>
					<FileTextOutlined style={{ color: '#1890ff' }} />
					<span>Documentación del Sistema RIPS</span>
				</Space>
			}
			placement='right'
			onClose={onClose}
			open={open}
			width={720}
		>
			{/* Introducción */}
			<Alert
				title='Resolución 3374 de 2000'
				description='Sistema de generación de archivos RIPS (Registro Individual de Prestación de Servicios de Salud) según normativa del Ministerio de Salud de Colombia.'
				type='info'
				icon={<InfoCircleOutlined />}
				showIcon
				style={{ marginBottom: 24 }}
			/>

			{/* Sección: ¿Qué son los archivos RIPS? */}
			<Title level={4}>
				<FileTextOutlined /> ¿Qué son los archivos RIPS?
			</Title>
			<Paragraph>
				Los archivos RIPS son formatos estándar para reportar las
				actividades de atención en salud a las EPS, ARS y entidades de
				gobierno. El sistema genera automáticamente 4 archivos por
				cada factura:
			</Paragraph>

			<Space
				orientation='vertical'
				size='small'
				style={{ marginBottom: 24, width: '100%' }}
			>
				<Card size='small'>
					<Space>
						<Tag color='blue'>US</Tag>
						<Text strong>Usuarios:</Text>
						<Text type='secondary'>
							Datos demográficos de los pacientes
						</Text>
					</Space>
				</Card>
				<Card size='small'>
					<Space>
						<Tag color='green'>AC</Tag>
						<Text strong>Consultas:</Text>
						<Text type='secondary'>
							Detalle de las actividades clínicas
						</Text>
					</Space>
				</Card>
				<Card size='small'>
					<Space>
						<Tag color='orange'>AF</Tag>
						<Text strong>Facturas:</Text>
						<Text type='secondary'>
							Resumen económico de la facturación
						</Text>
					</Space>
				</Card>
				<Card size='small'>
					<Space>
						<Tag color='purple'>CT</Tag>
						<Text strong>Control:</Text>
						<Text type='secondary'>
							Manifiesto de archivos incluidos
						</Text>
					</Space>
				</Card>
			</Space>

			<Divider />

			{/* Sección: Flujo de Trabajo */}
			<Title level={4}>
				<BankOutlined /> Flujo de Trabajo
			</Title>
			<Paragraph>
				<ol style={{ paddingLeft: 20 }}>
					<li>
						<Text strong>Datos de Facturación:</Text> Complete la
						información general de la factura (prestador, entidad,
						número de factura, etc.)
					</li>
					<li>
						<Text strong>Datos del Paciente:</Text> Registre los datos
						demográficos del paciente que será atendido. Presione
						"Registrar" para guardar la información
					</li>
					<li>
						<Text strong>Agregar Consultas:</Text> Añada una o varias
						consultas para el paciente. Cada consulta se agregará a la
						tabla automáticamente
					</li>
					<li>
						<Text strong>Revisar Archivo de Control:</Text> Verifique
						en la tabla de control (CT) la cantidad de registros que
						se generarán en cada archivo
					</li>
					<li>
						<Text strong>Generar RIPS:</Text> Una vez completados
						todos los datos, genere el archivo ZIP con los 4 archivos
						RIPS
					</li>
				</ol>
			</Paragraph>

			<Divider />

			{/* Sección: Campos Detallados */}
			<Title level={4}>
				<InfoCircleOutlined /> Campos del Formulario
			</Title>

			<Collapse accordion style={{ marginBottom: 24 }}>
				{/* Datos de Facturación */}
				<Panel
					header={
						<Space>
							<FileTextOutlined style={{ color: '#1890ff' }} />
							<Text strong>Datos de Facturación</Text>
						</Space>
					}
					key='1'
				>
					<Alert
						title='Campos del Formulario'
						description='Los siguientes campos se capturan en la sección "Datos de Facturación (AF)" del formulario principal.'
						type='info'
						showIcon
						style={{ marginBottom: 16 }}
					/>

					<Space
						direction='vertical'
						size='middle'
						style={{ width: '100%' }}
					>
						<div>
							<Text strong>Código del Prestador (REPS)</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Código único asignado al prestador de servicios de
								salud por el Ministerio de Salud en el Registro
								Especial de Prestadores de Servicios de Salud (REPS).
								Este código identifica su institución en el sistema de
								salud.
								<br />
								Ejemplo: 110011081401
								<br />
								<Text type='warning'>
									⚠️ Este NO es el mismo número que el NIT tributario.
								</Text>
							</Paragraph>
						</div>

						<div>
							<Text strong>Razón Social del Prestador</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Nombre legal completo de la institución prestadora de
								servicios de salud tal como está registrado en el RUT.
								Ejemplo: Janneth Granados o IPS Salud Total S.A.S.
							</Paragraph>
						</div>

						<div>
							<Text strong>NIT del Prestador</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Número de Identificación Tributaria (NIT) asignado por
								la DIAN. Ingrese solo los números sin el dígito de
								verificación ni guiones.
								<br />
								Ejemplo: Si su NIT es 900123456-7, ingrese: 900123456
								<br />
								<Text type='success'>
									✓ El sistema automáticamente marca este campo como
									tipo "NI" (NIT) en el archivo generado.
								</Text>
							</Paragraph>
						</div>

						<div>
							<Text strong>Número de Factura</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Número único de la factura que identifica este
								conjunto de servicios. Solo ingrese el número (ej:
								81), el sistema automáticamente lo formateará a 6
								dígitos rellenando con ceros a la izquierda (000081)
								para los nombres de los archivos RIPS según la norma.
							</Paragraph>
						</div>

						<div>
							<Text strong>Fecha de Remisión</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Fecha en la que se envía la factura a la entidad
								pagadora. Por defecto muestra la fecha actual pero
								puede modificarse según la necesidad. Esta fecha debe
								ser igual o posterior a todas las fechas de consulta.
							</Paragraph>
						</div>
					</Space>

					<Divider style={{ margin: '16px 0' }} />

					<Alert
						title='Datos de la Entidad Pagadora'
						description='Estos campos se capturan en la sección "Datos del Paciente (US)" del formulario, ya que corresponden a la EPS o entidad del paciente. El sistema los utiliza automáticamente al generar el archivo AF (Facturas).'
						type='success'
						showIcon
						style={{ marginBottom: 16 }}
					/>

					<Space
						direction='vertical'
						size='middle'
						style={{ width: '100%' }}
					>
						<div>
							<Text strong>
								EPS / Entidad (capturado en Datos del Paciente)
							</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Código y nombre de la EPS o entidad pagadora asignado
								por el Ministerio de Salud. Se selecciona de la lista
								precargada en la sección de Datos del Paciente.
								Ejemplo: EPS037 - Nueva EPS
								<br />
								<Text type='success'>
									✓ Este campo se usa automáticamente en el archivo AF
									para identificar la entidad responsable del pago.
								</Text>
							</Paragraph>
						</div>
					</Space>
				</Panel>

				{/* Datos del Paciente */}
				<Panel
					header={
						<Space>
							<UserOutlined style={{ color: '#52c41a' }} />
							<Text strong>Datos del Paciente</Text>
						</Space>
					}
					key='2'
				>
					<Space
						direction='vertical'
						size='middle'
						style={{ width: '100%' }}
					>
						<div>
							<Text strong>Tipo de Identificación</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Tipo de documento del paciente:
								<ul style={{ marginTop: 8, paddingLeft: 20 }}>
									<li>
										<Tag>CC</Tag> Cédula de Ciudadanía
									</li>
									<li>
										<Tag>TI</Tag> Tarjeta de Identidad
									</li>
									<li>
										<Tag>RC</Tag> Registro Civil
									</li>
									<li>
										<Tag>PA</Tag> Pasaporte
									</li>
									<li>
										<Tag>CE</Tag> Cédula de Extranjería
									</li>
									<li>
										<Tag>MS</Tag> Menor sin Identificación
									</li>
								</ul>
							</Paragraph>
						</div>

						<div>
							<Text strong>Número de Identificación</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Número del documento de identidad del paciente sin
								puntos ni guiones. Ejemplo: 1234567890
							</Paragraph>
						</div>

						<div>
							<Text strong>Tipo de Usuario</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Tipo de afiliación del paciente:
								<ul style={{ marginTop: 8, paddingLeft: 20 }}>
									<li>
										<Tag>1</Tag> Contributivo
									</li>
									<li>
										<Tag>2</Tag> Subsidiado
									</li>
									<li>
										<Tag>3</Tag> Vinculado
									</li>
									<li>
										<Tag>4</Tag> Particular
									</li>
									<li>
										<Tag>5</Tag> Otro
									</li>
								</ul>
							</Paragraph>
						</div>

						<div>
							<Text strong>Nombres y Apellidos</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Complete los nombres y apellidos del paciente tal como
								aparecen en el documento de identidad. Si el paciente
								tiene un solo apellido o nombre, deje el segundo campo
								vacío.
							</Paragraph>
						</div>

						<div>
							<Text strong>Edad y Unidad</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Indique la edad del paciente y la unidad de medida:
								<ul style={{ marginTop: 8, paddingLeft: 20 }}>
									<li>
										<Tag>1</Tag> Años
									</li>
									<li>
										<Tag>2</Tag> Meses
									</li>
									<li>
										<Tag>3</Tag> Días
									</li>
								</ul>
							</Paragraph>
						</div>

						<div>
							<Text strong>Sexo</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								<Tag>M</Tag> Masculino | <Tag>F</Tag> Femenino
							</Paragraph>
						</div>

						<div>
							<Text strong>Departamento y Municipio</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Lugar de residencia del paciente según la división
								política administrativa de Colombia (código DANE).
							</Paragraph>
						</div>

						<div>
							<Text strong>Zona de Residencia</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								<Tag>U</Tag> Urbana | <Tag>R</Tag> Rural
							</Paragraph>
						</div>
					</Space>
				</Panel>

				{/* Datos de la Consulta */}
				<Panel
					header={
						<Space>
							<MedicineBoxOutlined style={{ color: '#ff7875' }} />
							<Text strong>Datos de la Consulta</Text>
						</Space>
					}
					key='3'
				>
					<Space
						direction='vertical'
						size='middle'
						style={{ width: '100%' }}
					>
						<div>
							<Text strong>Fecha de la Consulta</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Fecha en la que se realizó la atención médica. Debe
								ser igual o anterior a la fecha de remisión de la
								factura.
							</Paragraph>
						</div>

						<div>
							<Text strong>Número de Autorización</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Número de autorización emitido por la EPS para la
								prestación del servicio. Si no requiere autorización,
								puede dejarse vacío o usar un valor por defecto.
							</Paragraph>
						</div>

						<div>
							<Text strong>Código de Consulta (CUPS)</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Código único del procedimiento según la Clasificación
								Única de Procedimientos en Salud (CUPS). Ejemplo:
								890201 para consulta de medicina general.
							</Paragraph>
						</div>

						<div>
							<Text strong>Finalidad de la Consulta</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Objetivo de la atención:
								<ul style={{ marginTop: 8, paddingLeft: 20 }}>
									<li>
										<Tag>01</Tag> Diagnóstico
									</li>
									<li>
										<Tag>02</Tag> Tratamiento
									</li>
									<li>
										<Tag>03</Tag> Prevención
									</li>
									<li>
										<Tag>04</Tag> Rehabilitación
									</li>
									<li>
										<Tag>10</Tag> Atención del parto
									</li>
									<li>
										<Tag>20</Tag> Atención del recién nacido
									</li>
								</ul>
							</Paragraph>
						</div>

						<div>
							<Text strong>Causa Externa</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Si la atención es consecuencia de una causa externa:
								<ul style={{ marginTop: 8, paddingLeft: 20 }}>
									<li>
										<Tag>01</Tag> Accidente de trabajo
									</li>
									<li>
										<Tag>02</Tag> Accidente de tránsito
									</li>
									<li>
										<Tag>03</Tag> Accidente rábico
									</li>
									<li>
										<Tag>04</Tag> Accidente ofídico
									</li>
									<li>
										<Tag>05</Tag> Otro tipo de accidente
									</li>
									<li>
										<Tag>06</Tag> Evento catastrófico
									</li>
									<li>
										<Tag>07</Tag> Lesión por agresión
									</li>
									<li>
										<Tag>08</Tag> Lesión autoinfligida
									</li>
									<li>
										<Tag>09</Tag> Sospecha de maltrato físico
									</li>
									<li>
										<Tag>10</Tag> Sospecha de abuso sexual
									</li>
									<li>
										<Tag>11</Tag> Sospecha de violencia sexual
									</li>
									<li>
										<Tag>12</Tag> Sospecha de maltrato emocional
									</li>
									<li>
										<Tag>13</Tag> Enfermedad general
									</li>
									<li>
										<Tag>14</Tag> Enfermedad profesional
									</li>
								</ul>
							</Paragraph>
						</div>

						<div>
							<Text strong>Diagnóstico Principal (CIE-10)</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Código del diagnóstico según la Clasificación
								Internacional de Enfermedades CIE-10. Ejemplo: J00
								para rinofaringitis aguda (resfriado común). Use el
								buscador para encontrar el diagnóstico correcto.
							</Paragraph>
						</div>

						<div>
							<Text strong>Diagnósticos Relacionados</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Hasta 3 diagnósticos adicionales relacionados con la
								consulta (CIE-10). Estos son opcionales.
							</Paragraph>
						</div>

						<div>
							<Text strong>Tipo de Diagnóstico Principal</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								<ul style={{ paddingLeft: 20 }}>
									<li>
										<Tag>1</Tag> Impresión diagnóstica
									</li>
									<li>
										<Tag>2</Tag> Confirmado nuevo
									</li>
									<li>
										<Tag>3</Tag> Confirmado repetido
									</li>
								</ul>
							</Paragraph>
						</div>
					</Space>
				</Panel>

				{/* Valores Económicos */}
				<Panel
					header={
						<Space>
							<DollarOutlined style={{ color: '#faad14' }} />
							<Text strong>Valores Económicos</Text>
						</Space>
					}
					key='4'
				>
					<Space
						direction='vertical'
						size='middle'
						style={{ width: '100%' }}
					>
						<Alert
							title='Cálculo Automático'
							description='El Valor Neto se calcula automáticamente con la fórmula: Valor Consulta - (Cuota Moderadora + Copago)'
							type='success'
							showIcon
							style={{ marginBottom: 16 }}
						/>

						<div>
							<Text strong>Valor de la Consulta</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Valor total del servicio prestado según el contrato o
								tarifario vigente. Ingrese solo el número sin puntos
								ni símbolos. Ejemplo: 50000
							</Paragraph>
						</div>

						<div>
							<Text strong>Cuota Moderadora</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Valor que paga el usuario como cuota moderadora según
								la normatividad del régimen contributivo. Puede ser $0
								si no aplica.
							</Paragraph>
						</div>

						<div>
							<Text strong>Copago</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Valor del copago que debe asumir el paciente según el
								servicio y nivel de complejidad. Puede ser $0 si no
								aplica.
							</Paragraph>
						</div>

						<div>
							<Text strong>Valor Neto (Calculado)</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Este valor se calcula automáticamente restando la
								Cuota Moderadora y el Copago del Valor de la Consulta.
								Es el valor que realmente pagará la entidad.
							</Paragraph>
						</div>

						<div>
							<Text strong>Comisión</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Valor de comisión aplicable según el contrato con la
								entidad. Puede ser $0 si no aplica.
							</Paragraph>
						</div>

						<div>
							<Text strong>Descuento</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Valor de descuento aplicable según el contrato con la
								entidad. Puede ser $0 si no aplica.
							</Paragraph>
						</div>
					</Space>
				</Panel>

				{/* Fechas Automáticas */}
				<Panel
					header={
						<Space>
							<CalendarOutlined style={{ color: '#722ed1' }} />
							<Text strong>Cálculos Automáticos</Text>
						</Space>
					}
					key='5'
				>
					<Space
						direction='vertical'
						size='middle'
						style={{ width: '100%' }}
					>
						<Alert
							title='Automatización Inteligente'
							description='El sistema calcula automáticamente varios campos para garantizar la consistencia de los datos.'
							type='info'
							showIcon
							style={{ marginBottom: 16 }}
						/>

						<div>
							<Text strong>Periodo de Facturación</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								El sistema calcula automáticamente la fecha de inicio
								(fecha de la primera consulta) y fecha de fin (fecha
								de la última consulta) del periodo facturado.
							</Paragraph>
						</div>

						<div>
							<Text strong>Totales Económicos</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								El archivo de facturas (AF) incluye automáticamente la
								suma de:
								<ul style={{ marginTop: 8, paddingLeft: 20 }}>
									<li>Total de valores netos</li>
									<li>Total de copagos</li>
									<li>Total de comisiones</li>
									<li>Total de descuentos</li>
								</ul>
							</Paragraph>
						</div>

						<div>
							<Text strong>Archivo de Control (CT)</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Se genera automáticamente un archivo de control que
								lista los archivos incluidos y la cantidad de
								registros en cada uno. En el formulario principal
								puede ver una tabla en tiempo real que muestra el
								estado actual de los archivos que se generarán.
							</Paragraph>
						</div>
					</Space>
				</Panel>

				{/* Archivo de Control (CT) */}
				<Panel
					header={
						<Space>
							<FileTextOutlined style={{ color: '#722ed1' }} />
							<Text strong>Archivo de Control (CT)</Text>
						</Space>
					}
					key='6'
				>
					<Space
						direction='vertical'
						size='middle'
						style={{ width: '100%' }}
					>
						<Alert
							title='Vista Previa en Tiempo Real'
							description='La tabla de control se actualiza automáticamente conforme agregas pacientes y consultas, permitiéndote verificar los datos antes de generar los archivos.'
							type='info'
							showIcon
							style={{ marginBottom: 16 }}
						/>

						<div>
							<Text strong>¿Qué es el Archivo de Control?</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								El archivo CT (Control) es un manifiesto que lista
								todos los archivos RIPS incluidos en el ZIP y la
								cantidad de registros que contiene cada uno. Es
								obligatorio según la Resolución 3374 de 2000.
							</Paragraph>
						</div>

						<div>
							<Text strong>Estructura del Archivo CT</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Contiene 3 líneas, una por cada tipo de archivo:
								<ul style={{ marginTop: 8, paddingLeft: 20 }}>
									<li>
										<Tag color='orange'>AF</Tag> Facturas - Siempre 1
										registro (resumen de facturación)
									</li>
									<li>
										<Tag color='blue'>US</Tag> Usuarios - 1 registro
										por cada paciente único
									</li>
									<li>
										<Tag color='green'>AC</Tag> Consultas - 1 registro
										por cada consulta realizada
									</li>
								</ul>
							</Paragraph>
						</div>

						<div>
							<Text strong>Tabla de Control en el Formulario</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								La tabla ubicada antes del botón "Generar RIPS" te
								muestra en tiempo real:
								<ul style={{ marginTop: 8, paddingLeft: 20 }}>
									<li>
										<Text strong>Tipo:</Text> Código del archivo (AF,
										US, AC) con color distintivo
									</li>
									<li>
										<Text strong>Archivo:</Text> Nombre descriptivo
										del tipo de archivo
									</li>
									<li>
										<Text strong>Descripción:</Text> Breve explicación
										del contenido
									</li>
									<li>
										<Text strong>Registros:</Text> Contador dinámico
										que se actualiza automáticamente:
										<ul style={{ marginTop: 4, paddingLeft: 20 }}>
											<li>
												<Tag color='success'>Verde</Tag> cuando hay
												datos registrados
											</li>
											<li>
												<Tag color='default'>Gris</Tag> cuando está
												vacío
											</li>
										</ul>
									</li>
								</ul>
							</Paragraph>
						</div>

						<div>
							<Text strong>Validación Previa</Text>
							<Paragraph
								type='secondary'
								style={{ marginBottom: 8, marginTop: 4 }}
							>
								Use esta tabla para verificar que ha ingresado todos
								los datos necesarios antes de generar el archivo RIPS:
								<ul style={{ marginTop: 8, paddingLeft: 20 }}>
									<li>
										AF debe mostrar 1 registro (se genera
										automáticamente al haber paciente y consultas)
									</li>
									<li>
										US debe mostrar 1 registro (debe haber registrado
										un paciente)
									</li>
									<li>
										AC debe mostrar N registros (tantos como consultas
										haya agregado)
									</li>
								</ul>
							</Paragraph>
						</div>

						<Alert
							title='Nota Importante'
							description='El botón "Generar RIPS" solo se habilitará cuando haya al menos 1 paciente registrado y 1 consulta agregada. La tabla de control te ayuda a verificar que cumples con estos requisitos.'
							type='warning'
							showIcon
						/>
					</Space>
				</Panel>
			</Collapse>

			<Divider />

			{/* Consejos y Recomendaciones */}
			<Title level={4}>💡 Consejos y Recomendaciones</Title>
			<Space
				orientation='vertical'
				size='small'
				style={{ width: '100%' }}
			>
				<Alert
					title='Verifique los códigos'
					description='Asegúrese de usar los códigos correctos de CUPS y CIE-10. Los códigos incorrectos pueden causar el rechazo de la factura.'
					type='warning'
					showIcon
				/>
				<Alert
					title='Fechas coherentes'
					description='La fecha de consulta debe ser anterior o igual a la fecha de remisión de la factura.'
					type='info'
					showIcon
				/>
				<Alert
					title='Valores sin formato'
					description='Ingrese los valores monetarios sin puntos, comas ni símbolos de moneda. Solo números.'
					type='info'
					showIcon
				/>
				<Alert
					title='Respalde sus datos'
					description='Guarde una copia del archivo ZIP generado como respaldo antes de enviarlo a la entidad.'
					type='success'
					showIcon
				/>
			</Space>

			<Divider />

			{/* Información de Contacto */}
			<Card
				size='small'
				style={{ background: '#f0f5ff', borderColor: '#adc6ff' }}
			>
				<Paragraph style={{ margin: 0 }}>
					<Text strong>Nota Legal:</Text> Esta aplicación genera
					archivos según la Resolución 3374 de 2000 (norma antigua).
					Verifique con su entidad si requiere la nueva Resolución
					4505 de 2012.
				</Paragraph>
			</Card>
		</Drawer>
	);
};
