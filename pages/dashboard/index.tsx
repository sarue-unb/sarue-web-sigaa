import Box from '@mui/material/Box'
import { CircularProgress, Typography } from '@mui/material'
import { FileUploader } from '@/components/FileUploader/FileUploader'
export default function Dashboard() {

	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='start'
			justifyContent='start'
			height='100vh'
			maxWidth={'100%'}
			padding={'5rem'}
		>
			<Typography
				textAlign='start'
				fontSize='2em'
				marginBottom={'3rem'}
				maxWidth={800}
			>
				Sistema de Apuração dos Registros Universitários de Extensão
			</Typography>
			<FileUploader />
			
		</Box>
	)
}
