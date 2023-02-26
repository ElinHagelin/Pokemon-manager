import { getImage } from "./fetching.js";
import { addToTeamLS, kickFromTeamLS } from "./store.js";

const mainContent = document.querySelector('.main__content')
const addBtn = document.querySelector('.info__button--add')


async function createCards(list) {
	list.forEach(async (pokemon) => {
		const card = createElement('div', 'card')
		const pokemonImg = createElement('img', 'card__image')
		const cardInfo = createElement('section', 'card__info')
		const headingContainer = createElement('div', 'info__heading__container')
		const heading = createElement('h5', 'info__heading')
		const expandBtn = createElement('button', 'info__expand')
		const expandIcon = createElement('img', 'expand__icon')
		const pokemonInfo = createElement('p', 'info__text')
		const addBtn = createElement('button', ('info__button'))

		mainContent.append(card)
		card.append(pokemonImg)
		card.append(cardInfo)
		cardInfo.append(headingContainer)
		headingContainer.append(heading)
		headingContainer.append(expandBtn)
		expandBtn.append(expandIcon)
		cardInfo.append(pokemonInfo)
		cardInfo.append(addBtn)

		let pokemonName = pokemon.name
		let capitalName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)

		pokemonImg.src = await getImage(pokemon.url)
		expandIcon.src = '../img/down (1).png'
		heading.innerText = capitalName
		heading.classList.add('info__heading')
		pokemonInfo.classList.add('invisible')
		pokemonInfo.innerText = 'information om pokemon'
		addBtn.classList.add('info__button--add')
		addBtn.innerText = 'Add to team'

	})

}

function addToTeam(list, button) {
	list.forEach(pokemon => {

		button.addEventlistener('click', () => {
			console.log('Du klickade på: ' + pokemon.name);
			addToTeamLS(pokemon);
		})
	})
}

function createBtn(container, className, text) {
	const btn = createElement('button', ('info__button'))
	addBtn.classList.add(className)
	addBtn.innerText = text
	container.append(btn)

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




export { createCards, search, clearContent, kick, addToTeam }