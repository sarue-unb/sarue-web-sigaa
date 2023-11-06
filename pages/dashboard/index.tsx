import Box from '@mui/material/Box'
import { FileUploader } from '@/components/FileUploader/FileUploader'
import { TextHeader } from '@/components/TextHeader/TextHeader'

export default function Dashboard() {
	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='start'
			height='100vh'
			maxWidth={'100%'}
			padding={'2em'}
		>
			<TextHeader text='Página Inicial' />

			<FileUploader />
		</Box>
	)
}
