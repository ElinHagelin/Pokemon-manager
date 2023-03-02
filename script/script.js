import { getPokemonList } from "./fetching.js";
import { createCard, search, clearContent, kick, toggleDisabled, searchStartScreen, teamStartScreen } from "./utils.js";
import { createOverlay } from "./overlay.js"
import { addToTeamLS, ShowTeam, getTeamFromLS } from "./store.js";


const html = document.querySelector('html')
const mainContent = document.querySelector('.main__content')
const mainContentSearch = document.querySelector('.main__content--search')
const mainContentTeam = document.querySelector('.main__content--team')
const primaryTeam = document.querySelector('.team__primary')
const backupTeam = document.querySelector('.team__backup')
const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('.button--search')
const teamButton = document.querySelector('.button--team')
const searchView = document.querySelector('.main__search')
const teamView = document.querySelector('.main__team')
const editIcon = document.querySelector('.heading__icon')
const teamName = document.querySelector('.team__heading__text')
const addToTeamBtn = document.querySelector('.info__button--add')
const team1 = document.querySelector('#team-1')
const promoteBtn = document.querySelector('.info__button--promote')
const editNick = document.querySelector('.edit-nick')


// Hämtar hela listan med pokemon från API

async function fullPokemonList() {
	const data = await getPokemonList()
	return data
}


ShowTeam(teamName)
teamStartScreen()
searchStartScreen()



// Lyssnar på enter på sök-input

searchInput.addEventListener('keydown', async (event) => {
	const data = await fullPokemonList()

	const searchString = searchInput.value.toLowerCase()
	if (event.key == 'Enter' && searchString != '') {
		clearContent(mainContent)
		const searchList = search(searchString, data.results)
		searchList.forEach(async (pokemon) => {
			createCard(mainContent, pokemon)
		})

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
	ShowTeam(teamName, team1)
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


