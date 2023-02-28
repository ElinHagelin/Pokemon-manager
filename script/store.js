import { createCard } from "./utils.js";

const primaryTeam = document.querySelector('.team__primary')
const backupTeam = document.querySelector('.team__backup')
const promoteBtn = document.querySelector('.info__button--promote')


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


function teamChampions() {
	let teamFromLS = localStorage.getItem(LS_KEY)
	if (teamFromLS) {
		teamFromLS = JSON.parse(teamFromLS)
	} else if (teamFromLS == null) {
		teamFromLS = team
	}
	// console.log('inuti teamChampions: ' + JSON.stringify(teamFromLS));
	return teamFromLS
}


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


function storeTeam(teamName) {
	console.log('kör storeTeam 1');
	let teamFromLS = localStorage.getItem(LS_KEY)
	console.log('efter hämtning ' + teamFromLS);
	if (teamFromLS //&& teamFromLS.name
	) {
		teamFromLS = JSON.parse(teamFromLS)
	} else {
		teamFromLS = team
		console.log('skapar nytt lag' + teamFromLS);
	}
	teamFromLS.name = teamName
	console.log('kör storeTeam 2' + teamFromLS.name);

	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}


function addToTeamLS(pokemon) {
	let teamFromLS = teamChampions()

	// if (!teamFromLS && !teamFromLS.primaryChampions) {
	// 	teamFromLS = team
	// } else {
	// 	teamFromLS = JSON.parse(teamFromLS)
	// }

	if (teamFromLS.primaryChampions.length < 3) {
		teamFromLS.primaryChampions.push(pokemon)

	}
	else if (teamFromLS.primaryChampions.length >= 3) {
		teamFromLS.backupChampions.push(pokemon)

	}

	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}


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


export { addToTeamLS, storeTeam, kickFromTeamLS, ShowTeamName, teamChampions, demoteInTeamLS, promoteInTeamLS }