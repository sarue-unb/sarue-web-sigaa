import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export const TableAcoesAno = ({ tableData }) => {
	const rows = Object.entries(tableData).map(([key, value]) => {
		let sumByyear = 0
		value.map(acaoValue => {
			if (!isNaN(acaoValue)) {
				sumByyear += acaoValue
			}
		})
		return (
			<TableRow
				key={key}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell>{key}</TableCell>
				{value.map(acaoValue => (
					<TableCell align='center'>{acaoValue}</TableCell>
				))}
				<TableCell align='center'>{sumByyear}</TableCell>
			</TableRow>
		)
	})
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 300 }} aria-label='Tabela Ações institucionalizadas'>
				<TableHead>
					<TableRow>
						<TableCell align='left'>Ano/Mes</TableCell>
						<TableCell align='center'>1</TableCell>
						<TableCell align='center'>2</TableCell>
						<TableCell align='center'>3</TableCell>
						<TableCell align='center'>4</TableCell>
						<TableCell align='center'>5</TableCell>
						<TableCell align='center'>6</TableCell>
						<TableCell align='center'>7</TableCell>
						<TableCell align='center'>8</TableCell>
						<TableCell align='center'>9</TableCell>
						<TableCell align='center'>10</TableCell>
						<TableCell align='center'>11</TableCell>
						<TableCell align='center'>12</TableCell>
						<TableCell align='center'>Total por ano</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{rows}</TableBody>
			</Table>
		</TableContainer>
	)
}
