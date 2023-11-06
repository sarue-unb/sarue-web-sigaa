import ReturnToHomePage from '@/components/ReturnToHomepage/ReturnToHomepage'
import { useShowReturnToHomePage } from '@/components/hooks/useShowReturnToHomePage'
import { Box, Typography } from '@mui/material'

const ExportarDados = () => {
	const shouldShowReturnToHomePage = useShowReturnToHomePage()

	if (shouldShowReturnToHomePage) {
		return <ReturnToHomePage />
	}

	return (
		<Box height='100vh'>
			<Typography textAlign='center' fontSize='2rem'>
				Esta pagina vai ser responsável por conter a interface de exportar dados
			</Typography>
		</Box>
	)
}
export default ExportarDados
