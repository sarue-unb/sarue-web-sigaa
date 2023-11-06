import { Box, Typography, Button } from '@mui/material'
import { Container } from '@mui/system'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadFilesMessage, fileLoadedMessage } from './messages'
import {
	isDatabaseLoaded,
	getDatabase,
	parseCustomDateString,
} from '../utils/utils'
import { database } from '@/database'
import UploadIcon from '@mui/icons-material/Upload'

export const FileUploader = () => {
	const [uploadMessage, setUploadMessage] = useState(uploadFilesMessage)
	const [dateTime, setDateTime] = useState('')
	const [status, setStatus] = useState(false)
	const downloadFileFromServer = () => {
		setStatus(!status)
		localStorage.setItem('database', JSON.stringify(database))
		changeUploadMessage()
	}

	const changeUploadMessage = () => {
		setUploadMessage(fileLoadedMessage)
		const tmpDatabase = getDatabase()
		setDateTime(parseCustomDateString(tmpDatabase['date_time']))
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
		<Box maxWidth={'80%'} justifyContent={'center'} alignContent={'center'}>
			<Typography variant='h6' style={{ marginBottom: '10px' }}>
				Carregar dados através do envio de arquivo
			</Typography>
			<Typography style={{ marginBottom: '10px' }}>
				Caso você já possua algum arquivo com os dos indicadores em seu
				computador e deseja visualiza-los aqui no sistema SARUE, basta
				arrastá-lo na caixa abaixo:
			</Typography>
			<Box>
				<Container
					className=' bg-darkGrey h-24'
					{...getRootProps()}
					style={{
						height: '100%',
						display: 'flex',
						padding: '1.5rem',
						maxWidth: '800px',
						borderRadius: '8px',
						boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
						transition: 'background-color 0.3s',
					}}
				>
					<input {...getInputProps()} />
					<Container
						className='flex flex-column p-3 text-justify justify-center hover:cursor-pointer items-center border-dashed border-2 border-darkGreen hover:bg-gray-500'
						style={{
							maxWidth: '85%',
							borderRadius: '4px',
							paddingLeft: '108px',
							paddingRight: '108px',
						}}
					>
						<Typography variant='body1'>
							{uploadMessage}

							<UploadIcon />
						</Typography>
					</Container>
				</Container>
			</Box>
			{dateTime != '' && (
				<Typography
					variant='body1'
					style={{ marginTop: '5px', fontStyle: 'italic' }}
				>
					Versão dos dados carregados: {dateTime}
				</Typography>
			)}

			<Typography variant='h6' style={{ marginBottom: '0', marginTop: '20px' }}>
				Carregar dados do servidor
			</Typography>
			<Typography style={{ marginBottom: '10px' }}>
				Você também pode baixar os dados mais recente do servidor:
			</Typography>

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
