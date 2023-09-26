import React, { ReactNode, useState } from 'react'
import {
	Box,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material'
import Link from 'next/link'

import { useIsMobile } from '@/components/hooks/useIsMobile'
interface CustomListItemProps {
	text: string
	linkRoute: string
	icon?: ReactNode // Adicionando a propriedade para o ícone
}

const CustomListItem = (props: CustomListItemProps) => {
	const [width, setWidth] = useState(0)
	const isMobile = useIsMobile(width, setWidth)
	if (isMobile) {
		return (
			<Link href={props.linkRoute}>
				<ListItem>
					<ListItemButton className='bg-gray-200 p-0'>
						{props.icon && <Box fontSize='large'>{props.icon}</Box>}
					</ListItemButton>
				</ListItem>
			</Link>
		)
	}

	return (
		<Link href={props.linkRoute}>
			<ListItem className='py-2 rounded-lg hover:bg-gray-500'>
				<ListItemButton className='rounded-lg hover:bg-gray-500  p-0'>
					{props.icon && (
						<Box fontSize='large' mr={2}>
							{props.icon}
						</Box>
					)}{' '}
					<ListItemText>
						<Typography fontSize='large'>{props.text}</Typography>
					</ListItemText>
				</ListItemButton>
			</ListItem>
		</Link>
	)
}

export default CustomListItem
