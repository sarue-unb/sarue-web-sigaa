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

type GraphData = {
	year: string
	indice: null | number
}[]

type Database = {
	info_anual: {
		[year: string]: {
			qtd_discentes_envolvidos: number
			situação: {
				CONCLUÍDA: number
				'NÃO APROVADA': number
				'PENDENTE DE RELATÓRIO': number
				'PROJETO CANCELADO': number
			}
		}
	}
}

export const ExtensionistasProjeto = () => {
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

		const svgComponent = chartRef.current.container.children[0]

		const svgURL = new XMLSerializer().serializeToString(svgComponent)
		const svgBlob = new Blob([svgURL], { type: 'image/svg+xml;charset=utf-8' })
		saveAs(svgBlob, 'grafico.svg')
	}

	const calculateIndicador = (data: Database) => {
		const rawData = Object.entries(data['info_anual'])
		const graphData = rawData.map(([year, data], index) => {
			const soma = Object.values(data['situação']).reduce((a, b) => a + b, 0)
			return {
				year,
				indice: (data['qtd_discentes_envolvidos'] / soma).toFixed(2),
			}
		})
		const tableData: TableData = graphData.map(({ year, indice }) => ({
			year,
			indice: indice === null ? 'n/d' : indice,
		}))

		return {
			graphData: graphData.filter(data => data.indice) as unknown as GraphData,
			tableData,
		}
	}

	useEffect(() => {
		const result = calculateIndicador(getDatabase())
		setGraphData(result.graphData)
		setTableData(result.tableData)
	}, [])

	return (
		<Box display='flex' alignItems={'center'} flexDirection='column'>
			<Typography margin={8} alignSelf='start' fontSize='32px'>
				Indicadores &gt;{' '}
				{IndicadoresAcademicList['extensionistas_por_projeto'].title}
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
							textAlign: 'justify',
							minHeight: 100,
							maxHeight: 380,
							minWidth: 380,
							maxWidth: 100,
						}}
					>
						Esse indicador é calculado a partir da divisão entre o Total de
						estudantes extensionistas pelo Número de projetos de extensão.
						<br />
						<br />
						Isto é, utiliza-se o dado anual da quantidade de discentes
						envolvidos nas ações que possuem como situação concluída.
						<br />
						<br />O indicador de número de estudantes extensionistas por projeto
						é importante para avaliar o envolvimento dos estudantes nas
						atividades de extensão.
					</Typography>
				</Popover>
			</Box>
			<Box bgcolor='#1976d2' marginTop='4rem'>
				<Typography paddingLeft={5} paddingRight={5} fontSize={'1.5rem'}>
					Tabela com o Índice referente ao número de extensionistas por projeto
				</Typography>
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

export default ExtensionistasProjeto
