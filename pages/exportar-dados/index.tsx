import ReturnToHomePage from '@/components/ReturnToHomepage/ReturnToHomepage'
import { useShowReturnToHomePage } from '@/components/hooks/useShowReturnToHomePage'
import { Box, Typography, Button } from '@mui/material'
import { TextHeader } from '@/components/TextHeader/TextHeader'
import Link from 'next/link'

const ExportarDados = () => {
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
			<TextHeader text='Exportar dados para o excel' />
			<Typography maxWidth={'50%'} textAlign='start' fontSize='1rem'>
				Para exportar os dados brutos sobre todas as ações de extensão,
			</Typography>
			<Button
				variant='contained'
				color='primary'
				sx={{
					mt: 2,
					width: '300px',
					fontSize: '1em',
					borderRadius: '32px',
					marginBottom: '1em',
				}}
			>
				{/* Deve ser uma chamada para a API do servidor */}
				<Link href='/dados_brutos_acoes_extensao.xlsx'>
					Baixar dados brutos
				</Link>
			</Button>
		</Box>
	)
}
export default ExportarDados
