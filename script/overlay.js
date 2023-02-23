import { storeTeam } from "./store.js";

const teamName = document.querySelector('.team__heading')

function createOverlay(body) {
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

	overlay.heading.innerText = 'Name your team'

	overlay.dialogue.append(overlay.heading)
	overlay.dialogue.append(overlay.input)
	overlay.background.append(overlay.dialogue)
	body.append(overlay.background)


	overlay.input.addEventListener('keydown', event => {
		if (event.key == 'Enter' && overlay.input.value != '') {
			storeTeam(overlay.input.value)
			teamName.innerText = `Team ${overlay.input.value}`
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

	// return overlay
}

export { createOverlay }