import { useState, useMemo } from 'react';
import {
	Form,
	Input,
	Select,
	DatePicker,
	InputNumber,
	Button,
	Card,
	Row,
	Col,
	Table,
	Space,
	message,
	Divider,
	Tag,
} from 'antd';
import {
	PlusOutlined,
	DeleteOutlined,
	DownloadOutlined,
	UserOutlined,
	MedicineBoxOutlined,
	FileTextOutlined,
} from '@ant-design/icons';
import dayjs, { type Dayjs } from 'dayjs';
import { useRipsGenerator } from '../hooks/useRipsGenerator';
import {
	tiposIdentificacion,
	sexos,
	zonas,
	tiposUsuario,
	unidadesMedidaEdad,
	finalidadesConsulta,
	causasExternas,
	departamentos,
	municipios,
	diagnosticos,
	entidades,
	type EntidadValue,
	type FinalidadConsultaValue,
	type CausaExternaValue,
	type TipoDiagnosticoPrincipalValue,
} from '../data';
import type { Config, Usuario, Consulta } from '../types/rips';

// Tipos para las consultas guardadas
interface ConsultaGuardada
	extends Omit<
		Consulta,
		'numFactura' | 'codPrestador' | 'tipoIdUsuario' | 'numIdUsuario'
	> {
	id: string;
}

// Datos del paciente (interfaz para el formulario)
interface PacienteFormData {
	tipoIdUsuario: string;
	numIdUsuario: string;
	apellido1: string;
	apellido2?: string;
	nombre1: string;
	nombre2?: string;
	edad: number;
	sexo: string;
	codEntidad: string;
	tipoUsuario: string;
	unidadMedida: string;
	zona: string;
	codDepto: string;
	codMuni: string;
}

// Datos de la consulta (interfaz para el formulario)
interface ConsultaFormData {
	fechaConsulta: Dayjs | null;
	codConsulta: string;
	codDiagPrincipal: string;
	codDiagRel1?: string;
	codDiagRel2?: string;
	codDiagRel3?: string;
	finalidad: string;
	causaExterna: string;
	tipoDiagPrincipal: string;
	numAutorizacion?: string;
	valorConsulta: number;
	cuotaModeradora: number;
	valorNeto: number;
	copago: number;
	comision: number;
	descuento: number;
}

// --- COMPONENTE PRINCIPAL ---
export const RipsForm = () => {
	const { generateRIPS } = useRipsGenerator();

	// Form de Ant Design para facturación
	const [formFacturacion] = Form.useForm();

	// Form de Ant Design para paciente
	const [formPaciente] = Form.useForm<PacienteFormData>();

	// Form de Ant Design para consultas
	const [formConsulta] = Form.useForm<ConsultaFormData>();

	// Estado para almacenar el paciente actual y sus consultas
	const [paciente, setPaciente] = useState<PacienteFormData | null>(
		null,
	);
	const [consultas, setConsultas] = useState<ConsultaGuardada[]>([]);

	// Observar cambios en los campos para calcular Valor Neto automáticamente
	const valorConsulta =
		Form.useWatch('valorConsulta', formConsulta) || 0;
	const cuotaModeradora =
		Form.useWatch('cuotaModeradora', formConsulta) || 0;
	const copago = Form.useWatch('copago', formConsulta) || 0;

	// Calcular y actualizar Valor Neto automáticamente
	useMemo(() => {
		const valorNeto = valorConsulta - (cuotaModeradora + copago);
		formConsulta.setFieldValue(
			'valorNeto',
			valorNeto >= 0 ? valorNeto : 0,
		);
	}, [valorConsulta, cuotaModeradora, copago, formConsulta]);

	// Filtrar municipios basado en el departamento seleccionado
	const departamentoSeleccionado = Form.useWatch(
		'codDepto',
		formPaciente,
	);

	const municipiosFiltrados = useMemo(() => {
		if (!departamentoSeleccionado) return [];
		const deptoId = departamentos.find(
			(d) => d.value === departamentoSeleccionado,
		)?.id;
		if (!deptoId) return [];
		return municipios.filter((m) => m.departamento === deptoId);
	}, [departamentoSeleccionado]);

	// Guardar o actualizar paciente
	const handleGuardarPaciente = () => {
		formPaciente
			.validateFields()
			.then((values) => {
				setPaciente(values);
				message.success('Paciente registrado correctamente');
			})
			.catch(() => {
				message.error('Complete los campos requeridos del paciente');
			});
	};

	// Agregar consulta a la lista
	const handleAgregarConsulta = () => {
		if (!paciente) {
			message.warning(
				'Primero debe registrar los datos del paciente',
			);
			return;
		}

		formConsulta
			.validateFields()
			.then((values) => {
				const nuevaConsulta: ConsultaGuardada = {
					id: `${Date.now()}-${Math.random()}`,
					fechaConsulta: values.fechaConsulta!.toDate(),
					codConsulta: values.codConsulta,
					codDiagPrincipal: values.codDiagPrincipal as never,
					codDiagRel1: values.codDiagRel1 || '',
					codDiagRel2: values.codDiagRel2 || '',
					codDiagRel3: values.codDiagRel3 || '',
					finalidad: values.finalidad as FinalidadConsultaValue,
					causaExterna: values.causaExterna as CausaExternaValue,
					tipoDiagPrincipal:
						values.tipoDiagPrincipal as TipoDiagnosticoPrincipalValue,
					numAutorizacion: values.numAutorizacion || '',
					valorConsulta: values.valorConsulta,
					cuotaModeradora: values.cuotaModeradora,
					valorNeto: values.valorNeto,
					copago: values.copago,
					comision: values.comision,
					descuento: values.descuento,
				};

				setConsultas([...consultas, nuevaConsulta]);
				formConsulta.resetFields();
				message.success('Consulta agregada correctamente');
			})
			.catch(() => {
				message.error(
					'Complete los campos requeridos de la consulta',
				);
			});
	};

	// Eliminar consulta de la lista
	const handleEliminarConsulta = (id: string) => {
		setConsultas(consultas.filter((c) => c.id !== id));
		message.info('Consulta eliminada');
	};

	// Generar RIPS
	const handleGenerarRIPS = () => {
		if (!paciente) {
			message.error('Debe registrar un paciente');
			return;
		}

		if (consultas.length === 0) {
			message.error('Debe agregar al menos una consulta');
			return;
		}

		formFacturacion
			.validateFields()
			.then((valuesFacturacion) => {
				// 1. Config
				const codEntidadSeleccionada =
					paciente.codEntidad as EntidadValue;
				const entidadSeleccionada = entidades.find(
					(e) => e.value === codEntidadSeleccionada,
				);

				const config: Config = {
					codPrestador: valuesFacturacion.codPrestador,
					razonSocial: valuesFacturacion.razonSocial,
					nitPrestador: valuesFacturacion.nitPrestador,
					numFactura: valuesFacturacion.numFactura,
					fechaRemision:
						valuesFacturacion.fechaRemision.format('YYYY-MM-DD'),
					codEntidad: codEntidadSeleccionada,
					nombreEntidad: entidadSeleccionada?.label ?? 'NUEVA EPS',
					tipoId: 'NI' as const,
					numId: valuesFacturacion.nitPrestador,
				}; // 2. Usuario
				const usuario: Usuario = {
					tipoId: paciente.tipoIdUsuario,
					numId: paciente.numIdUsuario,
					codEntidad: paciente.codEntidad,
					tipoUsuario: paciente.tipoUsuario,
					apellido1: paciente.apellido1,
					apellido2: paciente.apellido2 || '',
					nombre1: paciente.nombre1,
					nombre2: paciente.nombre2 || '',
					edad: paciente.edad,
					unidadMedida: paciente.unidadMedida,
					sexo: paciente.sexo,
					codDepto: paciente.codDepto,
					codMuni: paciente.codMuni,
					zona: paciente.zona,
				} as Usuario;

				// 3. Consultas
				const consultasCompletas: Consulta[] = consultas.map((c) => ({
					numFactura: valuesFacturacion.numFactura,
					codPrestador: valuesFacturacion.codPrestador,
					tipoIdUsuario: paciente.tipoIdUsuario,
					numIdUsuario: paciente.numIdUsuario,
					fechaConsulta: c.fechaConsulta,
					numAutorizacion: c.numAutorizacion,
					codConsulta: c.codConsulta,
					finalidad: c.finalidad,
					causaExterna: c.causaExterna,
					codDiagPrincipal: c.codDiagPrincipal,
					codDiagRel1: c.codDiagRel1,
					codDiagRel2: c.codDiagRel2,
					codDiagRel3: c.codDiagRel3,
					tipoDiagPrincipal: c.tipoDiagPrincipal,
					valorConsulta: c.valorConsulta,
					cuotaModeradora: c.cuotaModeradora,
					valorNeto: c.valorNeto,
					copago: c.copago,
					comision: c.comision,
					descuento: c.descuento,
				})) as Consulta[];

				generateRIPS(config, [usuario], consultasCompletas);
				message.success('Archivos RIPS generados exitosamente');
			})
			.catch(() => {
				message.error('Complete los datos de facturación');
			});
	};

	// Columnas de la tabla de consultas
	const columnasConsultas = [
		{
			title: 'Fecha',
			dataIndex: 'fechaConsulta',
			key: 'fechaConsulta',
			width: 110,
			render: (fecha: Date) => dayjs(fecha).format('DD/MM/YYYY'),
		},
		{
			title: 'CUPS',
			dataIndex: 'codConsulta',
			key: 'codConsulta',
			width: 100,
		},
		{
			title: 'Diagnóstico Principal',
			dataIndex: 'codDiagPrincipal',
			key: 'codDiagPrincipal',
			width: 120,
			render: (cod: string) => {
				const diag = diagnosticos.find((d) => d.value === cod);
				return diag ? `${cod} - ${diag.label}` : cod;
			},
		},
		{
			title: 'Valor Neto',
			dataIndex: 'valorNeto',
			key: 'valorNeto',
			width: 100,
			align: 'right' as const,
			render: (val: number) => `$${val.toLocaleString()}`,
		},
		{
			title: 'Copago',
			dataIndex: 'copago',
			key: 'copago',
			width: 90,
			align: 'right' as const,
			render: (val: number) => `$${val.toLocaleString()}`,
		},
		{
			title: 'Comisión',
			dataIndex: 'comision',
			key: 'comision',
			width: 90,
			align: 'right' as const,
			render: (val: number) => `$${val.toLocaleString()}`,
		},
		{
			title: 'Descuento',
			dataIndex: 'descuento',
			key: 'descuento',
			width: 90,
			align: 'right' as const,
			render: (val: number) => `$${val.toLocaleString()}`,
		},
		{
			title: 'Acciones',
			key: 'acciones',
			width: 80,
			fixed: 'right' as const,
			render: (_: unknown, record: ConsultaGuardada) => (
				<Button
					type='text'
					danger
					size='small'
					icon={<DeleteOutlined />}
					onClick={() => handleEliminarConsulta(record.id)}
				/>
			),
		},
	];

	return (
		<div className='space-y-6 pb-20'>
			{/* CABECERA FACTURA */}
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Card
						title={
							<Space>
								<MedicineBoxOutlined />
								<span>Datos de Facturación (AF)</span>
							</Space>
						}
					>
						<Form
							form={formFacturacion}
							layout='vertical'
							initialValues={{
								codPrestador: '110011081401',
								razonSocial: 'Janneth Granados',
								nitPrestador: '51612848',
								numFactura: '',
								fechaRemision: dayjs(),
							}}
						>
							<Row gutter={8}>
								<Col span={5}>
									<Form.Item
										label='Código Prestador'
										name='codPrestador'
										rules={[{ required: true, message: 'Requerido' }]}
									>
										<Input placeholder='REPS' />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item
										label='Razón Social'
										name='razonSocial'
										rules={[{ required: true, message: 'Requerido' }]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col span={4}>
									<Form.Item
										label='NIT Prestador'
										name='nitPrestador'
										rules={[{ required: true, message: 'Requerido' }]}
									>
										<Input placeholder='Sin guión' />
									</Form.Item>
								</Col>
								<Col span={4}>
									<Form.Item
										label='N° Factura'
										name='numFactura'
										rules={[{ required: true, message: 'Requerido' }]}
									>
										<Input prefix='FVE' />
									</Form.Item>
								</Col>
								<Col span={3}>
									<Form.Item
										label='Fecha Remisión'
										name='fechaRemision'
										rules={[{ required: true, message: 'Requerido' }]}
									>
										<DatePicker
											format='DD/MM/YYYY'
											style={{ width: '100%' }}
										/>
									</Form.Item>
								</Col>
							</Row>
						</Form>
					</Card>
				</Col>
				<Col span={24}>
					<Card
						title={
							<Space>
								<UserOutlined />
								<span>Datos del Paciente (US)</span>
							</Space>
						}
						extra={
							<Button type='primary' onClick={handleGuardarPaciente}>
								{paciente ? 'Actualizar' : 'Registrar'}
							</Button>
						}
					>
						<Form
							form={formPaciente}
							layout='vertical'
							initialValues={{
								tipoIdUsuario: 'RC',
								sexo: 'M',
								codEntidad: 'EPS037',
								tipoUsuario: '1',
								unidadMedida: '1',
								zona: 'U',
								codDepto: '11',
								codMuni: '11001',
								edad: 0,
							}}
						>
							<Row gutter={8}>
								<Col span={12}>
									<Form.Item
										label='Tipo ID'
										name='tipoIdUsuario'
										rules={[{ required: true }]}
									>
										<Select
											showSearch
											filterOption={(input, option) =>
												(
													option?.label?.toString().toLowerCase() ??
													''
												).includes(input.toLowerCase())
											}
											options={tiposIdentificacion.map((t) => ({
												value: t.value,
												label: `${t.value} - ${t.label}`,
											}))}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										label='Número de Identificación'
										name='numIdUsuario'
										rules={[{ required: true, message: 'Requerido' }]}
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={8}>
								<Col span={6}>
									<Form.Item
										label='Primer Apellido'
										name='apellido1'
										rules={[{ required: true, message: 'Requerido' }]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item
										label='Segundo Apellido'
										name='apellido2'
									>
										<Input />
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item
										label='Primer Nombre'
										name='nombre1'
										rules={[{ required: true, message: 'Requerido' }]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item label='Segundo Nombre' name='nombre2'>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={8}>
								<Col span={8}>
									<Form.Item label='Edad' name='edad'>
										<InputNumber
											min={0}
											max={150}
											style={{ width: '100%' }}
										/>
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label='U. Medida' name='unidadMedida'>
										<Select
											options={unidadesMedidaEdad.map((u) => ({
												value: u.value,
												label: `${u.value} - ${u.label}`,
											}))}
										/>
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label='Sexo' name='sexo'>
										<Select
											options={sexos.map((s) => ({
												value: s.value,
												label: `${s.value} - ${s.label}`,
											}))}
										/>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={8}>
								<Col span={12}>
									<Form.Item
										label='EPS / Entidad'
										name='codEntidad'
										rules={[{ required: true }]}
									>
										<Select
											showSearch
											filterOption={(input, option) =>
												(
													option?.label?.toString().toLowerCase() ??
													''
												).includes(input.toLowerCase())
											}
											virtual
											options={entidades.map((e) => ({
												value: e.value,
												label: `${e.value} - ${e.label}`,
											}))}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label='Tipo Usuario' name='tipoUsuario'>
										<Select
											options={tiposUsuario.map((t) => ({
												value: t.value,
												label: `${t.value} - ${t.label}`,
											}))}
										/>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={8}>
								<Col span={8}>
									<Form.Item label='Departamento' name='codDepto'>
										<Select
											showSearch
											filterOption={(input, option) =>
												(
													option?.label?.toString().toLowerCase() ??
													''
												).includes(input.toLowerCase())
											}
											virtual
											options={departamentos.map((d) => ({
												value: d.value,
												label: d.label,
											}))}
											onChange={() =>
												formPaciente.setFieldValue(
													'codMuni',
													undefined,
												)
											}
										/>
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label='Municipio' name='codMuni'>
										<Select
											showSearch
											filterOption={(input, option) =>
												(
													option?.label?.toString().toLowerCase() ??
													''
												).includes(input.toLowerCase())
											}
											virtual
											disabled={!departamentoSeleccionado}
											options={municipiosFiltrados.map((m) => ({
												value: m.value,
												label: m.label,
											}))}
										/>
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label='Zona' name='zona'>
										<Select
											options={zonas.map((z) => ({
												value: z.value,
												label: `${z.value} - ${z.label}`,
											}))}
										/>
									</Form.Item>
								</Col>
							</Row>
						</Form>
					</Card>
				</Col>
				<Col span={24}>
					<Row gutter={16}>
						<Col span={8}></Col>
						<Col span={16}></Col>
					</Row>
					<Card
						title={
							<Space>
								<MedicineBoxOutlined />
								<span>Consultas (AC)</span>
							</Space>
						}
						extra={
							<Button
								type='primary'
								icon={<PlusOutlined />}
								onClick={handleAgregarConsulta}
							>
								Agregar Consulta
							</Button>
						}
					>
						{/* FORMULARIO DE CONSULTA */}
						<Form
							form={formConsulta}
							layout='vertical'
							initialValues={{
								finalidad: '10',
								causaExterna: '13',
								tipoDiagPrincipal: '1',
								valorConsulta: 0,
								cuotaModeradora: 0,
								valorNeto: 0,
								copago: 0,
								comision: 0,
								descuento: 0,
							}}
						>
							<Row gutter={8}>
								<Col span={8}>
									<Form.Item
										label='Fecha Consulta'
										name='fechaConsulta'
										rules={[{ required: true, message: 'Requerido' }]}
									>
										<DatePicker
											format='DD/MM/YYYY'
											style={{ width: '100%' }}
										/>
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item
										label='Código CUPS'
										name='codConsulta'
										rules={[{ required: true, message: 'Requerido' }]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item
										label='N° Autorización'
										name='numAutorizacion'
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={8}>
								<Col span={5}>
									<Form.Item label='Finalidad' name='finalidad'>
										<Select
											showSearch
											filterOption={(input, option) =>
												(
													option?.label?.toString().toLowerCase() ??
													''
												).includes(input.toLowerCase())
											}
											options={finalidadesConsulta.map((f) => ({
												value: f.value,
												label: `${f.value} - ${f.label}`,
											}))}
										/>
									</Form.Item>
								</Col>
								<Col span={5}>
									<Form.Item
										label='Causa Externa'
										name='causaExterna'
									>
										<Select
											showSearch
											filterOption={(input, option) =>
												(
													option?.label?.toString().toLowerCase() ??
													''
												).includes(input.toLowerCase())
											}
											options={causasExternas.map((c) => ({
												value: c.value,
												label: `${c.value} - ${c.label}`,
											}))}
										/>
									</Form.Item>
								</Col>
								<Col span={5}>
									<Form.Item
										label='Tipo Diag.'
										name='tipoDiagPrincipal'
									>
										<Select
											options={[
												{
													value: '1',
													label: '1 - Impresión diagnóstica',
												},
												{
													value: '2',
													label: '2 - Confirmado nuevo',
												},
												{
													value: '3',
													label: '3 - Confirmado repetido',
												},
											]}
										/>
									</Form.Item>
								</Col>
								<Col span={9}>
									<Form.Item
										label='Diagnóstico Principal (CIE-10)'
										name='codDiagPrincipal'
										rules={[{ required: true, message: 'Requerido' }]}
									>
										<Select
											showSearch
											virtual
											filterOption={(input, option) => {
												const label =
													option?.label?.toString().toLowerCase() ||
													'';
												const value =
													option?.value?.toString().toLowerCase() ||
													'';
												const search = input.toLowerCase();
												return (
													label.includes(search) ||
													value.includes(search)
												);
											}}
											options={diagnosticos.map((d) => ({
												value: d.value,
												label: `${d.value} - ${d.label}`,
											}))}
										/>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={8}>
								<Col span={8}>
									<Form.Item
										label='Valor Consulta'
										name='valorConsulta'
									>
										<InputNumber
											min={0}
											style={{ width: '100%' }}
											formatter={(value) =>
												`$ ${value}`.replace(
													/\B(?=(\d{3})+(?!\d))/g,
													',',
												)
											}
											parser={(value: string | undefined) =>
												Number(
													value?.replace(/\$\s?|(,*)/g, '') || 0,
												) as number & 0
											}
										/>
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item
										label='Cuota Moderadora'
										name='cuotaModeradora'
									>
										<InputNumber
											min={0}
											style={{ width: '100%' }}
											formatter={(value) =>
												`$ ${value}`.replace(
													/\B(?=(\d{3})+(?!\d))/g,
													',',
												)
											}
											parser={(value: string | undefined) =>
												Number(
													value?.replace(/\$\s?|(,*)/g, '') || 0,
												) as number & 0
											}
										/>
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label='Copago' name='copago'>
										<InputNumber
											min={0}
											style={{ width: '100%' }}
											formatter={(value) =>
												`$ ${value}`.replace(
													/\B(?=(\d{3})+(?!\d))/g,
													',',
												)
											}
											parser={(value: string | undefined) =>
												Number(
													value?.replace(/\$\s?|(,*)/g, '') || 0,
												) as number & 0
											}
										/>
									</Form.Item>
								</Col>
							</Row>

							<Row gutter={8}>
								<Col span={8}>
									<Form.Item label='Comisión' name='comision'>
										<InputNumber
											min={0}
											style={{ width: '100%' }}
											formatter={(value) =>
												`$ ${value}`.replace(
													/\B(?=(\d{3})+(?!\d))/g,
													',',
												)
											}
											parser={(value: string | undefined) =>
												Number(
													value?.replace(/\$\s?|(,*)/g, '') || 0,
												) as number & 0
											}
										/>
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label='Descuento' name='descuento'>
										<InputNumber
											min={0}
											style={{ width: '100%' }}
											formatter={(value) =>
												`$ ${value}`.replace(
													/\B(?=(\d{3})+(?!\d))/g,
													',',
												)
											}
											parser={(value: string | undefined) =>
												Number(
													value?.replace(/\$\s?|(,*)/g, '') || 0,
												) as number & 0
											}
										/>
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label='Valor Neto' name='valorNeto'>
										<InputNumber
											min={0}
											style={{ width: '100%' }}
											disabled
											formatter={(value) =>
												`$ ${value}`.replace(
													/\B(?=(\d{3})+(?!\d))/g,
													',',
												)
											}
											parser={(value: string | undefined) =>
												Number(
													value?.replace(/\$\s?|(,*)/g, '') || 0,
												) as number & 0
											}
										/>
									</Form.Item>
								</Col>
							</Row>
						</Form>
						<Divider />
						<Table
							dataSource={consultas}
							columns={columnasConsultas}
							rowKey='id'
							pagination={false}
							scroll={{ x: 900, y: 400 }}
							size='small'
							locale={{
								emptyText:
									'No hay consultas agregadas. Complete el formulario y presione "Agregar Consulta"',
							}}
						/>
					</Card>
				</Col>
				<Col span={24}>
					<Card
						title={
							<Space>
								<FileTextOutlined />
								<span>Archivo de Control (CT)</span>
							</Space>
						}
					>
						<Table
							dataSource={[
								{
									key: 'AF',
									archivo: 'AF - Facturas',
									descripcion: 'Resumen económico de la facturación',
									registros: paciente && consultas.length > 0 ? 1 : 0,
								},
								{
									key: 'US',
									archivo: 'US - Usuarios',
									descripcion: 'Datos demográficos de los pacientes',
									registros: paciente ? 1 : 0,
								},
								{
									key: 'AC',
									archivo: 'AC - Consultas',
									descripcion: 'Detalle de las actividades clínicas',
									registros: consultas.length,
								},
							]}
							columns={[
								{
									title: 'Tipo',
									dataIndex: 'key',
									key: 'key',
									width: 80,
									render: (text: string) => {
										const colors: Record<string, string> = {
											AF: 'orange',
											US: 'blue',
											AC: 'green',
										};
										return (
											<Tag color={colors[text]} style={{ margin: 0 }}>
												{text}
											</Tag>
										);
									},
								},
								{
									title: 'Archivo',
									dataIndex: 'archivo',
									key: 'archivo',
								},
								{
									title: 'Descripción',
									dataIndex: 'descripcion',
									key: 'descripcion',
								},
								{
									title: 'Registros',
									dataIndex: 'registros',
									key: 'registros',
									width: 100,
									align: 'center' as const,
									render: (registros: number) => (
										<Tag
											color={registros > 0 ? 'success' : 'default'}
										>
											{registros}
										</Tag>
									),
								},
							]}
							pagination={false}
							size='small'
						/>
					</Card>
				</Col>
				<Col span={24}>
					<Button
						type='primary'
						size='large'
						block
						icon={<DownloadOutlined />}
						onClick={handleGenerarRIPS}
						disabled={!paciente || consultas.length === 0}
					>
						Generar RIPS
					</Button>
				</Col>
			</Row>

			{/* BOTÓN GENERAR RIPS (FLOTANTE) */}
		</div>
	);
};
