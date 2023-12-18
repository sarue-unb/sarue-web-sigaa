// @ts-nocheck
import {
	Box,
	Button,
	TableCell,
	Typography,
	Paper,
	Table,
	TableRow,
	TableContainer,
	Popover,
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
import { CopyToClipboard } from 'react-copy-to-clipboard'

function transformDataTochart(inputData: any) {
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
			<rect x="-350" y="10" width="20" height="10" fill="#7F823D" />
			<text x="-330" y="20" fill="#7F823D">1</text>
			\t
			<rect x="-310" y="10" width="20" height="10" fill="#2D3192" />
			<text x="-288" y="20" fill="#2D3192">2</text>
			\t
			<rect x="-270" y="10" width="20" height="10" fill="#FFCB09" />
			<text x="-250" y="20" fill="#FFCB09">3</text>
			\t
			<rect x="-230" y="10" width="20" height="10" fill="#7EA6DA" />
			<text x="-210" y="20" fill="#7EA6DA">4</text>
			\t
			<rect x="-190" y="10" width="20" height="10" fill="#646368" />
			<text x="-170" y="20" fill="#646368">5</text>
			\t
			<rect x="-150" y="10" width="20" height="10" fill="#75B991" />
			<text x="-130" y="20" fill="#75B991">6</text>
			\t
			<rect x="-110" y="10" width="20" height="10" fill="#204C6B" />
			<text x="-90" y="20" fill="#204C6B">7</text>
			\t
			<rect x="-70" y="10" width="20" height="10" fill="#00AFF0" />
			<text x="-50" y="20" fill="#00AFF0">8</text>
			\t
			<rect x="-30" y="10" width="20" height="10" fill="#038C44" />
			<text x="-10" y="20" fill="#038C44">9</text>
			\t
			<rect x="15" y="10" width="20" height="10" fill="#948CC1" />
			<text x="35" y="20" fill="#948CC1">10</text>
			\t
			<rect x="65" y="10" width="20" height="10" fill="#8DC73F" />
			<text x="85" y="20" fill="#8DC73F">11</text>
			\t
			<rect x="105" y="10" width="20" height="10" fill="#0172BE" />
			<text x="125" y="20" fill="#0172BE">12</text>
			\t
			<rect x="145" y="10" width="20" height="10" fill="#01417E" />
			<text x="165" y="20" fill="#01417E">13</text>
			\t
			<rect x="185" y="10" width="20" height="10" fill="#6F87B3" />
			<text x="205" y="20" fill="#6F87B3">14</text>
			\t
			<rect x="225" y="10" width="20" height="10" fill="#010000" />
			<text x="245" y="20" fill="#010000">15</text>
			\t
			<rect x="265" y="10" width="20" height="10" fill="#008080" />
			<text x="285" y="20" fill="#008080">16</text>
			\t
			<rect x="320" y="10" width="20" height="10" fill="#800000" />
			<text x="340" y="20" fill="#800000">17</text>
		</g>
`
		const finalSVG = svgURL.replace('</svg>', `${legendSVG}</svg>`)
		const svgBlob = new Blob([finalSVG], {
			type: 'image/svg+xml;charset=utf-8',
		})
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

	function formatDataForTable(inputData) {
		const years = Object.keys(inputData)

		// Ordena os anos em ordem crescente
		years.sort()

		const formattedYears = years.map(year => `'202${year}`)

		let formattedData =
			'Ano/Tipo\t' +
			Array.from({ length: 17 }, (_, i) => i + 1).join('\t') +
			'\n'

		formattedYears.forEach((year, index) => {
			formattedData += year

			for (let i = 1; i <= 17; i++) {
				formattedData += '\t' + (inputData[years[index]][i.toString()] || '')
			}

			formattedData += '\n'
		})

		return formattedData
	}

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
				display='flex'
			>
				{/* Gráfico */}
				<ResponsiveContainer width={'100%'} height={400}>
					<BarChart data={graphData} ref={chartRef}>
						<XAxis dataKey='year' padding={{ left: 30, right: 10 }} />
						<YAxis label='Ações' padding={{ top: 30 }} />
						<Tooltip />
						<Legend />
						<Bar dataKey='1' fill='#7F823D' />
						<Bar dataKey='2' fill='#2D3192' />
						<Bar dataKey='3' fill='#FFCB09' />
						<Bar dataKey='4' fill='#7EA6DA' />
						<Bar dataKey='5' fill='#646368' />
						<Bar dataKey='6' fill='#75B991' />
						<Bar dataKey='7' fill='#204C6B' />
						<Bar dataKey='8' fill='#00AFF0' />
						<Bar dataKey='9' fill='#038C44' />
						<Bar dataKey='10' fill='#948CC1' />
						<Bar dataKey='11' fill='#8DC73F' />
						<Bar dataKey='12' fill='#0172BE' />
						<Bar dataKey='13' fill='#01417E' />
						<Bar dataKey='14' fill='#6F87B3' />
						<Bar dataKey='15' fill='#010000' />
						<Bar dataKey='16' fill='#008080' />
						<Bar dataKey='17' fill='#800000' />
					</BarChart>
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
						O cálculo desse indicador é feito a partir da quantidade de ações
						que continham cada tipo de ODS por ano.
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
						Tabela com a quantidade de ações que continham cada tipo de ODS por
						ano
					</Typography>

					<CopyToClipboard
						text={formatDataForTable(tableData)}
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
