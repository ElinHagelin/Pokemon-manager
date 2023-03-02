import { storeTeam, storeNick } from "./store.js";

const teamName = document.querySelector('.team__heading__text')
// const pokemonHeading = document.querySelector('.info__heading')
const primaryTeam = document.querySelector('.team__primary')
const backupTeam = document.querySelector('.team__backup')

// Skapar en overlay med en input

function createOverlay(container, headingText, pokemon, teamContainer, pokemonHeading, capitalName) {
	const overlay = {
		background: document.createElement('div'),
		dialogue: document.createElement('div'),
		heading: document.createElement('label'),
		input: document.createElement('input')
	}

	overlay.background.classList.add('overlay__background')
	overlay.dialogue.classList.add('overlay__dialogue')
	overlay.heading.classList.add('overlay__heading')
	overlay.input.classList.add('overlay__input')

	overlay.heading.innerText = headingText
	overlay.input.setAttribute('maxlength', 10)

	overlay.dialogue.append(overlay.heading)
	overlay.dialogue.append(overlay.input)
	overlay.background.append(overlay.dialogue)
	container.append(overlay.background)


	overlay.input.addEventListener('keydown', event => {
		let newName = overlay.input.value
		if (event.key == 'Enter' && newName != '' && headingText == 'Name your team') {
			storeTeam(newName)
			teamName.innerText = `Team ${newName}`
			newName = ''
			overlay.background.remove()
		}
		else if (event.key == 'Enter' && newName != '' && headingText == 'Name your pokémon') {
			if (teamContainer == primaryTeam) {
				storeNick(' ' + newName, pokemonHeading, pokemon, primaryTeam)
				capitalName = capitalName + ' ' + newName
				pokemonHeading.innerText = capitalName

			} else {
				capitalName = capitalName + ' ' + newName
				storeNick(capitalName, pokemonHeading, pokemon, backupTeam)
				pokemonHeading.innerText = capitalName

			}
			newName = ''
			overlay.background.remove()
		}
		else if (event.key == 'Enter' && newName == '') {
			overlay.background.remove()
		}
	})

	overlay.dialogue.addEventListener('click', event => {
		event.stopPropagation()
	})

	overlay.background.addEventListener('click', () => {
		overlay.background.remove()
	})
}

export { createOverlay }