import { getInfoFromAPI } from "./fetching.js";
import { createCard, search, clearContent, toggleDisabled, teamStartScreen } from "./utils.js";
import { createInputOverlay, startOverlay } from "./overlay.js"
import { ShowTeam } from "./store.js";

const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1050&offset=0'

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


startOverlay(html)
ShowTeam(teamName)
teamStartScreen()

// Skapar listan med alla pokemon i sökvyn från start

clearContent(mainContent)
const data = await getInfoFromAPI(pokemonUrl)
data.results.forEach(async (pokemon) => {
	createCard(mainContent, pokemon)
})

// Lyssnar på enter på sök-input

searchInput.addEventListener('keydown', async (event) => {
	const data = await getInfoFromAPI(pokemonUrl)
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

// Öppnar overlay för att byta namn på laget

editIcon.addEventListener('click', () => {
	createInputOverlay(html, 'Name your team')
})


