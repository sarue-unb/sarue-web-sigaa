import { Box, Typography, Button } from '@mui/material'
import { Container } from '@mui/system'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadFilesMessage, fileLoadedMessage } from './messages'
import { isDatabaseLoaded } from '../utils/utils'
import { database } from '@/database'

export const FileUploader = () => {
	const [uploadMessage, setUploadMessage] = useState(uploadFilesMessage)
	const [status, setStatus] = useState(false)
	const downloadFileFromServer = () => {
		setStatus(!status)
		localStorage.setItem('database', JSON.stringify(database))
	}

	const changeUploadMessage = () => {
		setUploadMessage(fileLoadedMessage)
	}
	useEffect(() => {
		if (isDatabaseLoaded()) {
			changeUploadMessage()
		}
	}, [status])

	const onDrop = useCallback(acceptedFiles => {
		acceptedFiles.forEach(file => {
			const reader = new FileReader()

			reader.onabort = () => console.log('file reading was aborted')
			reader.onerror = () => console.log('file reading has failed')
			reader.onload = () => {
				localStorage.setItem('database', reader.result)
				changeUploadMessage()
			}
			reader.readAsText(file)
		})
	}, [])
	const { getRootProps, getInputProps } = useDropzone({ onDrop })

	return (
		<Box maxWidth={'30rem'} justifyContent={'center'} alignContent={'center'}>
			<Typography variant='h6' style={{ marginBottom: '10px' }}>
				Para utilizar o sistema é necessário carregar a base de dados do SIGAA.
				Carregue o arquivo ou clique no botão.
			</Typography>
			<Box>
				<Container
					className='px-8 flex items-center bg-darkGrey max-w-xs h-56'
					{...getRootProps()}
					style={{
						borderRadius: '8px',
						boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
						transition: 'background-color 0.3s',
					}}
				>
					<input {...getInputProps()} />
					<Container
						className='p-3 text-justify justify-center hover:cursor-pointer items-center border-dashed border-2 border-darkGreen hover:bg-gray-500'
						style={{
							maxWidth: '70%',
							borderRadius: '4px',
						}}
					>
						<Typography variant='body1'>{uploadMessage}</Typography>
					</Container>
				</Container>
			</Box>

			<Button
				variant='contained'
				color='primary'
				onClick={downloadFileFromServer}
				sx={{
					mt: 2,
					width: '300px',
					fontSize: '1em',
					borderRadius: '32px',
					marginBottom: '1em',
				}}
			>
				Baixar arquivo do servidor
			</Button>
		</Box>
	)
}
