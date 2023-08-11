import { Box, ListItem, Typography } from '@mui/material'

interface DisclaimerItemProps {
	index: number
	title: string
	description: string
}

const DisclaimerItem = ({ index, title, description }: DisclaimerItemProps) => {
	return (
		<ListItem
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start', // Alinha o conteúdo à esquerda
				paddingBottom: '16px', // Espaçamento inferior entre itens
				marginBottom: '16px', // Espaçamento inferior entre itens
			}}
		>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<Typography
					variant='h6'
					fontWeight='bold'
					sx={{ marginTop: 0, color: 'black' }}
					textTransform='uppercase'
					fontSize='32px'
				>
					{index}. {title}
				</Typography>
				<Typography
					variant='body1'
					textAlign='justify'
					sx={{ marginTop: 0, color: 'black' }}
					fontSize='20px'
				>
					{description}
				</Typography>
			</Box>
		</ListItem>
	)
}

export default DisclaimerItem
