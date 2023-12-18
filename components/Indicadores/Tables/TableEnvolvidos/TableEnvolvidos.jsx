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
				<TableCell align='center'>{item.Discente}</TableCell>
				<TableCell align='center'>{item.Docente}</TableCell>
				<TableCell align='center'>{item.Externo}</TableCell>
				<TableCell align='center'>{item.Servidor}</TableCell>
			</TableRow>
		)
	})

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 300 }} aria-label='Tabela por ods'>
				<TableHead>
					<TableRow>
						<TableCell> Ano/Tipo</TableCell>
						<TableCell align='center'>Discente</TableCell>
						<TableCell align='center'>Docente</TableCell>
						<TableCell align='center'>Externo</TableCell>
						<TableCell align='center'>Servidor</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{rows}</TableBody>
			</Table>
		</TableContainer>
	)
}
