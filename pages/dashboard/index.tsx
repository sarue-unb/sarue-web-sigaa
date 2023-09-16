import Box from '@mui/material/Box'
import { CircularProgress, Typography } from '@mui/material'
import { FileUploader } from '@/components/FileUploader/FileUploader'
export default function Dashboard() {
	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			height='100vh'
			maxWidth={'100%'}
		>
			<Typography
				marginBottom={10}
				textAlign='center'
				fontSize='2em'
				maxWidth={800}
			>
				Sistema de Apuração dos Registros Universitários de Extensão
			</Typography>

			<FileUploader />
		</Box>
	)
}
