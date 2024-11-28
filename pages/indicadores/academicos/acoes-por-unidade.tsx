import { Box, Button, Popover, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import {
	LineChart,
	PieChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Pie,
	Cell,
} from 'recharts'
import Link from 'next/link'
import { saveAs } from 'file-saver'
import { IndicadoresAcademicList } from '../../../components/Indicadores/IndicadoresAcademicList'
import { getDatabase } from '@/components/utils/utils'
import {
	TableUnidadeAcademica,
	TableData,
} from '@/components/Indicadores/Tables/TableUnidadeAcademica/TableUnidadeAcademica'
import { CopyToClipboard } from 'react-copy-to-clipboard'

type GraphData = {
	name: string
	qtd: number
}[]

type Database = {
	info: {
		proponente: {
			[name: string]: number
		}
	}
}

export const AcoesUnidade = () => {
	const chartRef = useRef<any>(null)
	const [tableData, setTableData] = useState<TableData>([])
	const [pieChartData, setPieChartData] = useState<TableData>([])
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

		const halfDataLength = Math.ceil(pieChartData.length / 2)
		const legendSVG = `
			<g transform="translate(20,440)"> <!-- Ajuste as coordenadas X e Y conforme necessário para a legenda -->
				${pieChartData
					.map((entry, index) => {
						const column = index >= halfDataLength ? 360 : 0
						const columnIndex =
							index >= halfDataLength ? index - halfDataLength : index
						return `<g transform="translate(${column},${
							columnIndex * 20
						})"> <!-- Ajuste o espaçamento vertical conforme necessário -->
					<rect x="0" y="0" width="10" height="10" fill="${
						COLORS[index % COLORS.length]
					}" />
					<text x="15" y="10" font-size="12" fill="#000000">${entry.unidade}</text>
					</g>`
					})
					.join('')}
			</g>
		`

		const finalSVG = svgURL.replace('</svg>', `${legendSVG}</svg>`)

		const svgBlob = new Blob([finalSVG], {
			type: 'image/svg+xml;charset=utf-8',
		})
		saveAs(svgBlob, 'grafico.svg')
	}

	const calculateIndicador = (data: Database) => {
		const rawData = Object.entries({
			...data.info.proponente,
		})
		const tableData = rawData
			.filter(([unidade]) => unidade! !== 'Nenhuma')
			.map(([unidade, qtd], index) => {
				return {
					unidade,
					qtd,
				}
			})

		const pieData = tableData.sort((a, b) => b.qtd - a.qtd).slice(0, 15)
		const others = {
			unidade: 'OUTROS',
			qtd: tableData.slice(15).reduce((prev, curr) => prev + curr.qtd, 0),
		}

		return {
			tableData: tableData
				.sort((a, b) => a.unidade.localeCompare(b.unidade))
				.map((data, index) => ({
					...data,
					posicao: index + 1,
				})),
			pieData: [...pieData, others],
		}
	}

	useEffect(() => {
		const result = calculateIndicador(getDatabase())

		setTableData(result.tableData)
		setPieChartData(result.pieData)
	}, [])

	const COLORS = [
		'#7F823D',
		'#2D3192',
		'#FFCB09',
		'#7EA6DA',
		'#646368',
		'#75B991',
		'#204C6B',
		'#00AFF0',
		'#038C44',
		'#948CC1',
		'#8DC73F',
		'#0172BE',
		'#01417E',
		'#6F87B3',
		'#010000',
		'#008080',
		'#800000',
	]

	const textToCopy = tableData.reduce(
		(prev, curr) => `${prev}${curr.posicao}\t${curr.unidade}\t${curr.qtd}\n`,
		`Posição\tUnidade Acadêmica\tQtd. de ações\n`,
	)

	return (
		<Box display='flex' alignItems='center' flexDirection='column'>
			<Typography margin={8} alignSelf='start' fontSize='32px'>
				Indicadores &gt; {IndicadoresAcademicList['acoes_por_unidade'].title}
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
				<ResponsiveContainer width={'100%'} height={600}>
					<PieChart width={730} height={250} ref={chartRef}>
						<Pie
							data={pieChartData}
							dataKey='qtd'
							nameKey='unidade'
							outerRadius={200}
							fill='#8884d8'
						>
							{pieChartData.map((entry, index) => (
								<Cell fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
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
						O cálculo desse indicador é feito a partir do somatório de todos os
						anos da quantidade de ações por unidade proponente.
						<br />
						<br />
						Além disso, para uma melhor visualização é apresentado graficamente
						apenas as primeiras 15 Unidades Acadêmicas com mais ações de
						extensão.
						<br />
						<br />
						Dessa forma, em "Outros", é apresentado o somatório dos 15 em
						diante.
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
					<Typography textAlign='center' flex={1} fontSize={'1.5rem'}>
						Tabela ordenada da quantidade de ações de extensão por Unidade
						Acadêmica
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

				<TableUnidadeAcademica tableData={tableData} />
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

export default AcoesUnidade

