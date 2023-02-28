import { getPokemonList } from "./fetching.js";
import { createCard, search, clearContent, kick, toggleDisabled } from "./utils.js";
import { createOverlay } from "./overlay.js"
import { addToTeamLS, ShowTeamName, teamChampions } from "./store.js";


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
const searchStart = document.querySelector('.search__startscreen')
const teamStart = document.querySelector('.team__startscreen')
const backupHeading = document.querySelector('.backup__heading')



async function fullPokemonList() {
	const data = await getPokemonList()
	return data
}


ShowTeamName(teamName, team1)

if (mainContentSearch.childNodes.length == 2) {
	searchStart.classList.add('invisible')
} else if (mainContentSearch.childNodes.length < 2) {
	searchStart.classList.remove('invisible')
}

if (primaryTeam.childNodes.length > 3) {
	teamStart.classList.add('invisible')
	backupHeading.classList.remove('invisible')

} else if (primaryTeam.childNodes.length <= 3) {
	teamStart.classList.remove('invisible')
	backupHeading.classList.add('invisible')
}

console.log(primaryTeam.childNodes);
console.log(backupTeam.childNodes);

// promoteBtn.disabled = true


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

toggleDisabled()

teamButton.addEventListener('click', () => {
	searchView.classList.add('invisible')
	teamView.classList.remove('invisible')
	teamButton.classList.add('selected')
	searchButton.classList.remove('selected')
	clearContent(primaryTeam)
	clearContent(backupTeam)
	ShowTeamName(teamName, team1)
	toggleDisabled()
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

