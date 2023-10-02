import {
	Box,
	Button,
	TableCell,
	Typography,
	Paper,
	Table,
	TableRow,
	TableContainer,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts'
import Link from 'next/link'
import { saveAs } from 'file-saver'
import { IndicadoresTcuList } from '../../../components/Indicadores/IndicadoresTcuList'
import { getDatabase } from '@/components/utils/utils'
import { TableAcoesOds } from '../../../components/Indicadores/Tables/TableAcoesOds/TableAcoesOds'
import { odsList } from '@/components/Indicadores/odsList'

function transformDataTochart(inputData) {
	const transformedData = Object.keys(inputData).map(year => ({
		year: parseInt(year, 10),
		...inputData[year],
	}))

	return transformedData
}

export const AcoesAno = () => {
	const chartRef = useRef(null)
	const [graphData, setGraphData] = useState([])
	const [tableData, setTableData] = useState([])

	const handleButtonClick = () => {
		if (chartRef.current === null) {
			return
		}

		const svgComponent = chartRef.current.container.children[0]

		const svgURL = new XMLSerializer().serializeToString(svgComponent)
		const svgBlob = new Blob([svgURL], { type: 'image/svg+xml;charset=utf-8' })
		saveAs(svgBlob, 'grafico.svg')
	}
	const guideTable = () => {
		let finalResult = []
		for (var i = 1; i < 18; i++) {
			let result
			if (i === 17) {
				result = (
					<TableRow key={odsList[i]}>
						<TableCell>
							{i} {odsList[i]}
						</TableCell>
					</TableRow>
				)
			} else {
				result = (
					<TableRow key={odsList[i]}>
						<TableCell>
							{i} {odsList[i]}
						</TableCell>
						<TableCell>
							{i + 1} {odsList[i + 1]}
						</TableCell>
					</TableRow>
				)
			}
			finalResult.push(result)
			i++
		}
		return finalResult
	}

	const calculateIndicador = data => {
		const rawData = data['objetivos_contemplados_anual']
		const graphData = transformDataTochart(rawData)
		return { graphData: graphData }
	}

	useEffect(() => {
		const result = calculateIndicador(getDatabase())
		setGraphData(result.graphData)
		setTableData(result.graphData)
	}, [])

	return (
		<Box display='flex' alignItems={'center'} flexDirection='column'>
			<Typography margin={8} alignSelf='start' fontSize='32px'>
				Indicadores &gt; {IndicadoresTcuList['acoes_por_ods'].title}
			</Typography>
			<Box
				alignSelf={'center'}
				marginBottom='2rem'
				bgcolor='white'
				borderRadius='48px'
				padding={4}
			>
				<TableContainer component={Paper}>
					<Table aria-label='Tabela com os objetivos'>{guideTable()}</Table>
				</TableContainer>
			</Box>

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
					<BarChart data={graphData} ref={chartRef}>
						<XAxis dataKey='year' padding={{ left: 30, right: 10 }} />
						<YAxis label='Ações' padding={{ top: 30 }} />
						<Tooltip />
						<Legend />
						<Bar dataKey='1' fill='#8884d8' />
						<Bar dataKey='2' fill='#82ca9d' />
						<Bar dataKey='3' fill='#37392E' />
						<Bar dataKey='4' fill='#DDCECD' />
						<Bar dataKey='5' fill='#EC9A29' />
						<Bar dataKey='6' fill='#F0E68C' />
						<Bar dataKey='7' fill='#FF0000' />
						<Bar dataKey='8' fill='#00FF00' />
						<Bar dataKey='9' fill='#0000FF' />
						<Bar dataKey='10' fill='#FF00FF' />
						<Bar dataKey='11' fill='#00FFFF' />
						<Bar dataKey='12' fill='#FFA500' />
						<Bar dataKey='13' fill='#800080' />
						<Bar dataKey='14' fill='#008000' />
						<Bar dataKey='15' fill='#808000' />
						<Bar dataKey='16' fill='#008080' />
						<Bar dataKey='17' fill='#800000' />
					</BarChart>
				</ResponsiveContainer>
			</Box>
			<Box marginTop='4rem' bgcolor='black'>
				<Typography fontSize={'1.5rem'}>
					Tabela com a quantidade de ações que continham cada tipo de Ods por
					ano
				</Typography>
				<TableAcoesOds tableData={tableData} />
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

export default AcoesAno
