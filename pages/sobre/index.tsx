import { Box, Typography } from '@mui/material'

const AboutPage = () => {
	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='start'
			justifyContent='start'
			height='100vh'
			marginLeft={'2rem'}
			maxWidth={'30rem'}
		>
			<Typography marginTop='100px' textAlign='center' fontSize='3rem'>
				Sobre o projeto
			</Typography>
			<Typography marginTop='100px' textAlign='start' fontSize='1rem'>
				Este é o Sistema SARUE, desenvolvido por alunos e professores da
				Universidade de Brasília (UnB) em conjunto com o Decanato de Extensão. O
				objetivo do sistema é apresentar dados de maneira visual e de fácil
				compreensão, de diversas atividades realizadas sob a responsabilidade do
				Decanato de Extensão da Universidade de Brasília.
			</Typography>
		</Box>
	)
}
export default AboutPage
