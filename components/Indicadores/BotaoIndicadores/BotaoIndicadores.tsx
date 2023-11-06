import Button from '@mui/material/Button'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Link from '@mui/material/Link'

export const BotaoIndicadores = ({ indicadorValue, onClick }: any) => (
	<Link href={indicadorValue.path}>
		<Button
			variant='contained'
			onClick={onClick}
			sx={{
				maxWidth: '80rem',
				minWidth: '68rem',
				height: '5rem',
				whiteSpace: 'break-spaces',
				justifyContent: 'space-between',
				backgroundColor: 'green !important',
				borderRadius: '24px',
				display: 'flex',
				fontSize: '18px',
				alignItems: 'center',
				paddingLeft: '24px',
				paddingRight: '24px',
			}}
		>
			{indicadorValue.shortTitle}
			<KeyboardArrowRightIcon />
		</Button>
	</Link>
)
