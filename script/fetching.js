// Hämtar Listan med pokemon från API

async function getPokemonList() {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
	let data = await response.json()
	return data
}

// Hämtar bilder från API

async function getImage(url) {
	const response = await fetch(url)
	let data = await response.json()
	return data.sprites.front_default
}


export { getImage, getPokemonList }