import { Container, Typography } from '@mui/material'

export const Footer = () => {
	return (
		<Container className='occupyWholeScreen fixed bottom-0 w-screen p-0 m-0 mr-0 max-w-full bg-darkGreen'>
			<Typography variant='body1' sx={{ flexGrow: 1, textAlign: 'center' }}>
				Universidade de Brasilia
			</Typography>
		</Container>
	)
}
