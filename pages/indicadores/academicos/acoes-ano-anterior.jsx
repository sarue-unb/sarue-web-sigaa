import { Box, Button, Popover, Typography } from '@mui/material'
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
import { getDatabase } from '@/components/utils/utils'
import {
	TableAcoesAnoAnterior,
	TableData,
} from '../../../components/Indicadores/Tables/TableAcoesAno/TableAcoesAnoAnterior'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// type GraphData = {
// 	year: string
// 	indice: null | number
// }[]

// type Database = {
// 	status_acao_anual: {
// 		[year: string]: {
// 			CONCLUÍDA: number
// 			'NÃO APROVADA': number
// 			'PENDENTE DE RELATÓRIO': number
// 			'PROJETO CANCELADO': number
// 		}
// 	}
// }

export const AcoesAnoAnterior = () => {
	const chartRef = useRef < any > null
	const [graphData, setGraphData] = useState < GraphData > []
	const [tableData, setTableData] = useState < TableData > []
	const [anchorEl, setAnchorEl] = (React.useState < HTMLElement) | (null > null)

	const handlePopoverOpen = event => {
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
			<rect x="0" y="0" width="20" height="10" fill="#8884d8" />
			<text x="30" y="10" fill="#000000">Índice</text>
		</g>
`
		const finalSVG = svgURL.replace('</svg>', `${legendSVG}</svg>`)

		const svgBlob = new Blob([finalSVG], {
			type: 'image/svg+xml;charset=utf-8',
		})
		saveAs(svgBlob, 'grafico.svg')
	}

	const calculateIndicador = data => {
		const rawData = Object.entries(data['status_acao_anual'])
		const graphData = rawData.map(([year, data], index) => {
			if (index === 0) {
				return { year, indice: null }
			}
			const previousData = rawData[index - 1][1]

			return {
				year,
				indice: (data['CONCLUÍDA'] / previousData['CONCLUÍDA']).toFixed(2),
			}
		})
		const tableData = graphData.map(({ year, indice }) => ({
			year,
			indice: indice === null ? 'n/d' : indice,
		}))

		return {
			graphData: graphData.filter(data => data.indice),
			tableData,
		}
	}

	useEffect(() => {
		const result = calculateIndicador(getDatabase())
		setGraphData(result.graphData)
		setTableData(result.tableData)
	}, [])

	const textToCopy = tableData.reduce(
		(prev, curr) => `${prev}${curr.year}\t${curr.indice}\n`,
		`Ano\tÍndice\n`,
	)

	return (
		<Box display='flex' alignItems={'center'} flexDirection='column'>
			<Typography margin={8} alignSelf='start' fontSize='32px'>
				Indicadores &gt; {IndicadoresAcademicList['envolvidos_ano'].title}
			</Typography>
			<Box
				display='flex'
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
						<Tooltip />
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
						Esse indicador é calculado a partir da divisão entre o Número de
						ações institucionalizadas no ano atual pelo Número de ações
						institucionalizadas no ano anterior.
						<br />
						<br />
						Podem haver casos em que os índices possuem como resultado "n/d",
						tal problemática pode ser justificada pelo fato de que não há
						informações suficientes disponibilizadas no SIGAA.
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
					<Typography paddingLeft={5} paddingRight={5} fontSize={'1.5rem'}>
						Tabela com as ações institucionalizadas no SIGAA em relação ao ano
						anterior
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

				<TableAcoesAnoAnterior tableData={tableData} />
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

export default AcoesAnoAnterior
