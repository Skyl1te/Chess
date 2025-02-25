window.addEventListener('load', () => {
	document.documentElement.setAttribute('data-theme', 'red')
})

const changeThemeRed = document.querySelector('.change-theme__btn--red')
const changeThemePurple = document.querySelector('.change-theme__btn--purple')
const changeThemeOrange = document.querySelector('.change-theme__btn--orange')
const changeThemeGreen = document.querySelector('.change-theme__btn--green')
const changeThemeSky = document.querySelector('.change-theme__btn--sky')

changeThemeRed.addEventListener('click', () => {
	document.documentElement.setAttribute('data-theme', 'red')
})

changeThemePurple.addEventListener('click', () => {
	document.documentElement.setAttribute('data-theme', 'purple')
})

changeThemeOrange.addEventListener('click', () => {
	document.documentElement.setAttribute('data-theme', 'orange')
})

changeThemeGreen.addEventListener('click', () => {
	document.documentElement.setAttribute('data-theme', 'green')
})

changeThemeSky.addEventListener('click', () => {
	document.documentElement.setAttribute('data-theme', 'sky')
})