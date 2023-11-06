import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

import { BotaoIndicadores } from '../../../components/Indicadores/BotaoIndicadores/BotaoIndicadores'
import { IndicadoresAcademicList } from '../../../components/Indicadores/IndicadoresAcademicList'
import ReturnToHomePage from '@/components/ReturnToHomepage/ReturnToHomepage'
import { useShowReturnToHomePage } from '@/components/hooks/useShowReturnToHomePage'

export default function Indicadores() {
	const [showData, setShowData] = useState(false)
	const shouldShowReturnToHomePage = useShowReturnToHomePage()
	const handleButtonClick = () => {
		setShowData(!showData)
	}

	const academicIndicadoresList = Object.entries(IndicadoresAcademicList).map(
		([key, value]) => (
			<BotaoIndicadores indicadorValue={value} onClick={handleButtonClick} />
		),
	)

	if (shouldShowReturnToHomePage) {
		return <ReturnToHomePage />
	}

	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='start'
			height='100vh'
			gap='16px'
		>
			<Box display='flex' flexDirection='column' width='70%'>
				<Typography textAlign='center' fontSize='2em' alignSelf='start'>
					Indicadores Acadêmicos
				</Typography>
				<hr
					style={{
						alignSelf: 'center',
						borderTop: '1px solid white',
						width: '100%',
						margin: '0 0 0 50px 0',
					}}
				/>
			</Box>

			<Box
				display='flex'
				flexDirection='column'
				justifyContent='flex-start'
				alignItems='flex-start'
				gap='16px'
			>
				{academicIndicadoresList}
			</Box>
		</Box>
	)
}
