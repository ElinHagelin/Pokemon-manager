import { getImage } from "./fetching.js";
import { addToTeamLS, kickFromTeamLS, demoteInTeamLS, promoteInTeamLS, teamChampions } from "./store.js";

const mainContent = document.querySelector('.main__content')
const mainContentSearch = document.querySelector('.main__content--search')
const primaryTeam = document.querySelector('.team__primary')
const backupTeam = document.querySelector('.team__backup')
const promoteButton = document.querySelector('.info__button--promote')
const searchStart = document.querySelector('.search__startscreen')
const teamStart = document.querySelector('.team__startscreen')
const backupHeading = document.querySelector('.backup__heading')
const addOverlay = document.querySelector('.add__overlay')
const addOverlayText = document.querySelector('.add__overlay__para')
const teamOverlay = document.querySelector('.team__overlay')
const teamOverlayText = document.querySelector('.team__overlay__para')



function searchStartScreen() {
	if (mainContentSearch.childNodes.length == 2) {
		searchStart.classList.add('invisible')
	} else if (mainContentSearch.childNodes.length < 2) {
		searchStart.classList.remove('invisible')
	}
}

function teamStartScreen() {
	if (primaryTeam.childNodes.length > 3) {
		teamStart.classList.add('invisible')
		backupHeading.classList.remove('invisible')

	} else if (primaryTeam.childNodes.length <= 3 && backupTeam.childNodes.length <= 3) {
		teamStart.classList.remove('invisible')
		backupHeading.classList.add('invisible')
	}
}

async function createCard(container, pokemon) {

	const card = createElement('div', 'card')
	const pokemonImg = createElement('img', 'card__image')
	const cardInfo = createElement('section', 'card__info')
	const headingContainer = createElement('div', 'info__heading__container')
	const heading = createElement('h5', 'info__heading')
	const expandBtn = createElement('button', 'info__expand')
	const expandIcon = createElement('img', 'expand__icon')
	const pokemonInfo = createElement('p', 'info__text')
	const buttonContainer = createElement('div', 'info__button__container')
	const promoteBtn = createElement('button', 'info__button--promote')

	container.append(card)
	card.append(pokemonImg)
	card.append(cardInfo)
	cardInfo.append(headingContainer)
	headingContainer.append(heading)
	headingContainer.append(expandBtn)
	expandBtn.append(expandIcon)
	cardInfo.append(pokemonInfo)


	let pokemonName = pokemon.name
	let capitalName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)

	pokemonImg.src = await getImage(pokemon.url)
	expandIcon.src = '../img/down (1).png'
	heading.innerText = capitalName
	heading.classList.add('info__heading')
	pokemonInfo.classList.add('invisible')
	pokemonInfo.innerText = 'information om pokemon'



	if (container == mainContent) {
		const addBtn = createBtn(cardInfo, 'info__button', 'Add to team')

		addBtn.addEventListener('click', () => {
			console.log('Du klickade på: ' + pokemon.name);
			addToTeamLS(pokemon);
			teamStartScreen()
			showOverlay('add', capitalName, addOverlay, addOverlayText)
			fadeOverlay(addOverlay)
		})
	} else if (container == primaryTeam) {
		cardInfo.append(buttonContainer)
		const demoteBtn = createBtn(buttonContainer, 'info__button--demote', 'Demote')
		const kickBtn = createBtn(buttonContainer, 'info__button--kick', 'Kick')

		demoteBtn.addEventListener('click', () => {
			console.log('demote ' + pokemon.name);
			demoteInTeamLS(pokemon.name)
			demote(card, backupTeam, pokemon)
			toggleDisabled()
			showOverlay('demote', capitalName, teamOverlay, teamOverlayText)
			fadeOverlay(teamOverlay)
		})

		kickBtn.addEventListener('click', () => {
			kickFromTeamLS(pokemon.name, primaryTeam)
			kick(card, pokemon)
			toggleDisabled()
			teamStartScreen()
			showOverlay('kick', capitalName, teamOverlay, teamOverlayText)
			fadeOverlay(teamOverlay)
		})

	} else if (container == backupTeam) {
		cardInfo.append(buttonContainer)
		promoteBtn.classList.add('info__button')
		buttonContainer.append(promoteBtn)
		promoteBtn.innerText = 'Promote'
		const kickBtn = createBtn(buttonContainer, 'info__button--kick', 'Kick')



		promoteBtn.addEventListener('click', event => {

			// const allPromoteBtns = document.querySelectorAll('.info__button--promote')
			console.log(primaryTeam.childNodes);
			if (primaryTeam.childNodes.length < 3) {
				console.log('prevent promote');
				event.preventDefault()
			}
			console.log('promote ' + pokemon.name);
			promoteInTeamLS(pokemon.name)
			promote(card, primaryTeam, pokemon)
			toggleDisabled()
			showOverlay('promote', capitalName, teamOverlay, teamOverlayText)
			fadeOverlay(teamOverlay)
		})

		toggleDisabled()

		kickBtn.addEventListener('click', () => {
			kickFromTeamLS(pokemon.name, backupTeam)
			kick(card, pokemon)
			teamStartScreen()
			showOverlay('kick', capitalName, teamOverlay, teamOverlayText)
			fadeOverlay(teamOverlay)
		})
	}
}



function createBtn(container, className, text) {
	const btn = createElement('button', ('info__button'))
	btn.classList.add(className)
	btn.innerText = text
	container.append(btn)
	return btn
}


function createElement(element, className) {
	const x = document.createElement(element)
	x.classList.add(className)
	return x
}


function search(input, list) {
	const searchList = list.filter(pokemon => {
		return (pokemon.name.toLowerCase().includes(input))
	})
	return searchList
}


function clearContent(container) {
	container.innerHTML = ''
}


function kick(element, pokemon) {
	element.remove(pokemon)
}


function demote(card, toElement, pokemon) {
	card.remove(pokemon)
	createCard(toElement, pokemon)
}


function promote(card, toElement, pokemon) {

	card.remove(pokemon)
	createCard(toElement, pokemon)
}

// function toggleDisabled(button) {

// 	if (primaryTeam.childNodes.length == 3 && backupTeam.childNodes > 0) {
// 		console.log('inside toggleDisabled, primary full');
// 		button.preventDefault()
// 		button.classList.add('disabled')
// 	}
// 	else if (primaryTeam.childNodes.length < 3 && backupTeam.childNodes.length > 0) {
// 		console.log('inside toggleDisabled, primary not full');
// 		button.classList.remove('disabled')
// 	}
// }

function toggleDisabled() {
	const allPromoteBtns = document.querySelectorAll('.info__button--promote')

	if (primaryTeam.childNodes.length == 6 && backupTeam.childNodes.length > 3) {

		for (let i = 0; i < allPromoteBtns.length; i++) {
			console.log('disabling buttons');
			allPromoteBtns[i].disabled = true;
			allPromoteBtns[i].classList.add('disabled')
		}
	}
	else if (primaryTeam.childNodes.length < 6 && backupTeam.childNodes.length > 3) {

		for (let i = 0; i < allPromoteBtns.length; i++) {
			console.log('disabling buttons');
			allPromoteBtns[i].disabled = false;
			allPromoteBtns[i].classList.remove('disabled')
		}
	}
}

function showOverlay(action, pokemonName, overlay, overlayText) {
	if (action == 'add') {
		overlayText.innerText = 'Added ' + pokemonName + ' to team';
	} else if (action == 'demote') {
		overlayText.innerText = 'Demoted ' + pokemonName + ' to backup';
	} else if (action == 'promote') {
		overlay.classList.add('overlay__promote')
		overlayText.innerText = 'Promoted ' + pokemonName + ' to primary';
	} else if (action == 'kick') {
		overlayText.innerText = 'Kicked ' + pokemonName + ' from team';
	}
	overlay.classList.remove('fade-out')
}

function fadeOverlay(overlay) {
	setTimeout(() => {
		overlay.classList.add('fade-out')
	}, 2000);
	overlay.classList.remove('overlay__promote')
}

export { createCard, search, clearContent, kick, toggleDisabled, teamStartScreen, searchStartScreen }