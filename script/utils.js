import { getImage } from "./fetching.js";
import { addToTeamLS, kickFromTeamLS, demoteInTeamLS } from "./store.js";

const mainContent = document.querySelector('.main__content')
const primaryTeam = document.querySelector('.team__primary')
const backupTeam = document.querySelector('.team__backup')





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
		})
	} else if (container == primaryTeam) {
		cardInfo.append(buttonContainer)
		const demoteBtn = createBtn(buttonContainer, 'info__button--demote', 'Demote')
		const kickBtn = createBtn(buttonContainer, 'info__button--kick', 'Kick')

		demoteBtn.addEventListener('click', () => {
			console.log('demote ' + pokemon.name);
			demoteInTeamLS(pokemon)
		})

		kickBtn.addEventListener('click', () => {
			kickFromTeamLS(pokemon.name, primaryTeam)
			kick(primaryTeam, pokemon)

		})

	} else if (container == backupTeam) {
		cardInfo.append(buttonContainer)
		const promoteBtn = createBtn(buttonContainer, 'info__button--promote', 'Promote')
		const kickBtn = createBtn(buttonContainer, 'info__button--kick', 'Kick')

		kickBtn.addEventListener('click', () => {
			kickFromTeamLS(pokemon.name, primaryTeam)
			kick(backupTeam, pokemon)

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

function clearContent() {
	mainContent.innerHTML = ''
}

function kick(element, pokemon) {
	element.remove(pokemon)
}




export { createCard, search, clearContent, kick }