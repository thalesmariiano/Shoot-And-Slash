
function showUI(selector, animation){
	const ui = document.getElementById(selector)

	if(animation == 'show'){
		ui.classList.remove("hidden")
		return
	}

	ui.classList.remove("hidden")
	ui.classList.add("animate__animated", animation)
	ui.addEventListener("animationend", animationEndListener)

	function animationEndListener(){
		ui.classList.remove("animate__animated", animation)
		ui.removeEventListener("animationend", animationEndListener)
	}
}

function removeUI(selector, animation){
	const ui = document.getElementById(selector)

	if(animation == 'hidden'){
		ui.classList.add(animation)
		return
	}

	ui.classList.add("animate__animated", animation)
	ui.addEventListener("animationend", animationEndListener)

	function animationEndListener(){
		ui.classList.remove("animate__animated", animation)
		ui.classList.add("hidden")
		ui.removeEventListener("animationend", animationEndListener)
	}
}


function animateUI(element, animation, execute){
	element.classList.add("animate__animated", animation)
	element.addEventListener("animationend", animationEndListener)

	function animationEndListener(){
		element.classList.remove("animate__animated", animation)
		element.removeEventListener("animationend", animationEndListener)

		if(execute) execute()
	}
}

function hud(id){
	const element = document.getElementById(id)

	function updateAmount(value){
		element.style.width = `${value < 0 ? 0 : value}px`
	}

	function updateIcon(imgSrc){
		const img = imgSrc ? imgSrc : "arquivos/assets/null.png"
		element.src = img
	}

	return {
		updateAmount,
		updateIcon
	}
}

function lowLifeScreenEffect(){
	const effectEnabled = hud_screen.className.includes('low_life_blood_splash')

	if(player.health < 20 && !effectEnabled){
		hud_screen.classList.add('low_life_blood_splash')
	}
	if(player.health > 20 && effectEnabled){
		hud_screen.classList.remove('low_life_blood_splash')
	}
}