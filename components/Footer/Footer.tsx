import { Container } from '@mui/material'

export const Footer = () => {
	return (
		<Container
			className='occupyWholeScreen w-screen p-0 m-0 mr-0 max-w-full sx={{ zIndex: 1300}}'
			style={{
				background: '#006400',
				height: '80px',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<img
				src='./logo_unb.png'
				alt='Universidade de Brasília'
				style={{ display: 'block', margin: 'auto' }}
			/>
		</Container>
	)
}
