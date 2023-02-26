import { getPokemonList } from "./fetching.js";
import { createCards, search, clearContent, kick, addToTeam } from "./utils.js";
import { createOverlay } from "./overlay.js"
import { addToTeamLS, ShowTeamName } from "./store.js";


const html = document.querySelector('html')
const body = document.querySelector('body')
const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('.button--search')
const teamButton = document.querySelector('.button--team')
const mainContent = document.querySelector('.main__content')
const searchView = document.querySelector('.main__search')
const teamView = document.querySelector('.main__team')
const editIcon = document.querySelector('.heading__icon')
const teamName = document.querySelector('.team__heading__text')
const addToTeamBtn = document.querySelector('.info__button--add')
const team1 = document.querySelector('#team-1')


const baseUrl = 'https://pokeapi.co/api/v2/pokemon'
const showAll = '?limit=100000&offset=0'
const show20 = '?limit=20&offset=0'


async function fullPokemonList() {
	const data = await getPokemonList()
	return data
}

ShowTeamName(teamName, team1)

searchInput.addEventListener('keydown', async (event) => {
	const data = await fullPokemonList()
	const searchString = searchInput.value.toLowerCase()
	if (event.key == 'Enter' && searchString != '') {
		clearContent()

		const searchList = search(searchString, data.results)

		createCards(searchList)
		addToTeam(searchList, addToTeamBtn)
		console.log('söklista är: ' + searchList.results);
		searchInput.value = ''
	}
	else if (event.key == 'Enter' && searchString == '') {
		clearContent()
		createCards(data.results)
		addToTeam(data.results, addToTeamBtn)
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
	createOverlay(html)
})


// addToTeamBtn.addEventListener('click', () => {
// 	console.log();
// 	addToTeam(pokemon)
// })


