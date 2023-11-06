import { Box, Container, Typography } from '@mui/material'

const AboutPage = () => {
	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='start'
			height='100vh'
		>
			<Box display='flex' flexDirection='column' width='70%'>
				<Typography
					marginTop='10px'
					textAlign='center'
					fontSize='2em'
					alignSelf='start'
				>
					Sobre o projeto
				</Typography>
				<hr
					style={{
						alignSelf: 'center',
						borderTop: '1px solid white',
						width: '100%',
						margin: '0 0 0 50px 0',
					}}
				/>
			</Box>
			<Container
				style={{
					maxWidth: '70%',
					borderRadius: '4px',
					marginTop: '16px',
					paddingTop: '8px',
					paddingBottom: '8px',
					textAlign: 'justify',
				}}
				className='bg-darkGrey'
			>
				<Typography variant='body1'>
					Este é o Sistema SARUE, desenvolvido por alunos e professores da
					Universidade de Brasília (UnB) em conjunto com o Decanato de Extensão.
					O objetivo do sistema é apresentar dados de maneira visual e de fácil
					compreensão, de diversas atividades realizadas sob a responsabilidade
					do Decanato de Extensão da Universidade de Brasília.
				</Typography>
			</Container>
		</Box>
	)
}
export default AboutPage
