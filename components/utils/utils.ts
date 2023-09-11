export const isDatabaseLoaded = () => {
	if (typeof window != 'undefined') {
		return localStorage.getItem('database') !== null
	}
}

export const getDatabase = () => {
	if (typeof window != 'undefined') {
		return JSON.parse(localStorage.getItem('database'))
	}
}
