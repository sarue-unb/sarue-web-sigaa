import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
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
import { IndicadoresTcuList } from '../../../components/Indicadores/IndicadoresTcuList'
import { getDatabase } from '@/components/utils/utils'

export const AcoesInstitucionalizadas = () => {
	const [showData, setShowData] = useState(false)
	const [xvalue, setXvalue] = useState([])
	const [yvalue, setYvalue] = useState([])
	const chartRef = useRef<any>(null)
	const [graphData, setGraphData] = useState({})
	const [finalData, setFinalData] = useState([])

	const handleButtonClick = () => {
		if (chartRef.current === null) {
			return
		}

		const svgComponent = chartRef.current.container.children[0] as Node

		const svgURL = new XMLSerializer().serializeToString(svgComponent)
		const svgBlob = new Blob([svgURL], { type: 'image/svg+xml;charset=utf-8' })
		saveAs(svgBlob, 'grafico.svg')
	}

	useEffect(() => {
		setGraphData(getDatabase())
		calculateIndicador()
	}, [graphData])

	const calculateIndicador = () => {
		const database = getDatabase()
		setGraphData(database['quantidade_mensal'])
		let months = []
		let values: any[] = []
		for (const [key, value] of Object.entries(graphData)) {
			for (const [internalKey, internalValue] of Object.entries(value)) {
				months.push(internalKey)
				values.push(internalValue)
			}
		}
		let tempFinalData: { month: string; value: any }[] = []

		months.forEach((month, index) => {
			tempFinalData.push({ month: month, value: values[index] })
		})

		setFinalData(tempFinalData)
	}

	return (
		<Box display='flex' alignItems={'center'} flexDirection='column'>
			<Typography margin={8} alignSelf='start' fontSize='32px'>
				Indicadores &gt; {IndicadoresTcuList['acoes_institucionalizadas'].title}
			</Typography>
			<Box
				alignSelf={'center'}
				bgcolor='white'
				minHeight='15rem'
				minWidth='60rem'
				borderRadius='48px'
				padding={4}
			>
				{/* Gráfico */}
				<ResponsiveContainer width={'100%'} height={400}>
					<LineChart
						data={finalData}
						ref={chartRef}
						margin={{
							top: -10,
							right: -10,
							left: -20,
							bottom: -20,
						}}
					>
						<CartesianGrid strokeDasharray='10 10' />
						<XAxis dataKey='month' />
						<YAxis dataKey='value' />
						<Tooltip />
						<Legend />
						<Line type='monotone' dataKey='value' stroke='#8884d8' />
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
				<Link href='/indicadores/tcu'>
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

export default AcoesInstitucionalizadas
