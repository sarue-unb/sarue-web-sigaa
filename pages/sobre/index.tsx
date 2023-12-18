import { Container, Box, Typography } from '@mui/material'
import { TextHeader } from '@/components/TextHeader/TextHeader'
import Image from 'next/image'

const AboutPage = () => {
	return (
		<Container maxWidth='lg'>
			<Box
				display='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='start'
				padding={'2em'}
			>
				<TextHeader variant='h3' text='Sobre o projeto' />
				<Typography
					maxWidth={'70%'}
					variant='h5'
					textAlign='start'
					fontSize='1rem'
				>
					Este é o Sistema de Apuração dos Registros Universitários de Extensão
					(SARUE), desenvolvido por alunos e professores da Universidade de
					Brasília (UnB) em conjunto com o Decanato de Extensão. O objetivo do
					sistema é realizar o cálculo de alguns dos indicadores solicitados
					pelo TCU. Além disso, apresentar dados de maneira visual e de fácil
					compreensão, de diversas atividades realizadas sob a responsabilidade
					do Decanato de Extensão da Universidade de Brasília.
				</Typography>

				<TextHeader variant='h3' text='Funcionamento do SARUE' />
				<Typography maxWidth={'70%'} variant='h5' fontSize='1rem'>
					Todos os dados contidos no SARUE foram coletados através da plataforma
					SIGAA. Após eles serem coletados do SIGAA são apresentados aqui. Na
					presente versão do sistema, os dados não são atualizados em tempo
					real. O sistema se encontra em versão de testes, e não representa o
					estado final do sistema.
				</Typography>

				<TextHeader variant='h3' text='Como navegar no SARUE' />
				<Typography
					maxWidth={'70%'}
					variant='h5'
					textAlign='start'
					fontSize='1rem'
				>
					Para navegar no SARUE é necessário utilizar o menu lateral. Nele é
					possível acessar a página inicial, acessar os indicadores, exportar os
					dados no excel, e deletar os dados salvos no navegador.
				</Typography>
				<Image
					src='./side_menu.png'
					width={200}
					height={150}
					alt='Side menu'
					unoptimized
				/>

				<TextHeader variant='h3' text='Como utilizar a página inicial' />
				<Typography
					maxWidth={'70%'}
					variant='h5'
					textAlign='start'
					fontSize='1rem'
				>
					Na página inicial é possível carregar os dados do sistema. Isto ocorre
					ou carregando os dados do servidor ou então carregando os próprios
					dados. Esta etapa é obrigatória para utilizar os indicadores.
				</Typography>
				<Image
					unoptimized
					src='./dashboard_img.png'
					width={450}
					height={900}
					alt='Dashboard'
				/>

				<TextHeader variant='h3' text='Indicadores' />
				<Typography maxWidth={'70%'} variant='h5' fontSize='1rem'>
					Para acessar os indicadores, sejam eles acadêmicos ou do TCU é
					necessário primeiramente carregar os dados do servidor na página
					incial. Basta selecionar um item da lista para ter acesso a um dos
					indicadores.
				</Typography>
				<Image
					src='./lista_indicadores.png'
					width={600}
					height={450}
					alt='Side menu'
					unoptimized
				/>
				<TextHeader variant='h3' text='Reportar problemas' />
				<Typography
					maxWidth={'70%'}
					variant='h5'
					textAlign='start'
					fontSize='1rem'
				>
					Caso tenha algum problema ou sugestão para o sistema sarue, nos ajude
					enviando um e-mail para sistemasarue@gmail.com. Seu feedback será
					analisado pela nossa equipe!
				</Typography>
			</Box>
		</Container>
	)
}
export default AboutPage
