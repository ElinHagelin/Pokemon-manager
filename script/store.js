const primaryTeam = document.querySelector('.team__primary')
const backupTeam = document.querySelector('.team__backup')

const LS_KEY = 'Pokemon-manager'
const team = {
	name: '',
	primaryChampions: [],
	backupChampions: []
}

function ShowTeamName(teamNameHeading, selectOption) {
	let teamFromLS = localStorage.getItem(LS_KEY)
	teamFromLS = JSON.parse(teamFromLS)

	if (teamFromLS.name) {
		teamNameHeading.innerText = `Team ${teamFromLS.name}`
		selectOption.innerText = `Team ${teamFromLS.name}`
	}
}

function teamChampions() {
	let teamFromLS = localStorage.getItem(LS_KEY)
	if (teamFromLS) {
		teamFromLS = JSON.parse(teamFromLS)
	}
	return teamFromLS
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
	let teamFromLS = localStorage.getItem(LS_KEY)

	if (!teamFromLS && !teamFromLS.champions) {
		teamFromLS = team
	} else {
		teamFromLS = JSON.parse(teamFromLS)
	}

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

	// const index = teamFromLS.champions.indexOf(pokemon)
	// const kicked = teamFromLS.champions.splice(index, 1)
	if (container == primaryTeam) {
		console.log('kick-button in primary ' + teamFromLS.primaryChampions);

		teamFromLS.primaryChampions = teamFromLS.primaryChampions.filter(pokemon => {
			return pokemon.name !== pokemonName
		})
		console.log(teamFromLS.primaryChampions);
	} else {
		console.log('kick-button in backup ' + teamFromLS.backupChampions);

		teamFromLS.backupChampions = teamFromLS.backupChampions.filter(pokemon => {
			return pokemon.name !== pokemonName
		})
	}
	// teamFromLS.primaryChampions.find(pokemon => {
	// if (pokemon.name == pokemonName) {

	// 	const index = teamFromLS.champions.indexOf(pokemon)
	// 	const remove = teamFromLS.champions.splice(index, 1)
	// }
	// })
	teamFromLS.primaryChampions.forEach(pokemon => console.log('primary: ' + pokemon.name))
	teamFromLS.backupChampions.forEach(pokemon => console.log('backup: ' + pokemon.name))

	teamFromLS.primaryChampions.forEach(pokemon => {
		console.log(pokemon.name);
	});
	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}

function demoteInTeamLS(pokemon) {
	let teamFromLS = localStorage.getItem(LS_KEY)
	teamFromLS = JSON.parse(teamFromLS)

	const index = teamFromLS.champions.indexOf(pokemon)
	console.log('index of pokemon to demote is: ' + index);
	const demoted = teamFromLS.champions.splice(index, 1)

	teamFromLS.backupChampions.push(demoted)

	console.log(demoted.name + ' was demoted to backup');

	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}



export { addToTeamLS, storeTeam, kickFromTeamLS, ShowTeamName, teamChampions, demoteInTeamLS }