import Button from '@mui/material/Button'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

interface BotaoIndicadoresProps {
	label: string
	onClick: () => void
}

export const BotaoIndicadores = ({ label, onClick }: BotaoIndicadoresProps) => (
	<Button
		variant='contained'
		onClick={onClick}
		sx={{
			maxWidth: '30rem',
			my: 1,
			whiteSpace: 'break-spaces',
			justifyContent: 'space-between',
			backgroundColor: 'green !important',
			borderRadius: '24px',
			display: 'flex',
			alignItems: 'center',
			paddingLeft: '24px',
			paddingRight: '24px',
		}}
	>
		{label}
		<KeyboardArrowRightIcon />
	</Button>
)
