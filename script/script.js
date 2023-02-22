import { searchPokemon } from "./fetching.js";
import { createCards } from "./utils.js";
// import { addToTeam } from "./store.js";

const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('.button--search')
const teamButton = document.querySelector('.button--team')
const mainContent = document.querySelector('.main__content')

const baseUrl = 'https://pokeapi.co/api/v2/pokemon'
const showAll = '?limit=100000&offset=0'
const show20 = '?limit=20&offset=0'


searchInput.addEventListener('keydown', async (event) => {
	const search = searchInput.value
	if (event.key == 'Enter' && search != '') {
		const data = await searchPokemon(baseUrl, `/${search}`)
		const renderList = createCards(data.results)
		console.log(data);
	}
	else if (event.key == 'Enter' && search == '') {
		const data = await searchPokemon(baseUrl, show20)
		const renderList = createCards(data.results)
		console.log(data);
	}
})

