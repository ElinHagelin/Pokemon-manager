import { createCard } from "./utils.js";

const primaryTeam = document.querySelector('.team__primary')
const backupTeam = document.querySelector('.team__backup')
// const promoteBtn = document.querySelector('.info__button--promote')


const LS_KEY = 'Pokemon-manager'
const primaryChampions = []
const backupChampions = []
const team = {
	name: '',
	primaryChampions: [],
	backupChampions: []
}


// const teams = {
// 	teams: [{name: '', champions: {primary:[], backup: []}}]
// }


// hämtar laget ur LS om det finns något att hämta

function teamChampions() {
	let teamFromLS = localStorage.getItem(LS_KEY)
	if (teamFromLS) {
		teamFromLS = JSON.parse(teamFromLS)
	} else if (teamFromLS == null) {
		teamFromLS = team
	}
	return teamFromLS
}


// Skapar element och lägger in innehåll i lag-vyn

function ShowTeamName(teamNameHeading, selectOption) {
	const team = teamChampions()

	if (team.name) {
		teamNameHeading.innerText = `Team ${team.name}`
		selectOption.innerText = `Team ${team.name}`
	}
	team.primaryChampions.forEach(pokemon => {
		createCard(primaryTeam, pokemon)
	})
	team.backupChampions.forEach(pokemon => {
		createCard(backupTeam, pokemon)
	})

	// if (teamFromLS.primaryChampions.length < 3) {
	// 	promoteBtn.disabled = false
	// }
	// else if (teamFromLS.primaryChampions.length >= 3) {
	// 	promoteBtn.disabled = true
	// }
}


// sparar lagnamnet när man ändrat

function storeTeam(teamName) {
	let teamFromLS = localStorage.getItem(LS_KEY)
	if (teamFromLS) {
		teamFromLS = JSON.parse(teamFromLS)
	} else {
		teamFromLS = team
		// skapar nytt lag om det inte finns något i LS
	}
	teamFromLS.name = teamName

	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}

// sparar namnen du ger pokemons i ditt lag 

function storeNick(nick, cardHeading, pokemon) {
	let teamFromLS = localStorage.getItem(LS_KEY)
	teamFromLS = JSON.parse(teamFromLS)

	console.log('inuti storeNick' + pokemon);
	pokemon.name = pokemon.name + nick
	console.log('Nytt namn: ' + pokemon.name);
	cardHeading.innerText = pokemon.name


	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}

// Lägger till pokemon till ditt lag

function addToTeamLS(pokemon) {
	let teamFromLS = teamChampions()

	if (teamFromLS.primaryChampions.length < 3) {
		teamFromLS.primaryChampions.push(pokemon)

	}
	else if (teamFromLS.primaryChampions.length >= 3) {
		teamFromLS.backupChampions.push(pokemon)

	}

	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}


// Kickar pokemons från ditt lag

function kickFromTeamLS(pokemonName, container) {
	let teamFromLS = localStorage.getItem(LS_KEY)
	teamFromLS = JSON.parse(teamFromLS)

	if (container == primaryTeam) {
		console.log('kick from primary: ' + pokemonName);

		teamFromLS.primaryChampions = teamFromLS.primaryChampions.filter(pokemon => {
			return pokemon.name !== pokemonName
		})

	} else if (container == backupTeam) {
		console.log('kick from backup: ' + pokemonName);

		teamFromLS.backupChampions = teamFromLS.backupChampions.filter(pokemon => {
			return pokemon.name !== pokemonName
		})
	}

	teamFromLS.primaryChampions.forEach(pokemon => console.log('LSprimary: ' + pokemon.name))
	teamFromLS.backupChampions.forEach(pokemon => console.log('LSbackup: ' + pokemon.name))


	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}

// Degraderar pokemon till backup

function demoteInTeamLS(pokemonName) {
	let teamFromLS = localStorage.getItem(LS_KEY)
	teamFromLS = JSON.parse(teamFromLS)

	teamFromLS.primaryChampions = teamFromLS.primaryChampions.filter(pokemon => {
		if (pokemon.name == pokemonName) {
			teamFromLS.backupChampions.push(pokemon)
		}
		return pokemon.name !== pokemonName
	})

	console.log('inside demoteInTeamLS')

	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}

// Uppgraderar opokemon till primary

function promoteInTeamLS(pokemonName) {
	let teamFromLS = localStorage.getItem(LS_KEY)
	teamFromLS = JSON.parse(teamFromLS)

	if (teamFromLS.primaryChampions.length < 3) {
		teamFromLS.backupChampions = teamFromLS.backupChampions.filter(pokemon => {
			if (pokemon.name == pokemonName) {
				teamFromLS.primaryChampions.push(pokemon)
			}
			return pokemon.name !== pokemonName
		})
	}

	console.log('inside promoteInTeamLS');

	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}


export { addToTeamLS, storeTeam, kickFromTeamLS, ShowTeamName, teamChampions, demoteInTeamLS, promoteInTeamLS, storeNick }