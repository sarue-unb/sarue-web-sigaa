export const isDatabaseLoaded = () => {
	if (typeof window != 'undefined') {
		return localStorage.getItem('database') !== null
	}
}
