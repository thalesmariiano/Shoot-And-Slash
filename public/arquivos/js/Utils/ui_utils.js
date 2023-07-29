
function switchScreen(screen1, screen2){
	const screenIn = document.getElementById(screen1)
	const screenOut = document.getElementById(screen2)

	screenIn.classList.remove("hidden")

	screenIn.classList.add("animate__animated", "animate__fadeIn")
	screenIn.addEventListener("animationend", () => {
		screenIn.classList.remove("animate__animated", "animate__fadeIn")
	})
	screenOut.classList.add("hidden")
}

function showUI(id, animation){
	const ui = document.getElementById(id)

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

	ui.classList.add("animate__animated", animation)
	ui.addEventListener("animationend", animationEndListener)

	function animationEndListener(){
		ui.classList.remove("animate__animated", animation)
		ui.classList.add("hidden")
		ui.removeEventListener("animationend", animationEndListener)
	}
}

const skills_screen = document.getElementById("skills-screen")

function updateUI(ui, value) {
	switch(ui){
		case "healthbar":
			health_amount.style.width = `${value}px`
			break
		case "waves":
			// const wavesContainer = document.getElementById("waves-container")
			// wavesContainer.classList.remove("hidden")

			const wavesText = document.getElementById("waves-text")
			wavesText.innerHTML = `Onda ${gameWave}`

			if(value){
				showUI("waves-container", "animate__fadeIn")
				// setTimeout(() => {
				// 	wavesContainer.classList.remove("opacity-0")
				// 	wavesContainer.classList.add("opacity-100")				
				// }, 500)
			}else{
				removeUI("waves-container", "animate__fadeOut")
				// wavesContainer.classList.remove("opacity-100")
				// wavesContainer.classList.add("opacity-0")

				// setTimeout(() => {
				// 	wavesContainer.classList.add("hidden")
				// }, 1000)
			}
			break
		case "skills":
			if(value){
				skills_screen.classList.remove("hidden")

				setTimeout(() => {
					skills_screen.classList.remove("opacity-0")
					skills_screen.classList.add("opacity-100")				
				}, 700)
			}else{
				skills_screen.classList.remove("opacity-100")
				skills_screen.classList.add("opacity-0")

				setTimeout(() => {
					skills_screen.classList.add("hidden")
				}, 1000)
			}
			break
		case "timer":
			const wavesTimerContainer = document.getElementById("waves-timer-container")
			wavesTimerContainer.classList.remove("hidden")

			if(value){
				setTimeout(() => {
					wavesTimerContainer.classList.remove("opacity-0")
					wavesTimerContainer.classList.add("opacity-100")				
				}, 500)
			}else{
				wavesTimerContainer.classList.remove("opacity-100")
				wavesTimerContainer.classList.add("opacity-0")

				setTimeout(() => {
					wavesTimerContainer.classList.add("hidden")
				}, 1000)
			}	
			break
		case "icon":
			const img = value ? "arquivos/assets/itens/ak47.png" : "arquivos/assets/null.png"
			weapon_icon_img.src = img
			break
	}
}