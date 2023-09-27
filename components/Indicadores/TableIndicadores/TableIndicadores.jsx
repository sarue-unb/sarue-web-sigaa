import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'


export const TableIndicadores = ({ tableData }) => {
	console.log(tableData)
	const rows = Object.entries(tableData).map(([key, value]) => (
		<TableRow
			key={key}
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell>{key}</TableCell>
			{value.map((acaoValue) => (
				<TableCell>{acaoValue}</TableCell>
			))}
		</TableRow>
	))
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell align='left'>Ano/Mes</TableCell>
						<TableCell align='right'>1</TableCell>
						<TableCell align='right'>2</TableCell>
						<TableCell align='right'>3</TableCell>
						<TableCell align='right'>4</TableCell>
						<TableCell align='right'>5</TableCell>
						<TableCell align='right'>6</TableCell>
						<TableCell align='right'>7</TableCell>
						<TableCell align='right'>8</TableCell>
						<TableCell align='right'>9</TableCell>
						<TableCell align='right'>10</TableCell>
						<TableCell align='right'>11</TableCell>
						<TableCell align='right'>12</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{rows}</TableBody>
			</Table>
		</TableContainer>
	)
}