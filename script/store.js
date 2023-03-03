import { createCard } from "./utils.js";

const primaryTeam = document.querySelector('.team__primary')
const backupTeam = document.querySelector('.team__backup')

const LS_KEY = 'Pokemon-manager'

const emptyTeam = {
	name: '',
	primaryChampions: [],
	backupChampions: []
}

// hämtar laget ur LS om det finns något att hämta

function getTeamFromLS() {
	let teamFromLS = localStorage.getItem(LS_KEY)
	if (teamFromLS) {
		teamFromLS = JSON.parse(teamFromLS)
	} else if (teamFromLS == null) {
		teamFromLS = emptyTeam
	}
	return teamFromLS
}

// sparar det uppdaterade laget i LS

function setTeamInLS(team) {
	let teamToSave = JSON.stringify(team)
	localStorage.setItem(LS_KEY, teamToSave)
}

// Skapar element och lägger in innehåll i lag-vyn

function ShowTeam(teamNameHeading) {
	const team = getTeamFromLS()

	if (team.name) {
		teamNameHeading.innerText = `Team ${team.name}`
	}
	team.primaryChampions.forEach(pokemon => {
		createCard(primaryTeam, pokemon)
	})
	team.backupChampions.forEach(pokemon => {
		createCard(backupTeam, pokemon)
	})
}

// sparar lagnamnet när man ändrat

function storeTeam(teamName) {
	let team = getTeamFromLS()
	team.name = teamName

	setTeamInLS(team)
}

// sparar namnen du ger pokemons i ditt lag 

function storeNick(newName, pokemon, container, heading) {
	let team = getTeamFromLS()
	let capitalName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

	if (container == primaryTeam) {
		const pokemonToRename = team.primaryChampions.find(elem => elem.name == pokemon.name)
		let pokemonIndex = team.primaryChampions.indexOf(pokemonToRename);

		team.primaryChampions[pokemonIndex].nick = `${capitalName} '${newName}'`
		heading.innerText = team.primaryChampions[pokemonIndex].nick

	} else if (container == backupTeam) {
		const pokemonToRename = team.backupChampions.find(elem => elem.name == pokemon.name)
		let pokemonIndex = team.backupChampions.indexOf(pokemonToRename);

		console.log(pokemonToRename, pokemonIndex);

		team.backupChampions[pokemonIndex].nick = `${capitalName} '${newName}'`
		heading.innerText = team.backupChampions[pokemonIndex].nick
	}

	setTeamInLS(team)
}

// Lägger till pokemon till ditt lag

function addToTeamLS(pokemon) {
	let team = getTeamFromLS()

	if (team.primaryChampions.length < 3) {
		team.primaryChampions.push(pokemon)

	}
	else if (team.primaryChampions.length >= 3) {
		team.backupChampions.push(pokemon)
	}

	setTeamInLS(team)
}

// Kickar pokemons från ditt lag

function kickFromTeamLS(pokemon, container) {
	let team = getTeamFromLS()

	if (container == primaryTeam) {
		const pokemonToKick = team.primaryChampions.find(elem => elem.name == pokemon.name)
		let pokemonIndex = team.primaryChampions.indexOf(pokemonToKick);

		team.primaryChampions.splice(pokemonIndex, 1)

	} else if (container == backupTeam) {
		const pokemonToKick = team.backupChampions.find(elem => elem.name == pokemon.name)
		let pokemonIndex = team.backupChampions.indexOf(pokemonToKick);

		team.backupChampions.splice(pokemonIndex, 1)
	}

	setTeamInLS(team)
}

// Degraderar pokemon till backup

function demoteInTeamLS(pokemon) {
	let team = getTeamFromLS()

	const pokemonToDemote = team.primaryChampions.find(elem => elem.name == pokemon.name)
	let pokemonIndex = team.primaryChampions.indexOf(pokemonToDemote);

	team.primaryChampions.splice(pokemonIndex, 1)
	team.backupChampions.push(pokemon)

	setTeamInLS(team)
}

// Uppgraderar pokemon till primary

function promoteInTeamLS(pokemon) {
	let team = getTeamFromLS()

	if (team.primaryChampions.length < 3) {
		const pokemonToPromote = team.backupChampions.find(elem => elem.name == pokemon.name)
		let pokemonIndex = team.primaryChampions.indexOf(pokemonToPromote);

		team.backupChampions.splice(pokemonIndex, 1)
		team.primaryChampions.push(pokemon)
	}

	setTeamInLS(team)
}


export { addToTeamLS, storeTeam, kickFromTeamLS, ShowTeam, getTeamFromLS, demoteInTeamLS, promoteInTeamLS, storeNick }