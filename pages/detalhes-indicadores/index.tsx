import { Box, Button, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
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
import { saveAs } from 'file-saver'

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

export default function DetailsPage() {
	const [showData, setShowData] = useState(false)
	const chartRef = useRef<any>(null)

	const handleButtonClick = () => {
		if (chartRef.current === null) {
			return
		}

		const svgComponent = chartRef.current.container.children[0]

		const svgURL = new XMLSerializer().serializeToString(svgComponent)
		const svgBlob = new Blob([svgURL], { type: 'image/svg+xml;charset=utf-8' })
		saveAs(svgBlob, 'grafico.svg')
	}

	return (
		<Box display='flex' alignItems={'center'} flexDirection='column'>
			<Typography margin={8} alignSelf='start' fontSize='32px'>
				Indicadores &gt; Mais detalhes
			</Typography>
			<Box
				alignSelf={'center'}
				bgcolor='white'
				minHeight='10rem'
				minWidth='40rem'
				borderRadius='48px'
				padding={4}
			>
				{/* Gráfico */}
				<ResponsiveContainer width='100%' height={400}>
					<LineChart
						data={data}
						ref={chartRef}
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

			<Box
				display='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
				width='52%'
				bgcolor='rgba(22, 26, 35, 1)'
				borderRadius='20px'
				padding={10}
				marginTop={8}
			>
				<Typography variant='h5'>
					Gráfico obtido a partir de levantamento do SIGAA..
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '42px',
				}}
			>
				<Link href='/indicadores'>
					<Button
						variant='contained'
						color='primary'
						size='large'
						style={{
							borderRadius: '28px',
							padding: '8px 102px',
							minWidth: '20px',
						}}
					>
						Voltar
					</Button>
				</Link>

				<Button
					onClick={handleButtonClick}
					variant='contained'
					color='primary'
					size='large'
					style={{
						borderRadius: '28px',
						padding: '8px 72px',
						minWidth: '20px',
						marginLeft: '100px',
					}}
				>
					Baixar gráfico
				</Button>
			</Box>
		</Box>
	)
}
