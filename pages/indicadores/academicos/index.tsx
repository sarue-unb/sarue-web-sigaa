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
		>
			<Typography marginTop='10px' textAlign='center' fontSize='2em'>
				Indicadores Acadêmicos
			</Typography>
			<hr
				style={{
					borderTop: '1px solid white',
					width: '70%',
					margin: '0 0 0 50px 0',
				}}
			/>

			<Box
				display='flex'
				flexDirection='column'
				justifyContent='flex-start'
				alignItems='flex-start'
			>
				{academicIndicadoresList}
			</Box>
		</Box>
	)
}
