import { Box, Typography } from '@mui/material'

const AboutPage = () => {
	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			height='100vh'
		>
			<Typography marginTop='100px' textAlign='center' fontSize='42px'>
				Sobre o projeto
			</Typography>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='center'
				flex={1}
			></Box>
		</Box>
	)
}
export default AboutPage
