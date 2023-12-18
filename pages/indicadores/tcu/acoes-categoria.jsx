import { Box, Button, Typography, Popover } from '@mui/material'
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
import { getDatabase, monthsPortuguese } from '@/components/utils/utils'
import { TableAcoesCategoria } from '../../../components/Indicadores/Tables/TableAcoesCategoria/TableAcoesCategoria'
import { CopyToClipboard } from 'react-copy-to-clipboard'

function transformDataTochart(inputData: any) {
	const transformedData = Object.keys(inputData).map(year => ({
		year: parseInt(year, 10),
		...inputData[year],
	}))

	return transformedData
}
export const AcoesAno = () => {
	const chartRef = useRef < any > null
	const [graphData, setGraphData] = useState([])
	const [tableData, setTableData] = useState([])
	const [anchorEl, setAnchorEl] = (React.useState < HTMLElement) | (null > null)
	const [copied, setCopied] = useState(false)

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
			<rect x="-204" y="10" width="20" height="10" fill="#2D3192" />
			<text x="-180" y="20" fill="#2D3192">PRODUTO</text>
			\t
			<rect x="-50" y="10" width="20" height="10" fill="#038C44" />
			<text x="-26" y="20" fill="#038C44">EVENTO</text>
			\t
			<rect x="80" y="10" width="20" height="10" fill="#7EA6DA" />
			<text x="105" y="20" fill="#7EA6DA">CURSO</text>
			\t
			<rect x="208" y="10" width="20" height="10" fill="#800000" />
			<text x="230" y="20" fill="#800000">PROJETO</text>
			\t
			<rect x="326" y="10" width="20" height="10" fill="#010000" />
			<text x="350" y="20" fill="#010000">PROGRAMA</text>
		</g>
`
		const finalSVG = svgURL.replace('</svg>', `${legendSVG}</svg>`)
		const svgBlob = new Blob([finalSVG], {
			type: 'image/svg+xml;charset=utf-8',
		})
		saveAs(svgBlob, 'grafico.svg')
	}

	const calculateIndicador = data => {
		const rawData = data['quantidade_anual_tipo']
		const graphData = transformDataTochart(rawData)

		return { graphData: graphData }
	}

	useEffect(() => {
		const result = calculateIndicador(getDatabase())
		setGraphData(result.graphData)
		setTableData(result.graphData)
	}, [])

	function formatDataForTable(inputData) {
		const actionTypes = ['PRODUTO', 'EVENTO', 'CURSO', 'PROJETO', 'PROGRAMA']
		const years = Object.keys(inputData)

		// Ordena os anos em ordem crescente
		years.sort()

		// Definir os anos em formato 'YYYY'
		const formattedYears = years.map(year => `'202${year}`)

		let formattedData = 'Ano/Tipo\t' + actionTypes.join('\t') + '\n'

		formattedYears.forEach((year, index) => {
			formattedData += year

			actionTypes.forEach(type => {
				if (inputData[years[index]][type] !== undefined) {
					formattedData += '\t' + inputData[years[index]][type]
				} else {
					formattedData += '\t'
				}
			})

			formattedData += '\n'
		})

		return formattedData
	}

	return (
		<Box display='flex' alignItems={'center'} flexDirection='column'>
			<Typography margin={8} alignSelf='start' fontSize='32px'>
				Indicadores &gt;{' '}
				{IndicadoresTcuList['acoes_cadastradas_por_categoria'].title}
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
					<BarChart data={graphData} ref={chartRef}>
						<XAxis dataKey='year' padding={{ left: 30, right: 10 }} />
						<YAxis label='Ações' padding={{ top: 30 }} />
						<Tooltip />
						<Legend />
						<Bar dataKey='PRODUTO' fill='#2D3192' />
						<Bar dataKey='EVENTO' fill='#038C44' />
						<Bar dataKey='CURSO' fill='#7EA6DA' />
						<Bar dataKey='PROJETO' fill='#800000' />
						<Bar dataKey='PROGRAMA' fill='#010000' />
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
					<Typography fontSize={'1.5rem'} alignSelf='center'>
						Tabela com as ações institucionalizadas por ano e categoria
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

				<TableAcoesCategoria tableData={tableData} />
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
