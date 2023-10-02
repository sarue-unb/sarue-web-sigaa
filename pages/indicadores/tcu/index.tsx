import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Button, Modal, Typography } from '@mui/material'

import { BotaoIndicadores } from '../../../components/Indicadores/BotaoIndicadores/BotaoIndicadores'
import { IndicadoresTcuList } from '../../../components/Indicadores/IndicadoresTcuList'
import { isDatabaseLoaded } from '@/components/utils/utils'
import ReturnToHomePage from '@/components/ReturnToHomepage/ReturnToHomepage'

export default function Indicadores() {
	const [showData, setShowData] = useState(false)
	const [returnToHomepage, setReturnToHomepage] = useState(true)

	const handleButtonClick = () => {
		setShowData(!showData)
	}

	const tcuIndicadoresList = Object.entries(IndicadoresTcuList).map(
		([key, value]) => (
			<BotaoIndicadores indicadorValue={value} onClick={handleButtonClick} />
		),
	)

	useEffect(() => {
		if (isDatabaseLoaded()) {
			setReturnToHomepage(false)
		}
	}, [returnToHomepage])

	if (returnToHomepage) {
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
				Indicadores TCU
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
				{tcuIndicadoresList}
			</Box>
		</Box>
	)
}
