import { Container, Typography } from '@mui/material'
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined'

export const Header = () => {
	return (
		<Container className='occupyWholeScreen w-screen p-0 m-0 mr-0 max-w-full'>
			<Typography
				variant='h4'
				className='bg-darkBlue'
				sx={{ flexGrow: 1, textAlign: 'center' }}
			>
				<LeaderboardOutlinedIcon fontSize='large' />
				SARUÊ - SIGAA
			</Typography>
		</Container>
	)
}
