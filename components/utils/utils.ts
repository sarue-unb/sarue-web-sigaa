export const isDatabaseLoaded = () => {
	if (typeof window != 'undefined') {
		return localStorage.getItem('database') !== null
	}
}

export const getDatabase = () => {
	if (typeof window !== 'undefined') {
		const database = localStorage.getItem('database') as string
		return database
	}

	return ''
}
