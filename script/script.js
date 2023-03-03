import { getPokemonList } from "./fetching.js";
import { createCard, search, clearContent, toggleDisabled, teamStartScreen } from "./utils.js";
import { createOverlay } from "./overlay.js"
import { ShowTeam } from "./store.js";


const html = document.querySelector('html')
const mainContent = document.querySelector('.main__content')
const primaryTeam = document.querySelector('.team__primary')
const backupTeam = document.querySelector('.team__backup')
const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('.button--search')
const teamButton = document.querySelector('.button--team')
const searchView = document.querySelector('.main__search')
const teamView = document.querySelector('.main__team')
const editIcon = document.querySelector('.heading__icon')
const teamName = document.querySelector('.team__heading__text')
const searchError = document.querySelector('.search__error')


// Hämtar hela listan med pokemon från API

async function fullPokemonList() {
	const data = await getPokemonList()
	return data
}


ShowTeam(teamName)
teamStartScreen()
// searchStartScreen()

clearContent(mainContent)
const data = await fullPokemonList()
data.results.forEach(async (pokemon) => {
	createCard(mainContent, pokemon)
})


// Lyssnar på enter på sök-input

searchInput.addEventListener('keydown', async (event) => {
	const data = await fullPokemonList()
	searchError.classList.add('invisible')

	const searchString = searchInput.value.toLowerCase()
	if (event.key == 'Enter' && searchString != '') {
		clearContent(mainContent)
		const searchList = search(searchString, data.results)
		if (searchList.length === 0) {
			searchError.classList.remove('invisible')
		} else {
			searchList.forEach(async (pokemon) => {
				createCard(mainContent, pokemon)
			})
		}

		searchInput.value = ''
	}
	else if (event.key == 'Enter' && searchString == '') {
		clearContent(mainContent)
		data.results.forEach(async (pokemon) => {
			createCard(mainContent, pokemon)
		})

		searchInput.value = ''
	}
})

// toggleDisabled()

// Lyssnar på klick på teamButton. Gör sökvyn osynlig och teamvyn synlig.

teamButton.addEventListener('click', () => {
	searchView.classList.add('invisible')
	teamView.classList.remove('invisible')
	teamButton.classList.add('selected')
	searchButton.classList.remove('selected')
	clearContent(primaryTeam)
	clearContent(backupTeam)
	ShowTeam(teamName)
	teamStartScreen()
	toggleDisabled()
})

// Lyssnar på klick på searchButton. Gör teamvyn osynlig och sökvyn synlig.

searchButton.addEventListener('click', () => {
	searchView.classList.remove('invisible')
	teamView.classList.add('invisible')
	teamButton.classList.remove('selected')
	searchButton.classList.add('selected')
})

// Öppnar overlay för att byta nman på laget

editIcon.addEventListener('click', () => {
	createOverlay(html, 'Name your team')
})


