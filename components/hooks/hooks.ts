import React, { useEffect } from 'react'

export const useIsMobile = (width: number, setWidth: any) => {
	useEffect(() => {
		window.addEventListener('resize', setWidth(window.innerWidth))
		return () => {
			window.removeEventListener('resize', setWidth(window.innerWidth))
		}
	}, [])

	return width <= 1024
}
