import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export const TableAcoesOds = ({ tableData }) => {
	console.log(tableData)
	const rows = tableData.map(item => {
		return (
			<TableRow key={item.year}>
				<TableCell>{item.year}</TableCell>
				<TableCell>{item['1']}</TableCell>
				<TableCell>{item['2']}</TableCell>
				<TableCell>{item['3']}</TableCell>
				<TableCell>{item['4']}</TableCell>
				<TableCell>{item['5']}</TableCell>
				<TableCell>{item['6']}</TableCell>
				<TableCell>{item['7']}</TableCell>
				<TableCell>{item['8']}</TableCell>
				<TableCell>{item['9']}</TableCell>
				<TableCell>{item['10']}</TableCell>
				<TableCell>{item['11']}</TableCell>
				<TableCell>{item['12']}</TableCell>
				<TableCell>{item['13']}</TableCell>
				<TableCell>{item['14']}</TableCell>
				<TableCell>{item['15']}</TableCell>
				<TableCell>{item['16']}</TableCell>
				<TableCell>{item['17']}</TableCell>
			</TableRow>
		)
	})

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 300 }} aria-label='Ods Table'>
				<TableHead>
					<TableRow>
						<TableCell align='right'>Ano</TableCell>
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
						<TableCell align='left'>13</TableCell>
						<TableCell align='left'>14</TableCell>
						<TableCell align='left'>15</TableCell>
						<TableCell align='left'>16</TableCell>
						<TableCell align='left'>17</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{rows}</TableBody>
			</Table>
		</TableContainer>
	)
}
