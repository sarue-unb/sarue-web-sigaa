import { Box, Typography, Button } from '@mui/material'
import { TextHeader } from '@/components/TextHeader/TextHeader'
import { useRouter } from 'next/router'

const RestartPage = () => {
	const router = useRouter()

	const deleteInfo = () => {
		localStorage.clear()
		router.push('/dashboard')
	}
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
			<TextHeader text='Deletar dados' />
			<Typography maxWidth={'50%'} textAlign='start' fontSize='1rem'>
				Ao clicar no botão abaixo os arquivos carregados e dados salvos serão
				deletados. Em seguida você será redirecionado para a página inicial.
			</Typography>
			<Button
				variant='contained'
				color='primary'
				onClick={deleteInfo}
				sx={{
					mt: 2,
					width: '300px',
					fontSize: '1em',
					borderRadius: '32px',
					marginBottom: '1em',
				}}
			>
				Deletar dados
			</Button>
		</Box>
	)
}
export default RestartPage
