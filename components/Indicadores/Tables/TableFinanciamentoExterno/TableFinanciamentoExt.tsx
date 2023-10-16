import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export type TableData = {
	year: string
	indice: string | number
}[]

type TableFinanciamentoExternoProps = {
	tableData: TableData
}

export const TableFinanciamentoExterno = ({
	tableData,
}: TableFinanciamentoExternoProps) => {
	console.log({ tableData })
	const rows = tableData.map(({ year, indice }) => {
		return (
			<TableRow
				key={year}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell>{year}</TableCell>
				<TableCell align='left'>{indice}</TableCell>
			</TableRow>
		)
	})
	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 300 }}
				aria-label='Tabela com o percentual anual de ações de extensão com financiamento externo em relação às ações
                autofinanciadas'
			>
				<TableHead>
					<TableRow>
						<TableCell align='left'>Ano</TableCell>
						<TableCell align='left'>Índice</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{rows}</TableBody>
			</Table>
		</TableContainer>
	)
}
