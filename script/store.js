

const LS_KEY = 'Pokemon-manager-team'

function addToTeam(pokemon) {
	let teamFromLocalStorage = localStorage.getItem(LS_KEY)

	if (!teamFromLocalStorage) {
		teamFromLocalStorage = '[]'
	}
	let team = JSON.parse(teamFromLocalStorage)

	team.push(pokemon)

	let teamToSave = JSON.stringify(team)
	localStorage.setItem(LS_KEY, teamToSave)
}

export { addToTeam }