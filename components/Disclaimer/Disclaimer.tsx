import React, { useEffect, useState } from 'react'
import {
	Box,
	Button,
	Checkbox,
	List,
	Typography,
	Modal,
	FormControlLabel,
} from '@mui/material'
import { useRouter } from 'next/router'
import DisclaimerItem from './DisclaimerItem'

const disclaimerItems = [
	{ title: 'Termo de consentimento', description: '' },
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

const DisclaimerModal = () => {
	const [accepted, setAccepted] = useState(false)

	const router = useRouter()
	const [open, setOpen] = React.useState(false)

	const handleDisclaimerClick = () => {
		localStorage.setItem('disclaimerAccepted', 'true')
		router.push('/dashboard')
		setOpen(false)
	}

	useEffect(() => {
		if (!localStorage.getItem('disclaimerAccepted')) {
			setOpen(true)
		}
	}, [open])

	return (
		<Modal
			open={open}
			aria-labelledby='Termo de consentimento'
			aria-describedby='Termo de consentimento para uso do sistema Sarue'
			hideBackdrop
			sx={{ overflow: 'scroll' }}
		>
			<Box
				sx={{
					position: 'relative',
					backgroundColor: 'rgba(0, 0, 0, 0.8)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					zIndex: 9999,
					minHeight: '100%',
				}}
			>
				<Box
					sx={{
						backgroundColor: 'white',
						padding: '3em',
						borderRadius: '36px', // Bordas mais arredondadas
						maxWidth: '920px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						position: 'relative',
						margin: '2em',
					}}
				>
					<Typography
						gutterBottom
						sx={{
							textAlign: 'justify',
							color: 'textSecondary',
						}}
					>
						<List sx={{ paddingLeft: 0 }}>
							{disclaimerItems.map((item, index) => (
								<DisclaimerItem key={item.title} index={index} {...item} />
							))}
						</List>
						<Typography
							fontStyle='italic'
							sx={{ marginTop: 0, color: 'black' }}
							fontSize='1.5em'
							textAlign='center'
						>
							Ao clicar em "Avançar" você aceita cumprir as condições acima
							mencionadas, e concorda com este termo de consentimento.
						</Typography>
					</Typography>

					{/* Checkbox */}
					<Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
						<FormControlLabel
							sx={{ color: 'black' }}
							label='Concordo com este termo de uso'
							control={
								<Checkbox
									sx={{
										stroke: 'black',
										'&:hover': { stroke: 'black' },
									}}
									checked={accepted}
									onChange={e => setAccepted(e.target.checked)}
								/>
							}
						/>
					</Box>

					<Button
						variant='contained'
						color='primary'
						onClick={handleDisclaimerClick}
						sx={{
							mt: 2,
							width: '300px',
							fontSize: '1em',
							borderRadius: '32px',
							marginBottom: '1em',
						}}
						disabled={!accepted}
					>
						Avançar
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}

export default DisclaimerModal
