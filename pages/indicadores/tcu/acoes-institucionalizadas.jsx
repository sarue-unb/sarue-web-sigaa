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
import { getDatabase, monthsPortuguese } from '@/components/utils/utils'

export const AcoesInstitucionalizadas = () => {
	const chartRef = useRef(null)
	const [finalData, setFinalData] = useState([])

	const handleButtonClick = () => {
		if (chartRef.current === null) {
			return
		}

		const svgComponent = chartRef.current.container.children[0]

		const svgURL = new XMLSerializer().serializeToString(svgComponent)
		const svgBlob = new Blob([svgURL], { type: 'image/svg+xml;charset=utf-8' })
		saveAs(svgBlob, 'grafico.svg')
	}

	const calculateIndicador = data => {
		const tempGraphData = data['quantidade_mensal']
		const tempFinalData = []

		for (const [key, value] of Object.entries(tempGraphData)) {
			for (const [internalMonths, internalValue] of Object.entries(value)) {
				if (
					monthsPortuguese[internalMonths] == 1 ||
					monthsPortuguese[internalMonths] == 12
				) {
					tempFinalData.push({
						month: monthsPortuguese[internalMonths] + '/' + key.slice(-2),
						acoes: internalValue,
					})
				} else {
					tempFinalData.push({
						month: monthsPortuguese[internalMonths],
						acoes: internalValue,
					})
				}
			}
		}

		return { finalData: tempFinalData }
	}

	useEffect(() => {
		const result = calculateIndicador(getDatabase())
		setFinalData(result.finalData)
	}, [])

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
				<ResponsiveContainer width={'100%'} height={600}>
					<LineChart data={finalData} ref={chartRef} margin={{}}>
						<XAxis
							dataKey='month'
							padding={{ left: 30, right: 10 }}
							tickMargin={15}
						/>
						<YAxis dataKey='acoes' label='Ações' padding={{ top: 30 }} />
						<Tooltip />
						<Legend />
						<Line type='monotone' dataKey='acoes' stroke='#8884d8' />
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
