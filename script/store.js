

const LS_KEY = 'Pokemon-manager'
const team = {
	name: '',
	primaryChampions: [],
	backupChampions: []
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
	// console.log('kör storeTeam 2' + teamFromLS.name);

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

function kickFromLS(pokemonName) {
	let teamFromLS = localStorage.getItem(LS_KEY)
	teamFromLS = JSON.parse(teamFromLS)

	teamFromLS.champions.find(pokemon => {
		if (pokemon.name == pokemonName) {
			const index = teamFromLS.champions.indexOf(pokemon)
			const remove = teamFromLS.champions.splice(index, 1)
		}
	})
	let teamToSave = JSON.stringify(teamFromLS)
	localStorage.setItem(LS_KEY, teamToSave)
}



export { addToTeam, storeTeam, kickFromLS }