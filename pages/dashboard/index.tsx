import Box from '@mui/material/Box'
import { CircularProgress, Typography } from '@mui/material'
import { FileUploader } from '@/components/FileUploader/FileUploader'
export default function Dashboard() {
	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='start'
			height='100vh'
		>
			<Box display='flex' flexDirection='column' width='70%' gap='16px'>
				<Typography textAlign='center' fontSize='2em' alignSelf='start'>
					Sistema de Apuração dos Registros Universitários de Extensão
				</Typography>
				<hr
					style={{
						alignSelf: 'center',
						borderTop: '1px solid white',
						width: '100%',
					}}
				/>
				<FileUploader />
			</Box>
		</Box>
	)
}
