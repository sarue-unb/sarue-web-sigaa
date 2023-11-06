import React, { useState } from 'react'
import Box from '@mui/material/Box'

import { BotaoIndicadores } from '../../../components/Indicadores/BotaoIndicadores/BotaoIndicadores'
import { IndicadoresAcademicList } from '../../../components/Indicadores/IndicadoresAcademicList'
import ReturnToHomePage from '@/components/ReturnToHomepage/ReturnToHomepage'
import { useShowReturnToHomePage } from '@/components/hooks/useShowReturnToHomePage'
import { TextHeader } from '@/components/TextHeader/TextHeader'

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
			maxWidth={'100%'}
			padding={'2em'}
		>
			<TextHeader text='Indicadores Acadêmicos' />
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
