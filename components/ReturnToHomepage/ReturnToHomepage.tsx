import { Typography, Button } from '@mui/material'
import Box from '@mui/material/Box'
import Link from 'next/link'

const ReturnToHomePage = () => {
	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			height='100vh'
			maxWidth={'100%'}
		>
			<Box
				padding={'3rem'}
				alignItems='center'
				justifyContent='center'
				className='bg-darkGrey'
			>
				<Typography maxWidth={'300px'}>
					Arquivo com os dados não encontrado. Por favor, carregue o arquivo.
				</Typography>
				<Link href={'/dashboard'}>
					<Button
						variant='contained'
						sx={{
							maxWidth: '20rem',
							backgroundColor: '#0172BE !important',
							borderRadius: '24px',
							marginTop: '2rem',
						}}
					>
						<Typography>Retornar à pàgina inicial</Typography>
					</Button>
				</Link>
			</Box>
		</Box>
	)
}

export default ReturnToHomePage
