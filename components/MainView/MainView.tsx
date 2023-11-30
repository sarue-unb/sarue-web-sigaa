import SideNavMenu from '../SideNav/SideNavMenu/SideNavMenu'
import { Grid } from '@mui/material'
import { Container } from '@mui/system'

interface SideNavProps {
	children: React.ReactNode
}

const MainView = ({ children }: SideNavProps) => {
	return (
		<Container className='occupyWholeScreen max-h-min w-screen p-0 max-w-full'>
			<Grid container>
				<Grid container item xs={3}>
					<SideNavMenu />
				</Grid>
				<Grid item xs={9} className='bg-lightGrey pt-8  mb-14'>
					{children}
				</Grid>
			</Grid>
		</Container>
	)
}

export default MainView
