import { searchPokemon, getPokemonList } from "./fetching.js";
import { createCards, search, clearContent } from "./utils.js";
import { createOverlay } from "./overlay.js"
// import { addToTeam } from "./store.js";

const body = document.querySelector('body')
const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('.button--search')
const teamButton = document.querySelector('.button--team')
const mainContent = document.querySelector('.main__content')
const searchView = document.querySelector('.main__search')
const teamView = document.querySelector('.main__team')
const editIcon = document.querySelector('.heading__icon')


const baseUrl = 'https://pokeapi.co/api/v2/pokemon'
const showAll = '?limit=100000&offset=0'
const show20 = '?limit=20&offset=0'


async function fullPokemonList() {
	const data = await getPokemonList()
	return data
}


searchInput.addEventListener('keydown', async (event) => {
	const data = await fullPokemonList()
	const searchString = searchInput.value.toLowerCase()
	if (event.key == 'Enter' && searchString != '') {
		clearContent()

		const searchList = search(searchString, data.results)

		createCards(searchList)
		console.log('söklista är: ' + searchList);
		searchInput.value = ''
	}
	else if (event.key == 'Enter' && searchString == '') {
		clearContent()
		createCards(data.results)
		data.results.forEach(pokemon => {
			console.log(pokemon)
		});
		searchInput.value = ''
	}
})

teamButton.addEventListener('click', () => {
	searchView.classList.add('invisible')
	teamView.classList.remove('invisible')
	teamButton.classList.add('selected')
	searchButton.classList.remove('selected')
})

searchButton.addEventListener('click', () => {
	searchView.classList.remove('invisible')
	teamView.classList.add('invisible')
	teamButton.classList.remove('selected')
	searchButton.classList.add('selected')
})


editIcon.addEventListener('click', () => {
	createOverlay(body)
})


