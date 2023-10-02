export const isDatabaseLoaded = () => {
	if (typeof window != 'undefined') {
		return localStorage.getItem('database') !== null
	}
}

export const getDatabase = () => {
	if (typeof window !== 'undefined') {
		const database = localStorage.getItem('database') as string
		return JSON.parse(database)
	}

	return ''
}

export const monthsPortuguese: any = {
	janeiro: '1',
	fevereiro: '2',
	março: '3',
	abril: '4',
	maio: '5',
	junho: '6',
	julho: '7',
	agosto: '8',
	setembro: '9',
	outubro: '10',
	novembro: '11',
	dezembro: '12',
}

export const transformPortugueseMonthsToNumbers = (data: {
	[x: string]: any
}) => {
	const transformedData: any = {}

	for (const year in data) {
		transformedData[year] = {}
		const yearData = data[year]

		for (const month in yearData) {
			const monthValue = yearData[month]
			const monthNumber = monthsPortuguese[month.toLowerCase()]

			if (monthNumber) {
				transformedData[year][monthNumber] = monthValue
			}
		}
	}

	return transformedData
}

export const transformObjectToTableRow = (data: {
	[x: string]: { [s: string]: any }
}) => {
	const transformedObject: any = {}

	for (const year in data) {
		const monthValues = Object.values(data[year])
		transformedObject[year] = monthValues
	}

	return transformedObject
}

export const sanitizeUnavailableData = (obj: any) => {
	const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

	for (const year in obj) {
		const yearData = obj[year]

		for (const month of months) {
			if (yearData[month] === undefined) {
				yearData[month] = 'n/d'
			}
		}
	}

	return obj
}
