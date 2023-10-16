import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts'
import Link from 'next/link'
import { saveAs } from 'file-saver'
import { IndicadoresAcademicList } from '../../../components/Indicadores/IndicadoresAcademicList'
import {
	TableFinanciamentoExterno,
	TableData,
} from '../../../components/Indicadores/Tables/TableFinanciamentoExterno/TableFinanciamentoExt'
import { getDatabase } from '@/components/utils/utils'

type GraphData = {
	year: string
	indice: number
}[]

type Database = {
	info_anual: {
		[year: string]: {
			fonte_financiamento: {
				'AÇÃO AUTO-FINANCIADA': number
				'FINANCIAMENTO EXTERNO': number
			}
		}
	}
}

export const AcoesFinanciamentoExterno = () => {
	const chartRef = useRef<any>(null)
	const [graphData, setGraphData] = useState<GraphData>([])

	const handleButtonClick = () => {
		if (chartRef.current === null) {
			return
		}

		const svgComponent = chartRef.current.container.children[0]

		const svgURL = new XMLSerializer().serializeToString(svgComponent)
		const svgBlob = new Blob([svgURL], { type: 'image/svg+xml;charset=utf-8' })
		saveAs(svgBlob, 'grafico.svg')
	}

	const calculateIndicador = (data: Database) => {
		const rawData = Object.entries(data['info_anual'])
		const graphData = rawData.map(([year, yearlyData]) => {
			const indice =
				(yearlyData.fonte_financiamento['FINANCIAMENTO EXTERNO'] /
					yearlyData.fonte_financiamento['AÇÃO AUTO-FINANCIADA']) *
				100

			return { year, indice }
		})

		return graphData
	}

	useEffect(() => {
		const result = calculateIndicador(getDatabase())
		setGraphData(result)
	}, [])

	return (
		<Box display='flex' alignItems={'center'} flexDirection='column'>
			<Typography margin={8} alignSelf='start' fontSize='32px'>
				Indicadores &gt;{' '}
				{IndicadoresAcademicList['envolvidos_financiamento_externo'].title}
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
					<LineChart data={graphData} ref={chartRef}>
						<XAxis
							dataKey='year'
							label='Ano'
							padding={{ left: 10, right: 10 }}
							tickMargin={25}
						/>
						<YAxis dataKey='indice' padding={{ top: 30 }} />
						<Legend
							wrapperStyle={{
								paddingLeft: '60px',
								paddingTop: '20px',
							}}
						/>
						<Line type='monotone' dataKey='indice' stroke='#8884d8' />
					</LineChart>
				</ResponsiveContainer>
			</Box>
			<Box marginTop='4rem'>
				<Typography fontSize={'1.5rem'} bgcolor='black'>
					Percentual anual de ações com financiamento externo em relação às
					autofinanciadas
				</Typography>
				<TableFinanciamentoExterno tableData={graphData} />
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '42px',
				}}
			>
				<Link href='/indicadores/academicos'>
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

export default AcoesFinanciamentoExterno
