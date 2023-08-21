import { Container, List, Typography, Divider, Avatar } from '@mui/material'
import CustomListItem from '../CustomListItem/CustomListItem'
import HomeIcon from '@mui/icons-material/Home'
import BarChart from '@mui/icons-material/BarChart'
import Description from '@mui/icons-material/Description'
import Help from '@mui/icons-material/Help'
import ExitToApp from '@mui/icons-material/ExitToApp'

const SideNavMenu = () => {
	return (
		<Container className='bg-darkGrey h-full p-0'>
			<div className='flex items-center p-4  mt-4'>
				<Avatar
					alt='Avatar do Usuário'
					src='/imagem-avatar.jpg'
					sx={{
						width: 96,
						height: 96,
						backgroundColor: 'white',
					}}
				/>
				<div className='ml-4'>
					<Typography variant='subtitle1' color='white' fontSize='large'>
						DOCENTE
					</Typography>
					<Typography variant='body1' color='white' fontSize='large'>
						Nome do Usuário
					</Typography>
				</div>
			</div>
			<nav aria-label='Navegação principal'>
				<List>
					<Divider
						sx={{
							width: '80%',
							opacity: 0.3,
							margin: '16px auto',
							borderColor: 'gray',
						}}
					/>
					{/* <Typography
						variant='subtitle1'
						color='white'
						sx={{ marginBottom: '10px', ml: '36px' }}
					>
						MENU
					</Typography> */}
					<CustomListItem
						text='Dashboard'
						linkRoute='/dashboard'
						icon={<HomeIcon fontSize='large' htmlColor='white' />}
					></CustomListItem>
					<CustomListItem
						text='Indicadores TCU'
						linkRoute='/indicadores'
						icon={<BarChart fontSize='large' htmlColor='white' />}
					></CustomListItem>
					<CustomListItem
						text='Indicadores Acadêmicos'
						linkRoute='/indicadores'
						icon={<BarChart fontSize='large' htmlColor='white' />}
					></CustomListItem>
					<CustomListItem
						text='Exportar dados'
						linkRoute='/indicadores'
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
						linkRoute='/dashboard'
						icon={<Help fontSize='large' htmlColor='white' />}
					></CustomListItem>
					<CustomListItem
						text='Sair'
						linkRoute='/indicadores'
						icon={<ExitToApp fontSize='large' htmlColor='lightcoral' />}
					></CustomListItem>
				</List>
			</nav>
		</Container>
	)
}

export default SideNavMenu
