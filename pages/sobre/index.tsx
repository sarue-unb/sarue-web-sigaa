import { Box, Typography } from '@mui/material'
import { TextHeader } from '@/components/TextHeader/TextHeader'

const AboutPage = () => {
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
			<TextHeader text='Sobre o projeto' />
			<Typography maxWidth={'50%'} textAlign='start' fontSize='1rem'>
				Este é o Sistema de Apuração dos Registros Universitários de Extensão
				(SARUE), desenvolvido por alunos e professores da Universidade de
				Brasília (UnB) em conjunto com o Decanato de Extensão. O objetivo do
				sistema é apresentar dados de maneira visual e de fácil compreensão, de
				diversas atividades realizadas sob a responsabilidade do Decanato de
				Extensão da Universidade de Brasília.
			</Typography>
		</Box>
	)
}
export default AboutPage
