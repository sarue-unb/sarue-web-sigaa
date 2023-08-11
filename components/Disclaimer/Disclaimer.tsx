import React, { useState } from 'react'
import {
	Box,
	Button,
	Checkbox,
	List,
	ListItem,
	Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import DisclaimerItem from './DisclaimerItem'

interface DisclaimerProps {
	open: boolean
	onAccept: () => void
}

const Disclaimer: React.FC<DisclaimerProps> = ({ open, onAccept }) => {
	const [accepted, setAccepted] = useState(false)
	const router = useRouter()

	if (!open) {
		return null
	}

	const handleAccept = () => {
		localStorage.setItem('disclaimerAccepted', 'true')
		onAccept()
		router.push('/dashboard')
	}

	// <DisclaimerItem
	// 	index={1}
	// 	title='Sobre o Saruê'
	// 	description='Este sistema, denominado SARUE (Sistema de Acompanhamento dos
	// 			Registros Universitários de Extensão), tem como objetivo
	// 			fornecer informações sobre atividades de extensão
	// 			universitária com base nos dados obtidos do sistema SIGAA
	// 			(Sistema Integrado de Gestão de Atividades Acadêmicas) da
	// 			Universidade de Brasília.'
	// />
	// <DisclaimerItem
	// 	index={2}
	// 	title='Uso'
	// 	description='Ao utilizar o SARUE, você concorda que além de coletar informações sobre as atividades de Extensão, ele também irá utilizar seu login e senha do SIGAA para acessar o sistema e, assim, obter os dados necessários para o seu devido funcionamento. Também concorda que as informações coletadas serão utilizadas exclusivamente para o propósito de fornecer e alimentar os serviços e funcionalidades do SARUE.'
	// />
	// <DisclaimerItem
	// 	index={3}
	// 	title='Funcionamento'
	// 	description='Os dados obtidos pelo sistema SARUE serão utilizados apenas para a realização do cálculo dos indicadores. Os únicos dados compartilhados com terceiros serão os indicadores, que não fazem referência a dados completos do SIGAA.'
	// />
	// <DisclaimerItem
	// 	index={4}
	// 	title='Segurança'
	// 	description='O sistema implementa medidas de segurança para proteger os dados dos usuários, no entanto, é responsabilidade do usuário tomar as devidas precauções para proteger suas informações pessoais, como por exemplo evitar realizar login em computadores de terceiros e em lugares com internet suspeita de falhas de segurança.'
	// />
	// <DisclaimerItem
	// 	index={5}
	// 	title='Consideraçõs finais'

	const disclaimerItems = [
		{
			title: 'Sobre o Saruê',
			description:
				'Este sistema, denominado SARUE (Sistema de Acompanhamento dos Registros Universitários de Extensão), tem como objetivo fornecer informações sobre atividades de extensão universitária com base nos dados obtidos do sistema SIGAA (Sistema Integrado de Gestão de Atividades Acadêmicas) da Universidade de Brasília.',
		},
		{
			title: 'Uso',
			description:
				'Ao utilizar o SARUE, você concorda que além de coletar informações sobre as atividades de Extensão, ele também irá utilizar seu login e senha do SIGAA para acessar o sistema e, assim, obter os dados necessários para o seu devido funcionamento. Também concorda que as informações coletadas serão utilizadas exclusivamente para o propósito de fornecer e alimentar os serviços e funcionalidades do SARUE.',
		},
		{
			title: 'Funcionamento',
			description:
				'Os dados obtidos pelo sistema SARUE serão utilizados apenas para a realização do cálculo dos indicadores. Os únicos dados compartilhados com terceiros serão os indicadores, que não fazem referência a dados completos do SIGAA.',
		},
		{
			title: 'Segurança',
			description:
				'O sistema implementa medidas de segurança para proteger os dados dos usuários, no entanto, é responsabilidade do usuário tomar as devidas precauções para proteger suas informações pessoais, como por exemplo evitar realizar login em computadores de terceiros e em lugares com internet suspeita de falhas de segurança.',
		},
		{
			title: 'Consideraçõs finais',
			description:
				'Dessa forma, você concorda que todo o conteúdo e dados disponibilizados pelo SARUE são de propriedade da instituição e estão protegidos por direitos autorais e de propriedade intelectual.',
		},
	]

	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 9999,
			}}
		>
			<Box
				sx={{
					backgroundColor: 'white',
					padding: '24px',
					borderRadius: '36px', // Bordas mais arredondadas
					boxShadow: 4,
					maxWidth: '1200px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					position: 'relative',
					fontSize: '300px',
				}}
			>
				<Typography
					textAlign='center'
					fontSize='46px'
					variant='h5'
					fontWeight='bold'
					gutterBottom
					sx={{
						position: 'absolute',
						top: '-78px', // Ajuste essa propriedade conforme necessário
						left: 0,
						color: 'primary',
					}}
				>
					Termo de consentimento
				</Typography>
				<Typography
					gutterBottom
					sx={{
						textAlign: 'justify',
						maxWidth: '1224px',
						color: 'textSecondary',
					}}
				>
					<List sx={{ paddingLeft: 0 }}>
						{disclaimerItems.map((item, index) => (
							<DisclaimerItem key={item.title} index={index + 1} {...item} />
						))}
					</List>
					<Typography
						fontStyle='italic'
						sx={{ marginTop: 0, color: 'black' }}
						fontSize='16px'
						textAlign='center'
					>
						Ao clicar em "Avançar" você aceita cumprir as condições acima
						mencionadas, e concorda com este termo de consentimento.
					</Typography>
				</Typography>

				{/* Checkbox */}
				<Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
					<Checkbox
						sx={{
							stroke: 'black',
							'&:hover': { stroke: 'black' },
						}}
						checked={accepted}
						onChange={e => setAccepted(e.target.checked)}
					/>
					<Typography
						variant='body2'
						sx={{ maxWidth: '800px', textAlign: 'left', color: 'black' }}
						fontSize='20px'
					>
						Concordo com este termo de consentimento
					</Typography>
				</Box>

				{/* Botão de Avançar */}
				<Button
					variant='contained'
					color='primary'
					onClick={handleAccept}
					sx={{ mt: 2, width: '300px', fontSize: '24px', borderRadius: '32px' }}
					disabled={!accepted}
				>
					Avançar
				</Button>
			</Box>
		</Box>
	)
}

export default Disclaimer
