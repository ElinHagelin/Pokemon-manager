import { createCard } from "./utils.js";

const primaryTeam = document.querySelector('.team__primary')
const backupTeam = document.querySelector('.team__backup')
// const promoteBtn = document.querySelector('.info__button--promote')


const LS_KEY = 'Pokemon-manager'
// const primaryChampions = []
// const backupChampions = []
const team = {
	name: '',
	primaryChampions: [],
	backupChampions: []
}

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

function ShowTeam(teamNameHeading, selectOption) {
	const team = teamChampions()

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

function storeNick(nick, cardHeading, pokemon, container) {
	let teamFromLS = localStorage.getItem(LS_KEY)
	teamFromLS = JSON.parse(teamFromLS)

	if (container == primaryTeam) {
		const pokemonToRename = primaryChampions.find(elem => elem.name == pokemon.name)
		console.log(pokemonToRename);
	}

	// console.log('inuti storeNick' + pokemon);
	// pokemon.name = pokemon.name + nick
	// console.log('Nytt namn: ' + pokemon.name);
	// cardHeading.innerText = pokemon.name

	// pokemon.nickname = nick

	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}

// Lägger till pokemon till ditt lag

function addToTeamLS(pokemon) {
	let teamFromLS = teamChampions()

	if (teamFromLS.primaryChampions.length < 3) {
		console.log('added ' + pokemon.name + ' to primary');
		teamFromLS.primaryChampions.push(pokemon)

	}
	else if (teamFromLS.primaryChampions.length >= 3) {
		console.log('added ' + pokemon.name + ' to backup');
		teamFromLS.backupChampions.push(pokemon)
	}

	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}


// Kickar pokemons från ditt lag

function kickFromTeamLS(pokemon, container) {
	let teamFromLS = localStorage.getItem(LS_KEY)
	teamFromLS = JSON.parse(teamFromLS)


	if (container == primaryTeam) {
		console.log(teamFromLS.primaryChampions);
		console.log('kick from primary: ' + pokemon.name);
		let pokemonIndex = teamFromLS.primaryChampions.findIndex(pokemon);
		console.log(pokemonIndex);

		let remove = teamFromLS.primaryChampions.splice(pokemonIndex, 1)
		console.log(remove);

	} else if (container == backupTeam) {
		console.log('kick from backup: ' + pokemon.name);
		let pokemonIndex = teamFromLS.backupChampions.findIndex(x => x = pokemon);

		let remove = teamFromLS.primaryChampions.splice(pokemonIndex, 1)
		console.log(remove);
	}

	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}

// Degraderar pokemon till backup

function demoteInTeamLS(pokemon) {
	let teamFromLS = localStorage.getItem(LS_KEY)
	teamFromLS = JSON.parse(teamFromLS)

	// teamFromLS.primaryChampions = teamFromLS.primaryChampions.filter(pokemon => {
	// 	if (pokemon.name == pokemonName) {
	// 		teamFromLS.backupChampions.push(pokemon)
	// 	}
	// 	return pokemon.name !== pokemonName
	// })

	const pokemonToDemote = teamFromLS.primaryChampions.find(elem => elem.name == pokemon.name)

	console.log('Demote: ' + pokemonToDemote.name + ' from LS');

	let pokemonIndex = teamFromLS.primaryChampions.indexOf(pokemonToDemote);

	teamFromLS.primaryChampions.splice(pokemonIndex, 1)
	teamFromLS.backupChampions.push(pokemon)

	console.log('inside demoteInTeamLS')

	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}

// Uppgraderar pokemon till primary

function promoteInTeamLS(pokemon) {
	let teamFromLS = localStorage.getItem(LS_KEY)
	teamFromLS = JSON.parse(teamFromLS)

	if (teamFromLS.primaryChampions.length < 3) {
		// teamFromLS.backupChampions = teamFromLS.backupChampions.filter(pokemon => {
		// 	if (pokemon.name == pokemonName) {
		// 		teamFromLS.primaryChampions.push(pokemon)
		// 	}
		// 	return pokemon.name !== pokemonName
		// })

		let pokemonIndex = teamFromLS.backupChampions.findIndex(x => x.name = pokemon.name);

		teamFromLS.backupChampions.splice(pokemonIndex, 1)
		teamFromLS.primaryChampions.push(pokemon)
	}

	console.log('inside promoteInTeamLS');

	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}


export { addToTeamLS, storeTeam, kickFromTeamLS, ShowTeam, teamChampions, demoteInTeamLS, promoteInTeamLS, storeNick }