import { getImage } from "./fetching.js";
import { createOverlay } from "./overlay.js";
import { addToTeamLS, kickFromTeamLS, demoteInTeamLS, promoteInTeamLS, teamChampions } from "./store.js";

const html = document.querySelector('html')
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


// const primaryTeamList = []
// const backupTeamList = []

// Startskärm på söksidan innan man sökt på något

function searchStartScreen() {
	if (mainContentSearch.childNodes.length == 2) {
		searchStart.classList.add('invisible')
	} else if (mainContentSearch.childNodes.length < 2) {
		searchStart.classList.remove('invisible')
	}
}

// Startskärm på lagsidan innan man lagt till någon pokemon

function teamStartScreen() {
	console.log('hallå');
	let primaryTeamChildren = primaryTeam.childNodes
	if (primaryTeamChildren.length > 3) {
		console.log('hallå 2');
		teamStart.classList.add('invisible')
		backupHeading.classList.remove('invisible')

	}// else if (primaryTeam.childNodes.length <= 3 && backupTeam.childNodes.length <= 3) {
	// 	teamStart.classList.remove('invisible')
	// 	backupHeading.classList.add('invisible')
	// }
}

// Skapar pokemon-kort

async function createCard(container, pokemon) {

	const card = createElement('div', 'card')
	const pokemonImg = createElement('img', 'card__image')
	const cardInfo = createElement('section', 'card__info')
	const headingContainer = createElement('div', 'info__heading__container')
	const heading = createElement('h5', 'info__heading')
	// const expandBtn = createElement('button', 'info__expand')
	// const expandIcon = createElement('img', 'expand__icon')
	const pokemonInfo = createElement('p', 'info__text')
	const buttonContainer = createElement('div', 'info__button__container')
	const promoteBtn = createElement('button', 'info__button--promote')

	container.append(card)
	card.append(pokemonImg)
	card.append(cardInfo)
	cardInfo.append(headingContainer)
	headingContainer.append(heading)
	// headingContainer.append(expandBtn)
	// expandBtn.append(expandIcon)
	cardInfo.append(pokemonInfo)


	let pokemonName = pokemon.name
	let capitalName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)

	pokemonImg.src = await getImage(pokemon.url)
	// expandIcon.src = '../img/down (1).png'
	heading.innerText = capitalName
	heading.classList.add('info__heading')
	pokemonInfo.classList.add('invisible')
	pokemonInfo.innerText = 'information om pokemon'



	if (container == mainContent) {
		const addBtn = createBtn(cardInfo, 'info__button', 'Add to team')

		addBtn.addEventListener('click', () => {
			console.log('Du klickade på: ' + pokemon.name);
			addToTeamLS(pokemon);

			teamStart.classList.add('invisible')
			backupHeading.classList.remove('invisible')

			// teamStartScreen()
			showOverlay('add', capitalName, addOverlay, addOverlayText)
			fadeOverlay(addOverlay)
		})
	} else if (container == primaryTeam) {
		cardInfo.append(buttonContainer)
		const demoteBtn = createBtn(buttonContainer, 'info__button--demote', 'Demote')
		const kickBtn = createBtn(buttonContainer, 'info__button--kick', 'Kick')

		const editNick = createElement('img', 'edit-nick')
		editNick.src = ('../img/🦆 icon _pencil_.png')

		// headingContainer.insertBefore(editNick, expandBtn)
		headingContainer.append(editNick)


		demoteBtn.addEventListener('click', () => {
			console.log('demote ' + pokemon.name);
			demoteInTeamLS(pokemon)
			demote(card, backupTeam, pokemon)
			toggleDisabled()
			showOverlay('demote', capitalName, teamOverlay, teamOverlayText)
			fadeOverlay(teamOverlay)
		})

		kickBtn.addEventListener('click', () => {
			kickFromTeamLS(pokemon, primaryTeam)
			kick(card, pokemon)
			toggleDisabled()
			teamStartScreen()
			if (!primaryTeam) {
				primaryTeam = [];
			}
			// console.log(primaryTeam.findIndex(x => x.name = pokemon.name));
			showOverlay('kick', capitalName, teamOverlay, teamOverlayText)
			fadeOverlay(teamOverlay)
		})
		editNick.addEventListener('click', () => {
			createOverlay(html, 'Name your pokémon', pokemon, heading)
		})

	} else if (container == backupTeam) {
		cardInfo.append(buttonContainer)
		promoteBtn.classList.add('info__button')
		buttonContainer.append(promoteBtn)
		promoteBtn.innerText = 'Promote'
		const kickBtn = createBtn(buttonContainer, 'info__button--kick', 'Kick')
		const editNick = createElement('img', 'edit-nick')
		editNick.src = '../img/🦆 icon _pencil_.png'
		// headingContainer.insertBefore(editNick, expandBtn)
		headingContainer.append(editNick)



		promoteBtn.addEventListener('click', event => {

			console.log(primaryTeam.childNodes);
			if (primaryTeam.childNodes.length >= 3) {
				console.log('prevent promote');
				event.preventDefault()
			}
			console.log('promote ' + pokemon.name);
			promoteInTeamLS(pokemon)
			promote(card, primaryTeam, pokemon)
			toggleDisabled()
			showOverlay('promote', capitalName, teamOverlay, teamOverlayText)
			fadeOverlay(teamOverlay)
		})

		toggleDisabled()

		kickBtn.addEventListener('click', () => {
			kickFromTeamLS(pokemon, backupTeam)
			kick(card, pokemon)
			teamStartScreen()
			showOverlay('kick', capitalName, teamOverlay, teamOverlayText)
			fadeOverlay(teamOverlay)
		})
		editNick.addEventListener('click', () => {
			createOverlay(html, 'Name your pokémon', pokemon)
		})
	}
}

// Skapar knapp

function createBtn(container, className, text) {
	const btn = createElement('button', ('info__button'))
	btn.classList.add(className)
	btn.innerText = text
	container.append(btn)
	return btn
}

// Skapar element

function createElement(element, className) {
	const x = document.createElement(element)
	x.classList.add(className)
	return x
}

// smart sökfunktion

function search(input, list) {
	const searchList = list.filter(pokemon => {
		return (pokemon.name.toLowerCase().includes(input))
	})
	return searchList
}

// Rensar element

function clearContent(container) {
	container.innerHTML = ''
}

// Tar bort elementet(cardet) som innehåller den pokemon man vill kicka

function kick(element, pokemon) {
	element.remove(pokemon)
}

// Tar bort cardet från primary och lägger till det cardet i backup istället.

function demote(card, toElement, pokemon) {
	card.remove(pokemon)
	createCard(toElement, pokemon)
}

// Tar bort cardet från backup och lägger till det cardet i primary istället.

function promote(card, toElement, pokemon) {

	card.remove(pokemon)
	createCard(toElement, pokemon)
}

// Ska disable:a promote-knappen när primary är full

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

// Overlay när man trycker på add, demote, promote och kick som beskriver vad som hände när man klickade

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

// Fade:ar ut overlay:en efter 2 sekunder

function fadeOverlay(overlay) {
	setTimeout(() => {
		overlay.classList.add('fade-out')
	}, 2000);
	overlay.classList.remove('overlay__promote')
}

export { createCard, search, clearContent, kick, toggleDisabled, teamStartScreen, searchStartScreen }