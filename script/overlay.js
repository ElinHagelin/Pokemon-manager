import { storeTeam, storeNick } from "./store.js";

const teamName = document.querySelector('.team__heading__text')
const primaryTeam = document.querySelector('.team__primary')
const backupTeam = document.querySelector('.team__backup')

function startOverlay(container) {
	const background = document.createElement('div')
	const dialogue = document.createElement('div')
	const startHeading = document.createElement('h1')
	const startText = document.createElement('p')

	background.classList.add('overlay__background')
	dialogue.classList.add('start__overlay__dialogue')
	startHeading.classList.add('start__overlay__heading')
	startText.classList.add('start__overlay__text')

	startHeading.innerText = 'Welcome to Pokémon Team Manager'
	startText.innerText = `Here you can create your own pokemon-team. It's easy, just scroll through the list with pokémon or search for specific pokémon and add them to your team. Click outside this box to get started`

	dialogue.append(startHeading, startText)
	background.append(dialogue)
	container.append(background)
	dialogue.addEventListener('click', event => {
		event.stopPropagation()
	})

	background.addEventListener('click', () => {
		background.remove()
	})
}

// Skapar en overlay med en input

function createInputOverlay(container, headingText, pokemon, teamContainer, pokemonHeading, capitalName) {
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
				storeNick(' ' + newName, pokemon, primaryTeam, pokemonHeading)
			} else {
				storeNick(' ' + newName, pokemon, backupTeam, pokemonHeading)
			}

			newName = ''
			overlay.background.remove()
		}
		else if (event.key == 'Enter' && newName == '') {
			if (headingText == 'Name your pokémon') {
				pokemonHeading.innerText = capitalName
			}
			else if (headingText == 'Name your team') {
				teamName.innerText = 'Add team name'
			}
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

export { createInputOverlay, startOverlay }