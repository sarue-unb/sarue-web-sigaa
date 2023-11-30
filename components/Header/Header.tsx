import { Container, Typography, Box } from '@mui/material'
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined'

export const Header = () => {
	return (
		<Container
			className='occupyWholeScreen w-screen p-0 m-0 mr-0 max-w-full'
			style={{
				background: '#003366',
				height: '80px',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Typography variant='h4' sx={{ flexGrow: 1, textAlign: 'center' }}>
				<LeaderboardOutlinedIcon
					sx={{ marginBottom: '-7px', marginRight: '8px' }}
					fontSize='large'
				/>
				SARUÊ - SIGAA
			</Typography>
		</Container>
	)
}
