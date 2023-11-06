import { Container, List, Divider } from '@mui/material'
import CustomListItem from '../CustomListItem/CustomListItem'
import HomeIcon from '@mui/icons-material/Home'
import BarChart from '@mui/icons-material/BarChart'
import Description from '@mui/icons-material/Description'
import Help from '@mui/icons-material/Help'
import ExitToApp from '@mui/icons-material/ExitToApp'
import SchoolIcon from '@mui/icons-material/School'
const SideNavMenu = () => {
	return (
		<Container className='bg-darkGrey p-0'>
			<nav aria-label='Navegação principal'>
				<List>
					<CustomListItem
						text='Dashboard'
						linkRoute='/dashboard'
						icon={<HomeIcon fontSize='large' htmlColor='white' />}
					></CustomListItem>
					<CustomListItem
						text='Indicadores TCU'
						linkRoute='/indicadores/tcu'
						icon={<BarChart fontSize='large' htmlColor='white' />}
					></CustomListItem>
					<CustomListItem
						text='Indicadores Acadêmicos'
						linkRoute='/indicadores/academicos'
						icon={<SchoolIcon fontSize='large' htmlColor='white' />}
					></CustomListItem>
					<CustomListItem
						text='Exportar dados para o excel'
						linkRoute='/exportar-dados'
						icon={<Description fontSize='large' htmlColor='white' />}
					></CustomListItem>
				</List>
				<Divider
					sx={{
						width: '80%',
						opacity: 0.3,
						margin: '16px auto',
						borderColor: 'gray',
					}}
				/>
				<List>
					<CustomListItem
						text='Sobre o projeto'
						linkRoute='/sobre'
						icon={<Help fontSize='large' htmlColor='white' />}
					></CustomListItem>
					<CustomListItem
						text='Sair'
						linkRoute='/dashboard'
						icon={<ExitToApp fontSize='large' htmlColor='lightcoral' />}
					></CustomListItem>
				</List>
			</nav>
		</Container>
	)
}

export default SideNavMenu
