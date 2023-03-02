import { createCard } from "./utils.js";

const primaryTeam = document.querySelector('.team__primary')
const backupTeam = document.querySelector('.team__backup')
// const promoteBtn = document.querySelector('.info__button--promote')


const LS_KEY = 'Pokemon-manager'
// const primaryChampions = []
// const backupChampions = []
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

function storeNick(newName, cardHeading, pokemon, container) {
	let team = getTeamFromLS()

	if (container == primaryTeam) {
		const pokemonToRename = team.primaryChampions.find(elem => elem.name == pokemon.name)
		console.log('innan namnbyte: ' + pokemonToRename);
		pokemonToRename.name = newName
		console.log('efter namnbyte: ' + pokemonToRename);
	}

	// console.log('inuti storeNick' + pokemon);
	// pokemon.name = pokemon.name + nick
	// console.log('Nytt namn: ' + pokemon.name);
	// cardHeading.innerText = pokemon.name

	// pokemon.nickname = nick

	setTeamInLS(team)
}

// Lägger till pokemon till ditt lag

function addToTeamLS(pokemon) {
	let team = getTeamFromLS()

	if (team.primaryChampions.length < 3) {
		console.log('added ' + pokemon.name + ' to primary');
		team.primaryChampions.push(pokemon)

	}
	else if (team.primaryChampions.length >= 3) {
		console.log('added ' + pokemon.name + ' to backup');
		team.backupChampions.push(pokemon)
	}

	setTeamInLS(team)
}


// Kickar pokemons från ditt lag

function kickFromTeamLS(pokemon, container) {
	let team = getTeamFromLS()

	if (container == primaryTeam) {
		console.log(team.primaryChampions);
		console.log('kick from primary: ' + pokemon.name);
		const pokemonToKick = team.primaryChampions.find(elem => elem.name == pokemon.name)
		let pokemonIndex = team.primaryChampions.indexOf(pokemonToKick);
		console.log(pokemonIndex);

		team.primaryChampions.splice(pokemonIndex, 1)
		// console.log(remove);

	} else if (container == backupTeam) {
		console.log('kick from backup: ' + pokemon.name);
		const pokemonToKick = team.backupChampions.find(elem => elem.name == pokemon.name)
		console.log(pokemonToKick);
		let pokemonIndex = team.backupChampions.indexOf(pokemonToKick);
		console.log(pokemonIndex);

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

	console.log('inside demoteInTeamLS')

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

	console.log('inside promoteInTeamLS');

	setTeamInLS(team)
}


export { addToTeamLS, storeTeam, kickFromTeamLS, ShowTeam, getTeamFromLS, demoteInTeamLS, promoteInTeamLS, storeNick }