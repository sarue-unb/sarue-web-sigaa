import React, { ReactNode } from 'react'
import {
	Box,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material'
import Link from 'next/link'

interface CustomListItemProps {
	text: string
	linkRoute: string
	icon?: ReactNode // Adicionando a propriedade para o ícone
}

const CustomListItem = (props: CustomListItemProps) => {
	return (
		<Link href={props.linkRoute}>
			<ListItem>
				<ListItemButton className='hover:bg-lightGrey'>
					{props.icon && (
						<Box fontSize='large' mr={2}>
							{props.icon}
						</Box>
					)}{' '}
					{/* Renderiza o ícone se fornecido */}
					<ListItemText>
						<Typography fontSize='large'>{props.text}</Typography>
					</ListItemText>
				</ListItemButton>
			</ListItem>
		</Link>
	)
}

export default CustomListItem
