import Button from '@mui/material/Button'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Link from '@mui/material/Link'

export const BotaoIndicadores = ({ indicadorValue, onClick }: any) => (
	<Link href={indicadorValue.path}>
		<Button
			variant='contained'
			onClick={onClick}
			sx={{
				maxWidth: '50rem',
				minWidth: '35rem',
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
			{indicadorValue.shortTitle}
			<KeyboardArrowRightIcon />
		</Button>
	</Link>
)
