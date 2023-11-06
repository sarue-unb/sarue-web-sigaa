import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TableVirtuoso, TableComponents } from 'react-virtuoso'

export type TableData = {
	unidade: string
	qtd: string | number
	posicao?: number
}[]

type TableUnidadeAcademicaProps = {
	tableData: TableData
}

export const TableUnidadeAcademica = ({
	tableData,
}: TableUnidadeAcademicaProps) => {
	const VirtuosoTableComponents: TableComponents<TableData[number]> = {
		Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
			<TableContainer component={Paper} {...props} ref={ref} />
		)),
		Table: props => (
			<Table
				{...props}
				sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
			/>
		),
		TableHead,
		TableRow: ({ ...props }) => (
			<TableRow
				{...props}
				sx={{
					'&:last-child td, &:last-child th': { border: 0 },
					background: 'white',
				}}
			/>
		),
		TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
			<TableBody {...props} ref={ref} />
		)),
	}

	function fixedHeaderContent() {
		return (
			<TableRow
				sx={{
					background: 'white',
				}}
			>
				<TableCell width='100px' align='left'>
					Posição
				</TableCell>
				<TableCell align='left'>Unidade Acadêmica</TableCell>
				<TableCell width='140px' align='left'>
					Qtd. de ações
				</TableCell>
			</TableRow>
		)
	}

	function rowContent(_index: number, row: TableData[number]) {
		return (
			<>
				<TableCell width='20px' align='left'>
					{row.posicao}
				</TableCell>
				<TableCell>{row.unidade}</TableCell>
				<TableCell align='center'>{row.qtd}</TableCell>
			</>
		)
	}

	return (
		<Paper style={{ height: 400, width: '100%' }}>
			<TableVirtuoso
				data={tableData}
				components={VirtuosoTableComponents}
				fixedHeaderContent={fixedHeaderContent}
				itemContent={rowContent}
			/>
		</Paper>
	)
}
