import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { Grid, Box } from '@mui/material'
import Head from 'next/head'
import MainView from '@/components/MainView/MainView'
import { useEffect, useState } from 'react'
import DisclaimerModal from '@/components/Disclaimer/Disclaimer'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head >
				<title>SARUE</title>
				<meta
					name='description'
					content='Sistema De Acompanhamento Dos Registros Universitarios De Extensao'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main style={{ maxWidth: '100%' }} className='occupyWholeScreen m-0'>
				<DisclaimerModal />
				<Grid
					sx={{ width: '100%' }}
					className='occupyWholeScreen max-h-screen column m-0'
				>
					<Header />
					<MainView>
						<Component className='m-0' class='test123' {...pageProps} />
					</MainView>
					<Footer />
				</Grid>
			</main>
		</>
	)
}
