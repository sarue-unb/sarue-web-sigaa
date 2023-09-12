import { Box, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadFilesMessage, fileLoadedMessage } from './messages'
import { isDatabaseLoaded } from '../utils/utils'

export const FileUploader = () => {
	const [uploadMessage, setUploadMessage] = useState(uploadFilesMessage)

	const changeUploadMessage = () => {
		setUploadMessage(fileLoadedMessage)
	}
	useEffect(() => {
		if (isDatabaseLoaded()) {
			changeUploadMessage()
		}
	}, [])

	const onDrop = useCallback((acceptedFiles: any[]) => {
		acceptedFiles.forEach((file: Blob) => {
			const reader = new FileReader()

			reader.onabort = () => console.log('file reading was aborted')
			reader.onerror = () => console.log('file reading has failed')
			reader.onload = () => {
				localStorage.setItem('database', reader.result as string)
				changeUploadMessage()
			}
			reader.readAsText(file)
		})
	}, [])
	const { getRootProps, getInputProps } = useDropzone({ onDrop })

	return (
		<div>
			<Typography variant='h6' style={{ marginBottom: '10px' }}>
				Para reutilizar a busca realizada no SIGAA:
			</Typography>
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
					className='p-3 text-justify justify-center hover:cursor-pointer items-center border-dashed border-2 border-darkGreen hover:bg-lightGrey'
					style={{
						borderRadius: '4px',
					}}
				>
					<Typography variant='body1'>{uploadMessage}</Typography>
				</Container>
			</Container>
		</div>
	)
}
