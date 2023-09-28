import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

import { BotaoIndicadores } from '../../../components/Indicadores/BotaoIndicadores/BotaoIndicadores'
import { IndicadoresTcuList } from '../../../components/Indicadores/IndicadoresTcuList'

export default function Indicadores() {
	const [showData, setShowData] = useState(false)

	const handleButtonClick = () => {
		setShowData(!showData)
	}

	const buttons = Object.entries(IndicadoresTcuList).map(([key, value]) => (
		<BotaoIndicadores indicadorValue={value} onClick={handleButtonClick} />
	))

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
				{buttons}
			</Box>
		</Box>
	)
}
