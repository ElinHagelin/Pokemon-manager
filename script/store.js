

const LS_KEY = 'Pokemon-manager'
const team = {
	name: '',
	primaryChampions: [],
	backupChampions: []
}

function storeTeam(teamName) {
	let teamFromLS = localStorage.getItem(LS_KEY)

	if (teamFromLS && teamFromLS.name) {
		teamFromLS = JSON.parse(teamFromLS)
	} else {
		teamFromLS = team
		console.log('skapar nytt lag' + teamFromLS);
	}

	teamFromLS.name = teamName

	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}

function addToTeam(pokemon) {
	let teamFromLS = localStorage.getItem(LS_KEY)

	if (!teamFromLS && !teamFromLS.champions) {
		teamFromLS = team
	} else {
		teamFromLS = JSON.parse(teamFromLS)
	}

	if (primaryChampions.length < 3) {
		teamFromLS.primaryChampions.push(pokemon)
	}
	else if (primaryChampions.length >= 3) {
		teamFromLS.backupChampions.push(pokemon)
	}

	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}

export { addToTeam, storeTeam }