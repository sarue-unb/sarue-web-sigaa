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
import { IndicadoresTcuList } from '../../../components/Indicadores/IndicadoresTcuList'
import {
	getDatabase,
	monthsPortuguese,
	transformPortugueseMonthsToNumbers,
	transformObjectToTableRow,
	sanitizeUnavailableData,
} from '@/components/utils/utils'
import { TableIndicadores } from '../../../components/Indicadores/TableIndicadores/TableIndicadores'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const addsYearToMonthIfNeeded = (internalMonths, key) => {
	if (
		monthsPortuguese[internalMonths] == 1 ||
		monthsPortuguese[internalMonths] == 12
	) {
		return monthsPortuguese[internalMonths] + '/' + key.slice(-2)
	}
	return monthsPortuguese[internalMonths]
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

	const calculateIndicador = data => {
		const rawData = data['quantidade_mensal']
		const tempDataForGraph = []
		for (const [key, value] of Object.entries(rawData)) {
			for (const [internalMonths, internalValue] of Object.entries(value)) {
				tempDataForGraph.push({
					month: addsYearToMonthIfNeeded(internalMonths, key),
					acoes: internalValue,
				})
			}
		}

		const tempDataForTable = transformObjectToTableRow(
			sanitizeUnavailableData(transformPortugueseMonthsToNumbers(rawData)),
		)

		return { graphData: tempDataForGraph, tableData: tempDataForTable }
	}

	useEffect(() => {
		const result = calculateIndicador(getDatabase())
		setGraphData(result.graphData)
		setTableData(result.tableData)
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
				<ResponsiveContainer width={'100%'} height={400}>
					<LineChart data={graphData} ref={chartRef} margin={{}}>
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
			<Box marginTop='4rem' bgcolor='black'>
				<Typography fontSize={'1.5rem'}>
					Tabela com as ações institucionalizadas por ano
				</Typography>
				<TableIndicadores tableData={tableData} />
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
