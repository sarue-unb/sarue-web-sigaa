import React from 'react'
import { Typography, Box } from '@mui/material'

export const TextHeader = (props: any) => {
	return (
		<Box>
			<Typography textAlign='start' fontSize='1.5em'>
				{props.text}
			</Typography>
			<hr
				style={{
					borderTop: '1px solid white',
					width: '60vw',
					marginBottom: '50px',
				}}
			/>
		</Box>
	)
}
