import { useEffect, useState } from 'react'
import { isDatabaseLoaded } from '../utils/utils'

export const useShowReturnToHomePage = () => {
	const [returnToHomepage, setReturnToHomepage] = useState(true)

	useEffect(() => {
		if (isDatabaseLoaded()) {
			setReturnToHomepage(false)
		}
	}, [returnToHomepage])

	return returnToHomepage
}
