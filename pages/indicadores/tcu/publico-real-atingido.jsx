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
import { TablePublicoEnvolvido } from '../../../components/Indicadores/Tables/TablePublicoEnvolvido/TablePublicoEnvolvido'

const addsYearToMonthIfNeeded = (internalMonths, key) => {
	if (
		monthsPortuguese[internalMonths] == 1 ||
		monthsPortuguese[internalMonths] == 12
	) {
		return monthsPortuguese[internalMonths] + '/' + key.slice(-2)
	}
	return monthsPortuguese[internalMonths]
}

export const PublicoRealAtingido = () => {
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
		const rawData = data['info_mensal']
		const tempDataForGraph = []
		for (const [key, value] of Object.entries(rawData)) {
			for (const [internalMonths, internalValue] of Object.entries(value)) {
				tempDataForGraph.push({
					month: addsYearToMonthIfNeeded(internalMonths, key),
					pessoas_atingidas: internalValue['qtd_publico_real_atendido'],
				})
			}
		}

		const tempDataForTable = transformObjectToTableRow(
			sanitizeUnavailableData(transformPortugueseMonthsToNumbers(rawData)),
		)
		console.log(tempDataForGraph)
		return { graphData: tempDataForGraph, tableData: tempDataForTable }
	}

	useEffect(() => {
		const result = calculateIndicador(getDatabase())
		setGraphData(result.graphData)
		setTableData(result.tableData)
	}, [])

	return (
		<Box
			display='flex'
			height='100vh'
			alignItems={'center'}
			flexDirection='column'
		>
			<Typography margin={8} alignSelf='start' fontSize='32px'>
				Indicadores &gt; {IndicadoresTcuList['publico_real_atingido'].title}
			</Typography>

			<Box marginTop='4rem' bgcolor='black'>
				<Typography fontSize={'1.5rem'}>
					Tabela com o publico real atingido
				</Typography>
				<TablePublicoEnvolvido tableData={tableData} />
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

export default PublicoRealAtingido
