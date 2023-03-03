import { getImage, getAbilities } from "./fetching.js";
import { createOverlay } from "./overlay.js";
import { addToTeamLS, kickFromTeamLS, demoteInTeamLS, promoteInTeamLS, getTeamFromLS } from "./store.js";

const html = document.querySelector('html')
const mainContent = document.querySelector('.main__content')
const mainContentSearch = document.querySelector('.main__content--search')
const primaryTeam = document.querySelector('.team__primary')
const backupTeam = document.querySelector('.team__backup')
const promoteButton = document.querySelector('.info__button--promote')
const searchStart = document.querySelector('.search__startscreen')
const teamStart = document.querySelector('.team__startscreen')
const backupHeading = document.querySelector('.backup__heading')
const primaryHeading = document.querySelector('.primary__heading')
const addOverlay = document.querySelector('.add__overlay')
const addOverlayText = document.querySelector('.add__overlay__para')
const teamOverlay = document.querySelector('.team__overlay')
const teamOverlayText = document.querySelector('.team__overlay__para')
const pokemonHeading = document.querySelector('.info__heading')


// const primaryTeamList = []
// const backupTeamList = []


// Startskärm på lagsidan innan man lagt till någon pokemon

function teamStartScreen() {
	const team = getTeamFromLS()

	if (team.primaryChampions.length > 0) {
		teamStart.classList.add('invisible')
		backupHeading.classList.remove('invisible')
		primaryHeading.classList.remove('invisible')
	}
	else if (team.primaryChampions.length == 0 && team.backupChampions.length == 0) {
		teamStart.classList.remove('invisible')
		backupHeading.classList.add('invisible')
		primaryHeading.classList.add('invisible')
	}
}

// Skapar pokemon-kort

async function createCard(container, pokemon) {

	const card = createElement('div', 'card')
	const pokemonImg = createElement('img', 'card__image')
	const cardInfo = createElement('section', 'card__info')
	const headingContainer = createElement('div', 'info__heading__container')
	const heading = createElement('h5', 'info__heading')
	const buttonContainer = createElement('div', 'info__button__container')
	const promoteBtn = createElement('button', 'info__button--promote')

	container.append(card)
	card.append(pokemonImg)
	card.append(cardInfo)
	cardInfo.append(headingContainer)
	headingContainer.append(heading)

	let capitalName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

	pokemonImg.src = await getImage(pokemon.url)
	heading.innerText = capitalName
	heading.classList.add('info__heading')

	const typeHeading = createElement('p', 'type-heading')
	const abilityHeading = createElement('p', 'ability-heading')


	if (container == mainContent) {
		const addBtn = createBtn(cardInfo, 'info__button', 'Add to team')

		addBtn.addEventListener('click', () => {
			console.log('Du klickade på: ' + pokemon.name);
			addToTeamLS(pokemon);

			teamStart.classList.add('invisible')
			backupHeading.classList.remove('invisible')
			primaryHeading.classList.remove('invisible')

			showOverlay('add', capitalName, addOverlay, addOverlayText)
			fadeOverlay(addOverlay)
		})
	} else if (container == primaryTeam) {
		const abilities = await getAbilities(pokemon.url)
		// let number = 1

		// const order = createElement('p', 'team__order')
		// container.insertBefore(number, card)
		showAbilities(abilities.types, typeHeading, 'type', 'Type: ')
		cardInfo.append(typeHeading)
		showAbilities(abilities.abilities, abilityHeading, 'ability', 'Abilities: ')
		cardInfo.append(abilityHeading)

		cardInfo.append(buttonContainer)
		const demoteBtn = createBtn(buttonContainer, 'info__button--demote', 'Demote')
		const kickBtn = createBtn(buttonContainer, 'info__button--kick', 'Kick')

		const editNick = createElement('img', 'edit-nick')
		editNick.src = ('../img/🦆 icon _pencil_.png')

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
			showOverlay('kick', capitalName, teamOverlay, teamOverlayText)
			fadeOverlay(teamOverlay)
		})
		editNick.addEventListener('click', () => {
			createOverlay(html, 'Name your pokémon', pokemon, primaryTeam, heading, capitalName)
		})

	} else if (container == backupTeam) {
		const abilities = await getAbilities(pokemon.url)

		showAbilities(abilities.types, typeHeading, 'type', 'Type: ')
		cardInfo.append(typeHeading)
		showAbilities(abilities.abilities, abilityHeading, 'ability', 'Abilities: ')
		cardInfo.append(abilityHeading)

		cardInfo.append(buttonContainer)
		promoteBtn.classList.add('info__button')
		buttonContainer.append(promoteBtn)
		promoteBtn.innerText = 'Promote'
		const kickBtn = createBtn(buttonContainer, 'info__button--kick', 'Kick')
		const editNick = createElement('img', 'edit-nick')
		editNick.src = '../img/🦆 icon _pencil_.png'
		headingContainer.append(editNick)


		promoteBtn.addEventListener('click', () => {

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
			createOverlay(html, 'Name your pokémon', pokemon, backupTeam, heading, capitalName)
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

async function showAbilities(list, heading, prop, propertyDescription) {
	let property = ''

	list.forEach(elem => {

		if (prop === 'type') {
			console.log(elem.type.name);
			property = property + elem.type.name + ', '
		}
		else if (prop === 'ability') {
			// console.log(elem.ability);
			property = property + elem.ability.name + ', '
		}
	});

	heading.innerText = propertyDescription + property
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

	const counts = [];
	primaryTeam.childNodes.forEach(elem => {
		if (elem.nodeName == 'DIV') {
			counts.push(elem)
		}
	});

	if (counts.length >= 3 && backupTeam.childNodes.length > 3) {

		for (let i = 0; i < allPromoteBtns.length; i++) {
			allPromoteBtns[i].disabled = true;
			allPromoteBtns[i].classList.add('disabled')
		}
	}
	else if (counts.length < 3 && backupTeam.childNodes.length > 3) {

		for (let i = 0; i < allPromoteBtns.length; i++) {
			allPromoteBtns[i].disabled = false;
			allPromoteBtns[i].classList.remove('disabled')
		}
	}
}

// Overlay när man trycker på add, demote, promote och kick som beskriver vad som hände när man klickade

function showOverlay(action, pokemonName, overlay, overlayText) {
	overlay.classList.remove('overlay__promote')
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
}

export { createCard, search, clearContent, kick, toggleDisabled, teamStartScreen }