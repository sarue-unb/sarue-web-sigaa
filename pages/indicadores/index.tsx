import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts'
import Link from 'next/link'

const data = [
	{
		ano: '2020',
		total_acoes: 400,
	},
	{
		ano: '2021',
		total_acoes: 300,
	},
	{
		ano: '2022',
		total_acoes: 200,
	},
	{
		ano: '2023',
		total_acoes: 278,
	},
	{
		ano: '2024',
		total_acoes: 189,
	},
]

interface BotaoIndicadoresProps {
	label: string
	onClick: () => void
}

const BotaoIndicadores: React.FC<BotaoIndicadoresProps> = ({
	label,
	onClick,
}) => (
	<Button
		variant='contained'
		onClick={onClick}
		sx={{
			width: '542px',
			height: '84px',
			my: 1,
			whiteSpace: 'break-spaces',
			justifyContent: 'space-between',
			backgroundColor: 'green !important',
			borderRadius: '24px',
			marginLeft: '350px',
			display: 'flex',
			alignItems: 'center',
			paddingLeft: '24px',
			paddingRight: '24px',
		}}
	>
		{label}
		<KeyboardArrowRightIcon />
	</Button>
)

export default function Indicadores() {
	const [showData, setShowData] = useState(false)

	const handleButtonClick = () => {
		setShowData(!showData)
	}

	return (
		<Box
			display='flex'
			flexDirection='column'
			height='100vh'
			alignItems='center'
			justifyContent='center'
		>
			<Typography
				marginBottom={10}
				marginTop='10px'
				textAlign='center'
				fontSize='1.5em'
			>
				Sistema de Apuração dos Registros Universitários de Extensão
			</Typography>

			<Typography marginTop='10px' textAlign='center' fontSize='40px'>
				Indicadores TCU
			</Typography>
			<hr
				style={{
					borderTop: '1px solid white',
					width: '70%',
					margin: '0 0 0 50px 0',
				}}
			/>

			<Box
				display='flex'
				flexDirection='row'
				alignItems='flex-start'
				width='100%'
				my={2}
			>
				{/* Botões*/}
				<Box display='flex' flexDirection='column' alignItems='flex-start'>
					<BotaoIndicadores
						label='Índice de ações institucionalizadas no SIGAA em relação ao ano anterior'
						onClick={handleButtonClick}
					/>
					<BotaoIndicadores
						label='Índice Quantitativo de ações de extensão que possuem mais de uma unidade acadêmica vinculada'
						onClick={handleButtonClick}
					/>
					<BotaoIndicadores
						label='Número de estudantes extensionistas por projeto'
						onClick={handleButtonClick}
					/>
					<BotaoIndicadores
						label='Total de pessoas diretamente atendidas pelos programas e projetos de extensão'
						onClick={handleButtonClick}
					/>
					<BotaoIndicadores
						label='Número de pessoas externas à UnB que atuaram como membros da equipe das ações de extensão'
						onClick={handleButtonClick}
					/>
					<BotaoIndicadores
						label='Quantitativo de ações cadastradas por cada um dos 17 ODS'
						onClick={handleButtonClick}
					/>
					<BotaoIndicadores
						label='Quantitativo de ações cadastradas por categoria (programas, projetos, cursos e eventos)'
						onClick={handleButtonClick}
					/>
				</Box>

				<Box
					bgcolor='white'
					height='600px'
					width='852px'
					mx={2}
					marginRight={40}
					flexShrink={0}
					borderRadius='48px'
					padding={10}
				>
					{showData}

					{/* Gráfico */}
					<ResponsiveContainer width='92%' height={400}>
						<LineChart
							data={data}
							margin={{
								top: -10,
								right: -10,
								left: -20,
								bottom: -20,
							}}
						>
							<CartesianGrid strokeDasharray='10 10' />
							<XAxis dataKey='ano' />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line type='monotone' dataKey='total_acoes' stroke='#8884d8' />
						</LineChart>
					</ResponsiveContainer>
				</Box>
			</Box>

			{/* Box Informações do Indicador */}
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='flex-end'
				border='1px solid white'
				width='38%'
				borderRadius='48px'
				my={2}
				marginLeft='690px'
				marginRight='320px'
				padding='12px'
				marginTop='-90px'
			>
				<Typography variant='h5' align='center' style={{ marginBottom: '2px' }}>
					Informações do Indicador
				</Typography>
				<Box display='flex' flexDirection='column' padding='62px'>
					<Typography
						variant='subtitle1'
						style={{
							fontSize: '20px',
							marginBottom: '12px',
							fontWeight: 'bold',
							textAlign: 'justify',
							marginLeft: '-52px',
						}}
					>
						Nome do Indicador:{' '}
						<span style={{ fontWeight: 'normal' }}>
							Índice de ações institucionalizadas no SIGAA
						</span>
					</Typography>
					<Typography
						variant='subtitle1'
						style={{
							fontSize: '20px',
							marginBottom: '12px',
							fontWeight: 'bold',
							textAlign: 'justify',
							marginLeft: '-52px',
						}}
					>
						Forma de Cálculo:{' '}
						<span style={{ fontWeight: 'normal' }}>
							O cálculo foi realizado com base em estatísticas
						</span>
					</Typography>
					<Typography
						variant='subtitle1'
						style={{
							fontSize: '20px',
							marginBottom: '0px',
							fontWeight: 'bold',
							textAlign: 'justify',
							marginLeft: '-52px',
						}}
					>
						Informações Complementares:{' '}
						<span style={{ fontWeight: 'normal' }}>
							O indicador acima foi baseado em informações do SIGAA.
						</span>
					</Typography>
				</Box>

				<Box textAlign='center' marginTop='28px'>
					<Link href='/detalhes-indicadores'>
						<Button
							variant='contained'
							color='primary'
							size='large'
							style={{
								borderRadius: '28px',
								padding: '8px 50px',
							}}
						>
							Mais detalhes
						</Button>
					</Link>
				</Box>
			</Box>
		</Box>
	)
}
