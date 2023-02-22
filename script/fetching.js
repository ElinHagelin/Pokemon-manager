
async function searchPokemon(url, search) {
	const response = await fetch(url + search)
	let data = await response.json()
	return data
}

async function getImage(url) {
	const response = await fetch(url)
	let data = await response.json()
	return data.sprites.front_default
}



export { searchPokemon, getImage }