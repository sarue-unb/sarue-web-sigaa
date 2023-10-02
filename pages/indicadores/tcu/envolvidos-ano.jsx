import { Box, Button, Typography } from '@mui/material'
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
import { TableEnvolvidos } from '../../../components/Indicadores/Tables/TableEnvolvidos/TableEnvolvidos'

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

	const calculateIndicador = data => {
		const rawData = data['quantidade_envolvidos_anual']
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
				Indicadores &gt; {IndicadoresTcuList['envolvidos_por_ano'].title}
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
					<BarChart data={graphData} ref={chartRef}>
						<XAxis dataKey='year' padding={{ left: 30, right: 10 }} />
						<YAxis label='Pessoas' padding={{ top: 30 }} />
						<Tooltip />
						<Legend />
						<Bar dataKey='Discente' fill='#8884d8' />
						<Bar dataKey='Docente' fill='#82ca9d' />
						<Bar dataKey='Externo' fill='#37392E' />
						<Bar dataKey='Servidor' fill='#DDCECD' />
					</BarChart>
				</ResponsiveContainer>
			</Box>
			<Box marginTop='4rem' bgcolor='black'>
				<Typography fontSize={'1.5rem'}>
					Tabela com a quantidade de cada perfil participante de todas as
					atividades de extensão por ano
				</Typography>
				<TableEnvolvidos tableData={tableData} />
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
