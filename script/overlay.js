import { storeTeam, storeNick } from "./store.js";

const teamName = document.querySelector('.team__heading__text')
const pokemonHeading = document.querySelector('.info__heading')


// Skapar en overlay med en input

function createOverlay(container, headingText, pokemon) {
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
		if (event.key == 'Enter' && overlay.input.value != '' && headingText == 'Name your team') {
			storeTeam(overlay.input.value)
			teamName.innerText = `Team ${overlay.input.value}`
			overlay.input.value = ''
			overlay.background.remove()
		}
		else if (event.key == 'Enter' && overlay.input.value != '' && headingText == 'Name your pokémon') {
			// const pokemonHeading = document.querySelector('.info__heading')
			storeNick(' ' + overlay.input.value, headingText, pokemon)
			overlay.input.value = ''
			overlay.background.remove()
		}
		else if (event.key == 'Enter' && overlay.input.value == '') {
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