import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export const TablePublicoEnvolvido = ({ tableData }) => {
	const rows = Object.entries(tableData).map(([key, value]) => {
		let sumByyear = 0
		value.map(acaoValue => {
			if (!isNaN(acaoValue['qtd_publico_real_atendido'])) {
				sumByyear += acaoValue['qtd_publico_real_atendido']
			}
		})
		return (
			<TableRow
				key={key}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell>{key}</TableCell>
				{value.map(acaoValue => (
					<TableCell>{acaoValue['qtd_publico_real_atendido']}</TableCell>
				))}
				<TableCell>{sumByyear}</TableCell>
			</TableRow>
		)
	})
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 300 }} aria-label='Tabela com os 17 ODS'>
				<TableHead>
					<TableRow>
						<TableCell align='left'>Ano/Mes</TableCell>
						<TableCell align='left'>1</TableCell>
						<TableCell align='left'>2</TableCell>
						<TableCell align='left'>3</TableCell>
						<TableCell align='left'>4</TableCell>
						<TableCell align='left'>5</TableCell>
						<TableCell align='left'>6</TableCell>
						<TableCell align='left'>7</TableCell>
						<TableCell align='left'>8</TableCell>
						<TableCell align='left'>9</TableCell>
						<TableCell align='left'>10</TableCell>
						<TableCell align='left'>11</TableCell>
						<TableCell align='left'>12</TableCell>
						<TableCell align='left'>Total por ano</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{rows}</TableBody>
			</Table>
		</TableContainer>
	)
}
