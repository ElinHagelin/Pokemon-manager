import { getPokemonList } from "./fetching.js";
import { createCard, search, clearContent, kick } from "./utils.js";
import { createOverlay } from "./overlay.js"
import { addToTeamLS, ShowTeamName, teamChampions } from "./store.js";


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
const addToTeamBtn = document.querySelector('.info__button--add')
const team1 = document.querySelector('#team-1')


async function fullPokemonList() {
	const data = await getPokemonList()
	return data
}


ShowTeamName(teamName, team1)


searchInput.addEventListener('keydown', async (event) => {
	const data = await fullPokemonList()
	const searchString = searchInput.value.toLowerCase()
	if (event.key == 'Enter' && searchString != '') {
		clearContent(mainContent)
		const searchList = search(searchString, data.results)
		searchList.forEach(async (pokemon) => {
			createCard(mainContent, pokemon)
		})
		// searchList.forEach(pokemon =>
		// 	console.log(pokemon)
		// );
		searchInput.value = ''
	}
	else if (event.key == 'Enter' && searchString == '') {
		clearContent(mainContent)
		data.results.forEach(async (pokemon) => {
			createCard(mainContent, pokemon)
		})
		// data.results.forEach(pokemon =>
		// 	console.log(pokemon)
		// );
		searchInput.value = ''
	}
})


teamButton.addEventListener('click', () => {
	searchView.classList.add('invisible')
	teamView.classList.remove('invisible')
	teamButton.classList.add('selected')
	searchButton.classList.remove('selected')
	clearContent(primaryTeam)
	clearContent(backupTeam)
	ShowTeamName(teamName, team1)
})


searchButton.addEventListener('click', () => {
	searchView.classList.remove('invisible')
	teamView.classList.add('invisible')
	teamButton.classList.remove('selected')
	searchButton.classList.add('selected')
})


editIcon.addEventListener('click', () => {
	createOverlay(html)
})



