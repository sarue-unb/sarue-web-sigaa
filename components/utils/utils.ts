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

export const monthsPortuguese = {
  'janeiro': '1',
  'fevereiro': '2',
  'março': '3',
  'abril': '4',
  'maio': '5',
  'junho': '6',
  'julho': '7',
  'agosto': '8',
  'setembro': '9',
  'outubro': '10',
  'novembro': '11',
  'dezembro': '12',
};
