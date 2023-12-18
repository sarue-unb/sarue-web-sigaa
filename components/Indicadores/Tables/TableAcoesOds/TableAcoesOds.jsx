import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export const TableAcoesOds = ({ tableData }) => {
	const rows = tableData.map(item => {
		return (
			<TableRow key={item.year}>
				<TableCell>{item.year}</TableCell>
				<TableCell align='center'>{item['1']}</TableCell>
				<TableCell align='center'>{item['2']}</TableCell>
				<TableCell align='center'>{item['3']}</TableCell>
				<TableCell align='center'>{item['4']}</TableCell>
				<TableCell align='center'>{item['5']}</TableCell>
				<TableCell align='center'>{item['6']}</TableCell>
				<TableCell align='center'>{item['7']}</TableCell>
				<TableCell align='center'>{item['8']}</TableCell>
				<TableCell align='center'>{item['9']}</TableCell>
				<TableCell align='center'>{item['10']}</TableCell>
				<TableCell align='center'>{item['11']}</TableCell>
				<TableCell align='center'>{item['12']}</TableCell>
				<TableCell align='center'>{item['13']}</TableCell>
				<TableCell align='center'>{item['14']}</TableCell>
				<TableCell align='center'>{item['15']}</TableCell>
				<TableCell align='center'>{item['16']}</TableCell>
				<TableCell align='center'>{item['17']}</TableCell>
			</TableRow>
		)
	})

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 300 }} aria-label='Ods Table'>
				<TableHead>
					<TableRow>
						<TableCell align='left'>Ano/ODS</TableCell>
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
						<TableCell align='center'>13</TableCell>
						<TableCell align='center'>14</TableCell>
						<TableCell align='center'>15</TableCell>
						<TableCell align='center'>16</TableCell>
						<TableCell align='center'>17</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{rows}</TableBody>
			</Table>
		</TableContainer>
	)
}
