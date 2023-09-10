import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { useIsMobile } from '@/components/hooks/hooks'

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
			maxWidth: '30rem',
			my: 1,
			whiteSpace: 'break-spaces',
			justifyContent: 'space-between',
			backgroundColor: 'green !important',
			borderRadius: '24px',
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
	const [width, setWidth] = React.useState(0)

	const handleButtonClick = () => {
		setShowData(!showData)
	}

	const isMobile = useIsMobile(width, setWidth)
	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
		>
			<Typography marginTop='10px' textAlign='center' fontSize='2em'>
				Indicadores TCU
			</Typography>
			<hr
				style={{
					borderTop: '1px solid white',
					width: '70%',
					margin: '0 0 0 50px 0',
				}}
			/>

			<Box display='flex' maxWidth='80%' flexDirection='row' my={2}>
				{/* Botões*/}
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='flex-start'
					alignItems='flex-start'
				>
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
				{/* Render only if screen Width : 720 */}
				{!isMobile && (
					<Box
						bgcolor='white'
						minHeight='10rem'
						minWidth='30rem'
						maxHeight='30rem'
						maxWidth='45rem'
						marginLeft='2rem'
						borderRadius='48px'
						padding={4}
					>
						{showData}

						{/* Gráfico */}
						<ResponsiveContainer width='100%'>
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
				)}
			</Box>

			{/* Box Informações do Indicador */}
			<Box
				display='flex'
				flexDirection='column'
				alignItems={'center'}
				border='1px solid white'
				borderRadius='48px'
				mb={10}
				mx={4}
				p={4}
			>
				<Typography variant='h5' align='center'>
					Informações do Indicador
				</Typography>
				<Box
					width='80%'
					display='flex'
					flexDirection='column'
					justifyContent={'center'}
				>
					<Typography
						variant='subtitle1'
						style={{
							fontSize: '1em',
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
							fontSize: '1em',
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
							fontSize: '1em',
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
