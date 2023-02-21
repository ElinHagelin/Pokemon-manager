const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('.button--search')

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
const showAll = '?limit=100000&offset=0'

searchInput.addEventListener('keydown', async (event) => {
	const search = searchInput.value
	if (event.key == 'Enter' && search != '') {
		const response = await fetch(baseUrl + search)
		console.log('response is ' + response);
		let data = await response.text()
		console.log('data is ' + data);
		return data
	}
	else if (event.key == 'Enter' && search == '') {
		const response = await fetch(baseUrl + showAll)
		console.log('response is ' + response);
		let data = await response.text()
		console.log('data is ' + data);
		return data
	}
})



export { }