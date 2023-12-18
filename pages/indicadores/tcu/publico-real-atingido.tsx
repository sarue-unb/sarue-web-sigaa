import { Box, Button, Typography, Popover } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Label,
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
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handlePopoverClose = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)

	const handleButtonClick = () => {
		if (chartRef.current === null) {
			return
		}

		const svgComponent = chartRef.current.container.children[0]

		const svgURL = new XMLSerializer().serializeToString(svgComponent)
		const legendSVG = `
		<g transform="translate(420,380)"> <!-- Ajuste as coordenadas X e Y conforme necessário -->
			<rect x="0" y="10" width="20" height="10" fill="#2D3192" />
			<text x="30" y="18" fill="#000000">Pessoas atingidas</text>
		</g>
`
		const finalSVG = svgURL.replace('</svg>', `${legendSVG}</svg>`)

		const svgBlob = new Blob([finalSVG], {
			type: 'image/svg+xml;charset=utf-8',
		})
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
		return { graphData: tempDataForGraph, tableData: tempDataForTable }
	}

	useEffect(() => {
		const result = calculateIndicador(getDatabase())
		setGraphData(result.graphData)
		setTableData(result.tableData)
	}, [])

	const formatDataForClipboard = () => {
		let formattedData = 'Ano/Mes\t1\t2\t3\t4\t5\t6\t7\t8\t9\t10\t11\t12\tTotal'

		tableData.forEach(row => {
			let rowData = Object.values(row).join('\t')
			formattedData += `${rowData}\n`
		})
		navigator.clipboard.writeText(formattedData)
	}

	return (
		<Box
			display='flex'
			alignItems={'center'}
			flexDirection='column'
			minHeight='100vh'
			overflow='auto'
			padding={2}
		>
			<Typography margin={8} alignSelf='start' fontSize='32px'>
				Indicadores &gt; {IndicadoresTcuList['publico_real_atingido'].title}
			</Typography>
			<Box
				alignSelf={'center'}
				bgcolor='white'
				minHeight='30rem'
				minWidth='60rem'
				borderRadius='48px'
				padding={4}
				display='flex'
			>
				{/* Gráfico */}
				<ResponsiveContainer width={'100%'} height={400}>
					<LineChart data={graphData} ref={chartRef} margin={{}}>
						<XAxis
							dataKey='month'
							padding={{ left: 30, right: 10 }}
							tickMargin={15}
						/>
						<YAxis
							dataKey='pessoas_atingidas'
							padding={{ top: 30 }}
							tickSize={0.1}
						/>
						<Tooltip />
						<Legend />
						<Line
							type='monotone'
							dataKey='pessoas_atingidas'
							stroke='#2D3192'
						/>
					</LineChart>
				</ResponsiveContainer>
				<img
					height='34px'
					width='34px'
					src='https://sigaa.unb.br/sigaa/img/ajuda.gif'
					aria-owns={open ? 'mouse-over-popover' : undefined}
					aria-haspopup='true'
					onMouseEnter={handlePopoverOpen}
					onMouseLeave={handlePopoverClose}
				/>
				<Popover
					id='mouse-over-popover'
					sx={{
						pointerEvents: 'none',
					}}
					open={open}
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					onClose={handlePopoverClose}
					disableRestoreFocus
				>
					<Typography
						bgcolor='black'
						sx={{
							p: 1,
							align: 'justify',
							minHeight: 100,
							minWidth: 380,
							maxWidth: 100,
						}}
					>
						Esse indicador é calculado a partir da quantidade mensal do público
						real atendido por projeto de extensão.
					</Typography>
				</Popover>
			</Box>
			<Box marginTop='4rem' bgcolor='#1976d2' mx='200px' alignSelf='center'>
				<Box
					display='flex'
					paddingLeft={8}
					paddingRight={5}
					my='16px'
					alignItems='start'
					justifyContent='space-between'
				>
					<Typography fontSize={'1.5rem'}>
						Tabela com o público real atingido
					</Typography>

					<CopyToClipboard
						text={formatDataForClipboard}
						options={{ format: 'text/plain' }}
					>
						<Button
							variant='contained'
							color='primary'
							size='large'
							style={{
								borderRadius: '28px',
								minWidth: '160px',
								backgroundColor: '#038C44',
							}}
						>
							Copiar dados
						</Button>
					</CopyToClipboard>
				</Box>

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
