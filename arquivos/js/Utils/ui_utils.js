
function showUI(id, animation){
	const ui = document.getElementById(id)

	if(!animation.split("__").find(e => e == "animate")){
		if(animation == "show") ui.classList.remove("hidden")			
		else ui.classList.add(animation)
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

function removeUI(id, animation){
	const ui = document.getElementById(id)

	if(!animation.split("__").find(e => e == "animate")){
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