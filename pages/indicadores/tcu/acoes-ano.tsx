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
import { TableAcoesAno } from '../../../components/Indicadores/Tables/TableAcoesAno/TableAcoesAno'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const addsYearToMonthIfNeeded = (internalMonths: string, key: string) => {
	if (
		monthsPortuguese[internalMonths] == 1 ||
		monthsPortuguese[internalMonths] == 12
	) {
		return monthsPortuguese[internalMonths] + '/' + key.slice(-2)
	}
	return monthsPortuguese[internalMonths]
}

type TableData = {
	[year: number]: (number | string)[]
}

type GraphData = {
	month: string
	acoes: number
}[]

export const AcoesAno = () => {
	const chartRef = useRef<any>(null)
	const [graphData, setGraphData] = useState<GraphData>([])
	const [tableData, setTableData] = useState<TableData>([])
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
		// @ts-ignore
		const svgComponent = chartRef.current.container.children[0]

		const svgURL = new XMLSerializer().serializeToString(svgComponent)
		const legendSVG = `
		<g transform="translate(420,380)"> <!-- Ajuste as coordenadas X e Y conforme necessário -->
			<rect x="0" y="10" width="20" height="10" fill="#2D3192" />
			<text x="30" y="18" fill="#000000">Ações</text>
		</g>
`
		const finalSVG = svgURL.replace('</svg>', `${legendSVG}</svg>`)

		const svgBlob = new Blob([finalSVG], {
			type: 'image/svg+xml;charset=utf-8',
		})
		saveAs(svgBlob, 'grafico.svg')
	}

	const calculateIndicador = (data: { [x: string]: any }) => {
		const rawData = data['quantidade_mensal'] as Record<
			string,
			Record<string, number>
		>
		const tempDataForGraph = [] as GraphData
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
		console.log({ tempDataForGraph, tempDataForTable })

		return { graphData: tempDataForGraph, tableData: tempDataForTable }
	}

	useEffect(() => {
		const result = calculateIndicador(getDatabase())
		setGraphData(result.graphData)
		setTableData(result.tableData)
	}, [])

	const textToCopy = Object.entries(tableData).reduce(
		(prev, [year, acoes], index) => {
			const total = acoes
				.filter((acao): acao is number => typeof acao === 'number')
				.reduce((prev, curr) => curr + prev, 0)

			return `${prev}${year}\t${acoes.join('\t')}\t${total}\n`
		},
		`Ano/Mês\t1\t2\t3\t4\t5\t6\t7\t8\t9\t10\t11\t12\tTotal por ano\n`,
	)

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
						<YAxis dataKey='acoes' label='Ações' padding={{ top: 30 }} />
						<Tooltip />
						<Legend />
						<Line type='monotone' dataKey='acoes' stroke='#2D3192' />
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
						Esse indicador é calculado a partir da quantidade mensal de ações
						por ano.
					</Typography>
				</Popover>
			</Box>
			<Box marginTop='4rem' bgcolor='#1976d2' mx='200px' alignSelf='normal'>
				<Box
					display='flex'
					paddingLeft={8}
					paddingRight={5}
					my='16px'
					alignItems='start'
					justifyContent='space-between'
				>
					<Typography fontSize={'1.5rem'}>
						Tabela com as ações institucionalizadas por ano e por mês
					</Typography>

					<CopyToClipboard text={textToCopy} options={{ format: 'text/plain' }}>
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

				<TableAcoesAno tableData={tableData} />
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
