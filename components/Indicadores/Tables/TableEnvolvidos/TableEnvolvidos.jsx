import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export const TableEnvolvidos = ({ tableData }) => {
	const rows = tableData.map(item => {
		return (
			<TableRow
				key={item.year}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell>{item.year}</TableCell>
				<TableCell>{item.Discente}</TableCell>
				<TableCell>{item.Docente}</TableCell>
				<TableCell>{item.Externo}</TableCell>
				<TableCell>{item.Servidor}</TableCell>
			</TableRow>
		)
	})

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 300 }} aria-label='Tabela por ods'>
				<TableHead>
					<TableRow>
						<TableCell> Ano/Tipo</TableCell>
						<TableCell>Discente</TableCell>
						<TableCell>Docente</TableCell>
						<TableCell>Externo</TableCell>
						<TableCell>Servidor</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{rows}</TableBody>
			</Table>
		</TableContainer>
	)
}
