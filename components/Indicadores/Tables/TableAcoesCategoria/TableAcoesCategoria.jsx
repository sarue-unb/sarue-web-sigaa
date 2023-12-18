import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export const TableAcoesCategoria = ({ tableData }) => {
	const rows = tableData.map(item => {
		return (
			<TableRow
				key={item.year}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell>{item.year}</TableCell>
				<TableCell align='center' >{item.PRODUTO}</TableCell>
				<TableCell align='center'>{item.EVENTO}</TableCell>
				<TableCell align='center'>{item.CURSO}</TableCell>
				<TableCell align='center'>{item.PROJETO}</TableCell>
				<TableCell align='center'>{item.PROGRAMA}</TableCell>
			</TableRow>
		)
	})

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 300 }} aria-label=' Tabela com cada categoria'>
				<TableHead>
					<TableRow>
						<TableCell align='left'>Ano/Tipo</TableCell>
						<TableCell align='center'>PRODUTO</TableCell>
						<TableCell align='center'>EVENTO</TableCell>
						<TableCell align='center'>CURSO</TableCell>
						<TableCell align='center'>PROJETO</TableCell>
						<TableCell align='center'>PROGRAMA</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{rows}</TableBody>
			</Table>
		</TableContainer>
	)
}
