import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useIsMobile } from '@/components/hooks/useIsMobile'
import { BotaoIndicadores } from '../../../components/Indicadores/BotaoIndicadores/BotaoIndicadores'
import { IndicadoresTcuList } from '../../../components/Indicadores/IndicadoresTcuList'
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

export default function Indicadores() {
	const [showData, setShowData] = useState(false)
	const [width, setWidth] = React.useState(0)

	const handleButtonClick = () => {
		setShowData(!showData)
	}

	const isMobile = useIsMobile(width, setWidth)
	const buttons = Object.entries(IndicadoresTcuList).map(([key, value]) => (
		<BotaoIndicadores indicadorValue={value} onClick={handleButtonClick} />
	))

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
					{buttons}
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