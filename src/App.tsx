import { useState } from 'react';
import {
	Layout,
	Typography,
	Space,
	Tag,
	ConfigProvider,
	Flex,
} from 'antd';
import {
	MedicineBoxOutlined,
	FileTextOutlined,
} from '@ant-design/icons';
import { RipsForm } from './components/RipsForm';
import { DocumentationDrawer } from './components/DocumentationDrawer';
import 'antd/dist/reset.css';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

function App() {
	const [documentationOpen, setDocumentationOpen] = useState(false);

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#1890ff',
					borderRadius: 6,
					fontSize: 14,
				},
				components: {
					Layout: {
						headerBg: '#ffffff',
						footerBg: '#fafafa',
					},
				},
			}}
		>
			<Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
				<Header
					style={{
						position: 'sticky',
						top: 0,
						zIndex: 1000,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '0 24px',
						borderBottom: '1px solid #f0f0f0',
						boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
					}}
				>
					<Space size='middle' align='center'>
						<div
							style={{
								background:
									'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
								padding: '10px',
								borderRadius: '8px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								boxShadow: '0 2px 8px rgba(24, 144, 255, 0.3)',
							}}
						>
							<MedicineBoxOutlined
								style={{ fontSize: '24px', color: '#fff' }}
							/>
						</div>
						<Flex vertical style={{ lineHeight: 1 }}>
							<Title
								level={4}
								style={{
									margin: 0,
									lineHeight: 1.2,
									color: '#262626',
								}}
							>
								Generador de Archivos RIPS
							</Title>
							<Text type='secondary' style={{ fontSize: '12px' }}>
								Resolución 3374 de 2000 (Norma Antigua)
							</Text>
						</Flex>
					</Space>

					<Space size='middle'>
						<Tag color='success' style={{ margin: 0 }}>
							v1.0.0
						</Tag>
						<Space
							size='small'
							style={{ cursor: 'pointer' }}
							onClick={() => setDocumentationOpen(true)}
						>
							<FileTextOutlined style={{ color: '#1890ff' }} />
							<Text
								style={{
									fontSize: '14px',
									color: '#1890ff',
									cursor: 'pointer',
								}}
							>
								Documentación
							</Text>
						</Space>
					</Space>
				</Header>

				<Content
					style={{
						padding: '24px',
						maxWidth: '1600px',
						width: '100%',
						margin: '0 auto',
					}}
				>
					<RipsForm />
				</Content>

				<Footer style={{ textAlign: 'center', padding: '16px 24px' }}>
					<Text type='secondary' style={{ fontSize: '13px' }}>
						© {new Date().getFullYear()} Sistema de Gestión RIPS ·
						Generado con React, TypeScript y Ant Design
					</Text>
				</Footer>

				<DocumentationDrawer
					open={documentationOpen}
					onClose={() => setDocumentationOpen(false)}
				/>
			</Layout>
		</ConfigProvider>
	);
}

export default App;
